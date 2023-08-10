# DID を使ってログイン機能を実装しよう

## 事前準備

ハンズオンでは用意されているフロントエンドとサーバーの雛形を使って作成します。それぞれのファイルについて説明します。

- /public/index.html
  - 新規登録用の html ファイル
- /public/login.html
  - ログイン用の html ファイル
- serve.js
  - サーバー用の JavaScript ファイル
- db-controller.js
  - サーバーから DB にアクセスするためのメソッドをまとめたファイル

また、DB にアクセスするために `serve.js` と同じ階層に `.env` ファイルを作成し、`.env.example` をコピーして適切な値を入力してください。
`.env` ファイルについては[こちら](https://github.com/jigintern/intern-dev-tutorial/blob/main/database-tutorial/docs.md#3-deno%E3%81%8B%E3%82%89mysql%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%97%E3%81%A6%E3%81%BF%E3%82%88%E3%81%86)を参考にしてください。

```yml
HOST_NAME=
SQL_USER=
SQL_PASSWORD=
DATABASE=
PORT=
```

アプリの実行については下記コマンドで行いましょう。

```bash
$ deno run -A serve.js
```

実装を詳しく見たいという方は下記リポジトリをご覧ください。

- [https://github.com/jigintern/did-login](https://github.com/jigintern/did-login)

## DID とは

DID とは分散型 ID のことでブロックチェーン（ビットコインの背後にある技術の一つで、ネット上の取引記録を誰もが見ることができる透明な「帳簿」のようなもの）を利用して、人々が自分自身の ID を管理する新しい方法です。

例えば、今までの ID は大学や会社、Facebook や Google のような大きな組織が管理していました。それらの組織が ID とパスワードを管理し、ユーザーはそれを使ってログインします。しかし、それではサービスごとに ID とパスワードを設定しなければならないので面倒です。またそのサービスがデータを失ったりハッキングされたりすると、ユーザーの ID も危険に晒されることになります。

ここで DID の登場です。DID は自分自身が自分の ID を管理できるようにするものです。自分だけが自分の ID を制御し、誰にどんな情報を提供するかを自分で決定できます。

## 新規登録 API を実装しよう

さっそく新規登録するための API(エンドポイントは `/users/register` ) を作成しましょう。まずはフロントエンドとサーバーの要件をまとめる必要があります。

フロントエンドの要件

- DID、パスワード、メッセージ、電子署名を生成する
- POST API を叩くときに DID、ハンドルネーム、メッセージ、電子署名を body としてサーバーへ渡す
- 新規登録が完了すればローカルストレージにユーザー情報を保存する

サーバーの要件

- DID、ハンドルネーム、メッセージ、電子署名を受け取る
- 電子署名が正しいかの検証をする
- DID が DB に保存されているかチェック
  - 保存されていなければ DID を DB に保存して登録完了する
  - 保存されていればすでに登録済みということをフロントエンドを伝える

それではフロントエンドから実装していきましょう。
今回はユーザーにハンドルネーム(name)を入力してもらう程で進めます。

まずは登録ボタンをクリックしたことを通知するために onclick メソッドを `<script>` タグ内に追加しましょう。

```html
<!-- index.html -->
<script type="module">
  // 送信時の処理
  document.getElementById("submit").onclick = async (event) => {
    event.preventDefault();
    // 名前が入力されていなければエラー
    const name = document.getElementById("name").value;
    if (name === "") {
      document.getElementById("error").innerText = "名前は必須パラメータです";
    }
  };
</script>
```

続いて [DIDAuth モジュール](https://jigintern.github.io/did-login/auth/DIDAuth.js)を使って DID、パスワード、メッセージ、電子署名を作成します。

```js
document.getElementById("submit").onclick = async () => {
  // ...
  // `DIDAuth` モジュールの `createNewUser` を使って DID、パスワード、メッセージ、電子署名を取得します。
  const [did, password, message, sign] = DIDAuth.createNewUser(name);
};
```

ここまでできたら実際にサーバー側に `/users/register` をエンドポイントとした API を追加して POST リクエストを送ってみましょう。

```js
// index.html
document.getElementById("submit").onclick = async () => {
  // ...
  // 公開鍵・名前・電子署名をサーバーに渡す
  try {
    const resp = await fetch("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        did,
        sign,
        message,
      }),
    });
  } catch (err) {
    document.getElementById("error").innerText = err.message;
  }
};
```

```js
// serve.js
serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  // ユーザー新規登録API
  if (req.method === "POST" && pathname === "/users/register") {
  }
});
```

さらに request の body からデータを取り出し、電子署名の検証、DB に DID が保存されているかのチェック、DB に DID を保存する処理を追加しましょう。
サーバーから DB に接続してクエリを叩く処理は `db-controller.js` にまとめます。

```js
// serve.js
// ユーザー新規登録API
if (req.method === "POST" && pathname === "/users/register") {
  const json = await req.json();
  const userName = json.name;
  const sign = json.sign;
  const did = json.did;
  const message = json.message;

  // 電子署名が正しいかチェック
  try {
    const chk = DIDAuth.verifySign(did, sign, message);
    if (!chk) {
      return new Response("不正な電子署名です", { status: 400 });
    }
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }

  // 既にDBにDIDが登録されているかチェック
  try {
    const isExists = await checkIfIdExists(did);
    if (isExists) {
      return Response("登録済みです", { status: 400 });
    }
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }

  // DBにDIDとuserNameを保存
  try {
    await addDID(did, userName);
    return new Response("ok");
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
}
```

```js
// db-controller.js
import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";
import "https://deno.land/std@0.192.0/dotenv/load.ts";

// SQLの設定
const connectionParam = {
  hostname: Deno.env.get("HOST_NAME"),
  username: Deno.env.get("SQL_USER"),
  password: Deno.env.get("SQL_PASSWORD"),
  db: Deno.env.get("DATABASE"),
  port: Deno.env.get("PORT"),
};

// クライアントの作成
const client = await new Client().connect(connectionParam);

export async function checkIfIdExists(did) {
  // DBにDIDがあるか
  const res = await client.execute(
    `select count(*) from users where did = ?;`,
    [did]
  );
  // レスポンスのObjectから任意のDIDと保存されているDIDが一致している数を取得し
  // その数が1かどうかを返す
  // DBにはDIDが重複されない設計になっているので一致している数は0か1になる
  return res.rows[0][res.fields[0].name] === 1;
}

export async function addDID(did, userName) {
  // DBにDIDとuserNameを追加
  await client.execute(`insert into users (did, name) values (?, ?);`, [
    did,
    userName,
  ]);
}
```

サーバーから成功ステータスが返ってきたら DID、password、name をローカルストレージに保存する処理を追加します。

```js
// index.html
// 公開鍵・名前・電子署名をサーバーに渡す
try {
  const resp = await fetch("/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      did,
      sign,
      message,
    }),
  });

  // サーバーから成功ステータスが返ってこないときの処理
  if (!resp.ok) {
    const errMsg = await resp.text();
    document.getElementById("error").innerText = "エラー：" + errMsg;
    return;
  }

  // レスポンスが正常ならローカルストレージに保存
  localStorage.setItem("did", did);
  localStorage.setItem("password", password);
  localStorage.setItem("name", name);
} catch (err) {
  document.getElementById("error").innerText = err.message;
}
```

これで新規登録の API の実装ができました。

## ログイン API を実装しよう

新規登録と同様にフロントエンドとサーバーでそれぞれの要件を満たした実装をしていきます。エンドポイントは `/users/login` とします。

フロントエンド

- DID と パスワードを入力してもらう
- 入力してもらった DID とパスワードの組み合わせが正しいかの検証
- DID、パスワード、パス、メソッドからメッセージと電子署名を取得
- `fetch` メソッドを使って DID、メッセージ、電子署名をサーバーへ送信
- ログインに成功すればユーザー情報がサーバーから返ってくるため、それをローカルストレージに保存する

サーバー

- DID、メッセージ、電子署名を受け取る
- 電子署名が正しいかの検証をする
- DID が DB に保存されているかチェック
  - 保存されていなければ未登録ということをフロントエンドに伝える
  - 保存されていればログイン成功と判断しユーザー情報を返す

まずはフロントエンドから実装します。今回は DID とパスワードの入力は `pem` ファイルをインポートすることとします。また DID とパスワードの組み合わせの検証は [`DIDAuth` モジュール](https://jigintern.github.io/did-login/auth/DIDAuth.js)の `getDIDAndPasswordFromPem()` 内で行っています。

```js
// login.html
// pemファイルを受け取って、DIDとパスワードを取得する
const pemFile = document.getElementById("pemFile").files[0];
if (!pemFile) {
  document.getElementById("error").innerText = "ファイルを選択してください。";
}

const [did, password] = await DIDAuth.getDIDAndPasswordFromPem(pemFile);

// サーバーにユーザー情報を問い合わせる
const path = "/users/login";
const method = "POST";
// 電子署名とメッセージの作成
const [message, sign] = DIDAuth.genMsgAndSign(did, password, path, method);

// 公開鍵・電子署名をサーバーに渡す
try {
  const resp = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ did, sign, message }),
  });

  // サーバーから成功ステータスが返ってこないときの処理
  if (!resp.ok) {
    const errMsg = await resp.text();
    document.getElementById("error").innerText = "エラー：" + errMsg;
  }

  // レスポンスが正常ならローカルストレージに保存
  const json = await resp.json();
  localStorage.setItem("did", did);
  localStorage.setItem("password", password);
  localStorage.setItem("name", json.user.name);

  document.getElementById("status").innerText = "ログイン成功";
  document.getElementById("name").innerText = json.user.name;
  document.getElementById("did").innerText = did;
  document.getElementById("password").innerText = password;
} catch (err) {
  document.getElementById("error").innerText = err.message;
}
```

続いてサーバー側を実装します。電子署名のチェックと DB に DID が保存されているかのチェックは新規登録と同じ処理になっています。

```js
// serve.js
// ユーザーログインAPI
if (req.method === "POST" && pathname === "/users/login") {
  const json = await req.json();
  const sign = json.sign;
  const did = json.did;
  const message = json.message;

  // 電子署名が正しいかチェック
  try {
    const chk = DIDAuth.verifySign(did, sign, message);
    if (!chk) {
      return new Response("不正な電子署名です", { status: 400 });
    }
  } catch (e) {
    return new Response(e.message, { status: 400 });
  }

  // DBにdidが登録されているかチェック
  try {
    const isExists = await checkIfIdExists(did);
    if (!isExists) {
      return new Response("登録されていません", { status: 400 });
    }
    // 登録済みであればuser情報を返す
    const res = await getUser(did);
    const user = { did: res.rows[0].did, name: res.rows[0].name };
    return new Response(JSON.stringify({ user }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
}
```

```js
// db-controller.js
export async function addDID(did, userName) {
  // ...
}

export async function getUser(did) {
  // DBからsignatureが一致するレコードを取得
  const res = await client.execute(`select * from users where did = ?;`, [did]);
  return res;
}
```

以上がログイン機能の実装となります。
