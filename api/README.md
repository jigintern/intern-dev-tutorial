# API ハンズオン

- [0. このセクションの目標](#0-このセクションの目標)
  - [0-0. 今日の流れ](#0-0-今日の流れ)
  - [0-1. 今日さわるファイル](#0-1-今日さわるファイル)
  - [0-2. 昨日のアプリを開いて起動する](#0-2-昨日のアプリを開いて起動する)
- [1. そもそも API とは](#1-そもそも-api-とは)
  - [1-1. API は「窓口」](#1-1-api-は窓口)
    - [4 つを組み合わせると、コードになります](#4-つを組み合わせるとコードになります)
  - [1-2. `server.js` は、全部の入口](#1-2-serverjs-は全部の入口)
    - [大きなサービスでは分かれています](#大きなサービスでは分かれています)
    - [まとめて 1 回では返ってきません](#まとめて-1-回では返ってきません)
    - [開発者ツールで見てみよう](#開発者ツールで見てみよう)
    - [見る場所は 2 つあります](#見る場所は-2-つあります)
    - [みんなの `server.js` は、中身が違います](#みんなの-serverjs-は中身が違います)
- [2. 文字を返す API をつくる](#2-文字を返す-api-をつくる)
  - [2-1. サーバーに `/greeting` を追加する](#2-1-サーバーに-greeting-を追加する)
  - [2-2. ブラウザで直接叩いて確認する](#2-2-ブラウザで直接叩いて確認する)
  - [2-3. `api.js` をつくる](#2-3-apijs-をつくる)
  - [2-4. ボタンを置く](#2-4-ボタンを置く)
  - [2-5. ボタンから叩いて確認する](#2-5-ボタンから叩いて確認する)
- [3. 情報を渡せる API をつくる](#3-情報を渡せる-api-をつくる)
  - [3-1. サーバーに `/greeting-me` を追加する](#3-1-サーバーに-greeting-me-を追加する)
  - [3-2. ブラウザで直接叩いて確認する](#3-2-ブラウザで直接叩いて確認する)
  - [3-3. `api.js` に追記する](#3-3-apijs-に追記する)
  - [3-4. 入力欄を置く](#3-4-入力欄を置く)
  - [3-5. 入力して確認する](#3-5-入力して確認する)
- [4. JSON を返す API をつくる](#4-json-を返す-api-をつくる)
  - [4-1. サーバーに `/profile` を追加する](#4-1-サーバーに-profile-を追加する)
  - [4-2. ブラウザで直接叩いて確認する](#4-2-ブラウザで直接叩いて確認する)
  - [4-3. `api.js` に追記する](#4-3-apijs-に追記する)
  - [4-4. ボタンを置く](#4-4-ボタンを置く)
  - [4-5. 確認する](#4-5-確認する)
  - [4-6. 中身を自分のものに書き換える](#4-6-中身を自分のものに書き換える)
- [5. 情報を送る API をつくる](#5-情報を送る-api-をつくる)
  - [5-1. `server.js` の 1 行を書き換える](#5-1-serverjs-の-1-行を書き換える)
  - [5-2. サーバーに `/auth` を追加する](#5-2-サーバーに-auth-を追加する)
  - [5-3. `api.js` に追記する](#5-3-apijs-に追記する)
  - [5-4. 入力欄を置く](#5-4-入力欄を置く)
  - [5-5. 確認する](#5-5-確認する)
- [6. 公開する](#6-公開する)
- [7. (終わった人から) 自分で API を増やす](#7-終わった人から-自分で-api-を増やす)
  - [7-1. お題の例](#7-1-お題の例)
  - [7-2. (発展) 見つからないときは 404 を返す](#7-2-発展-見つからないときは-404-を返す)
- [8. うまくいかないときは](#8-うまくいかないときは)
- [9. 今日書いたコードの全体](#9-今日書いたコードの全体)

# 0. このセクションの目標

このセクションのゴールはひとつです。

**自分のアプリに、自分で API を 1 本増やせるようになる**

前の章で、HTTP の仕組みを勉強しました。今日は、それを使って**実際に手を動かします。**

## 0-0. 今日の流れ

| 章 | やること |
| --- | --- |
| 1 | API とは何か / `server.js`が何をしているファイルなのか |
| 2 | `/greeting` … 決まった文字を返す |
| 3 | `/greeting-me` … 渡した名前を使って返す |
| 4 | `/profile` … **JSON** を返す ← 今日の山場 |
| 5 | `/auth` … 送ったパスワードを確かめる（POST） |
| 6 | 公開して、スマホから叩く |
| 7 | 終わった人から、自分で API を増やす |

API を 4 本つくります。**4 本とも、つくり方は同じ 4 ステップです。**

1. サーバー側に書く
2. **ブラウザの URL 直打ちで確認する**
3. ブラウザ側に書く
4. ボタンで確認する

> [!IMPORTANT]
> 今日は、[Deno のセクション](../deno/README.md)で作った**自分のリポジトリ**の中で作業します。
> この教材リポジトリ（`intern-dev-tutorial`）ではありません。

## 0-1. 今日さわるファイル

3 つだけです。そのうち 1 つは、これから新しくつくります。

| ファイル | 今日の扱い |
| --- | --- |
| `server.js` | `return serveDir(`の行の**上に足す**だけ |
| `public/api.js` | **新しくつくる。**今日書く JavaScript は全部ここ |
| `public/index.html` | `</body>`の**直前に足す**だけ |

> [!NOTE]
> **昨日書き換えた見た目やメッセージは、消しません。**今日は足していくだけです。
> `public/index.js`と`public/styles.css`は開きません。

**足す場所は、最後まで変わりません。**この 2 つを覚えてください。

- `server.js` → `return serveDir(`の**すぐ上**
- `public/index.html` → `</body>`の**すぐ上**

## 0-2. 昨日のアプリを開いて起動する

### 手順

1. VSCode で、昨日クローンしたフォルダ（例: `deno-app`）を開く
2. 上のメニューの「**ターミナル**」→「**新しいターミナル**」を選ぶ
3. 開いたターミナルに、以下をそのまま貼って Enter を押す

```shell
deno run --watch --allow-read --allow-net server.js
```

### こうなっていれば成功

ターミナルに、こう表示されます。

```shell
Listening on http://0.0.0.0:8000/ (http://localhost:8000/)
```

ブラウザで <http://localhost:8000> を開くと、昨日つくったページが表示されます。

> [!IMPORTANT]
> **このターミナルは、今日ずっと開いたままにしておいてください。**
> `--watch`が付いているので、`server.js`を保存するたびに Deno が自動で再起動します。

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| `deno: command not found` | ターミナルを閉じて、もう一度開いてください |
| `No such file or directory` | フォルダが違います。VSCode の左側に`server.js`が見えているか確認してください |
| ブラウザに何も出ない | ターミナルに`Listening on ...`が出ているか確認してください |

# 1. そもそも API とは

## 1-1. API は「窓口」

**Application Programming Interface**の略です。

`Interface`は「**窓口**」という意味です（`inter`＝間、`face`＝面）。銀行や役所の窓口と同じで、**中で何をしているかは見えません**が、決まった形で頼めば答えが返ってきます。

Web アプリでは、**ブラウザとサーバーが別のプログラム**です。お互いの中身を直接さわれません。だから間に窓口を置いて、そこを通してやりとりします。

今日つくるのは、この窓口です。窓口をつくるときは、**使い方のルール**を決めます。決めるのは、いつも同じ 4 つです。

| | これがルール | 例（`/greeting-me`の場合） |
| --- | --- | --- |
| ① | どの URL か | `/greeting-me` |
| ② | どのメソッドか | `GET` |
| ③ | 何を渡すか | `name`（クエリパラメータ） |
| ④ | 何が返るか | `Hello, taro`（文字） |

**この 4 つが決まっていれば、別々の人がつくったプログラムでも繋がります。**呼ぶ側は窓口の中身を知らなくていいし、つくる側も誰が呼ぶかを知らなくていい。だから分担して開発できます。

②の GET と POST は、前の章でやったものです。

### 4 つを組み合わせると、コードになります

この 4 つがコードのどこに現れるかを見ておきましょう。3 章でつくる`/greeting-me`の場合です。

```js
// server.js
if (req.method === "GET" && pathname === "/greeting-me") {
//      ② メソッド                    ① URL

  const name = new URL(req.url).searchParams.get("name");
//                                    ③ 渡されたもの を受け取る

  return new Response("Hello, " + name);
//                    ④ 返すもの
}
```

**今日書くのは、これだけです。**つくる 4 本とも、①②③④のどれかが変わるだけです。

| | ① URL | ② メソッド | ③ 渡すもの | ④ 返るもの |
| --- | --- | --- | --- | --- |
| 2 章 | `/greeting` | GET | なし | 文字 |
| 3 章 | `/greeting-me` | GET | `name`（クエリ） | 文字 |
| 4 章 | `/profile` | GET | なし | **JSON** |
| 5 章 | `/auth` | **POST** | `password`（ボディ） | **JSON** |

> [!NOTE]
> このセクションにはスライド資料があります。
>
> - [スライド資料](https://jigintern.github.io/intern-dev-tutorial/api/api-slide.html)
> - [PDF資料](https://jigintern.github.io/intern-dev-tutorial/api/api-slide.pdf)
> - [テキスト資料](./slide.md)

## 1-2. `server.js` は、全部の入口

手を動かす前に、**これから書き足す`server.js`が何をしているファイル**なのかを見ておきます。開いて全体の形を見てみてください。だいたいこうなっています。

```js
Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("...");
  }

  return serveDir(req, {
    fsRoot: "public",
    ...
  });
});
```

### ブラウザからの通信は、全部ここに来ます

`Deno.serve(...)`が、**このサーバーへの通信をすべて受け取る入口**です。

昨日ブラウザで`localhost:8000`を開いたときも、ここに来ていました。しかも 1 回ではありません。

| 叩かれた URL | 返ってきたもの | 中身のもとは |
| --- | --- | --- |
| `/` | `index.html`の中身 | `public`フォルダのファイル |
| `/styles.css` | CSS | `public`フォルダのファイル |
| `/index.js` | JavaScript | `public`フォルダのファイル |
| `/welcome-message` | 「jig インターンへようこそ！」の文字 | `server.js`のコード |

**4 回とも、同じ`server.js`が答えています。**

そして**4 回とも、返ってくる形は同じ**です。前の章で出てきた**レスポンスボディ**に中身が入って返ってきています。ファイルだから特別、ということはありません。

`serveDir`がやっているのは、こういうことです。

```js
// ファイルを読んで、その中身をレスポンスに入れて返している
const content = await Deno.readFile("public/index.html");
return new Response(content);
```

これは`new Response("jigインターンへようこそ！")`と**同じ形**ですね。

つまり違いは、**中身をファイルから読んだか、コードに書いたか**だけです。

### まとめて 1 回では返ってきません

4 回というのは、**4 回別々のやりとりをしている**という意味です。まとめて 1 回で返ってくるわけではありません。

1. ブラウザが`/`を開く → `index.html`が返る
2. ブラウザが受け取った HTML を読んで、`<link href="./styles.css">`を見つける → `/styles.css`を取りに行く
3. `<script src="./index.js">`を見つける → `/index.js`を取りに行く
4. その`index.js`が動いて`fetch("/welcome-message")`を実行する → 文字が返る

**HTML を受け取ってから、その中に書いてあるものを順に取りに行っています。**

これは自分で確認できます。サーバーを起動してブラウザで開いたとき、ターミナルにこう出ているはずです。

```shell
/
/styles.css
/index.js
/welcome-message
```

これを出しているのは`server.js`の 1 行目あたりにある`console.log(pathname)`です。**叩かれたパスを毎回表示している**ので、今日 API を追加したあとも、ここを見れば「ちゃんと叩けているか」が分かります。

### 開発者ツールで見てみよう

ブラウザ側からも同じものが見られます。前の章で GitHub のログインを覗いたときと同じ道具を、**今度は自分のアプリに向けてみましょう。**

1. ブラウザで <http://localhost:8000> を開く
2. **開発者ツール**を開く（`F12`、または右クリック →「検証」）
3. **Network**タブを開く
4. ページを再読み込みする（`Cmd + R` / `Ctrl + R`）

一覧に、こんな行が並びます。

| Name | Type | 何が返ってきたか |
| --- | --- | --- |
| `localhost` | document | `index.html`の中身 |
| `styles.css` | stylesheet | CSS の中身 |
| `index.js` | script | JavaScript の中身 |
| `welcome-message` | fetch | 「jig インターンへようこそ！」の文字 |

**4 行あるのが、4 回やりとりした証拠です。**

`welcome-message`の行をクリックして、**Response**タブ（または「応答」）を開いてみてください。返ってきた文字がそのまま見られます。

> [!TIP]
> この**Network タブ**は、今日ずっと使えます。
> ボタンを押しても何も起きないとき、ここを見れば「そもそもリクエストが飛んでいないのか」「飛んだけどエラーが返ってきたのか」が分かります。
> **Status**の列が`200`なら成功、`404`なら「そんな窓口はない」という意味です。

### 見る場所は 2 つあります

ここまでで、確認する場所が 2 つ出てきました。**見えるものが違います。**

| どこで見るか | 何が見えるか |
| --- | --- |
| **ターミナル**（サーバー側） | どのパスが叩かれたか |
| **Network タブ**（ブラウザ側） | 何を送って、何が返ってきたか |

そして大事なのは、**どちらからも「サーバーの中でやっている処理」は見えない**ということです。

`/welcome-message`が「jig インターンへようこそ！」を返していることは分かりますが、**それをどうやって決めたのかは、外からは見えません。**`server.js`を開かないと分かりません。

これが 1 章で見た**窓口**です。外から見えるのは窓口でのやりとりだけ。だから[利点 2](#1-1-api-は窓口)のとおり、見せたくないものはサーバー側に置けるわけです。

> [!TIP]
> この 2 つは**切り分けの道具**になります。今日、ボタンを押して動かないときはこう考えてください。
>
> - ターミナルに何も出ない → **リクエストがサーバーに届いていない**（ブラウザ側の問題）
> - ターミナルには出るのに画面が変わらない → **届いてはいる**（サーバーの返し方か、ブラウザの受け取り方の問題）

### 大きなサービスでは分かれています

Web アプリの仕組みを調べると、こういう図をよく見ます。

```
ブラウザ → Webサーバー → アプリサーバー → データベース
           ファイルを返す   APIに答える     データを持つ
```

役割ごとに別のプログラムに分かれています。でも**今つくっているアプリはこうです。**

```
ブラウザ → server.js
           ファイルもAPIも ぜんぶ 1ファイルで
```

教科書の図と違って見えますが、**小さいうちは 1 つで足りる**というだけの話です。分けるのは、アクセスが増えて処理が重くなってからです。

今日は、**この 1 ファイルに窓口を足していきます。**

### 上から順に「自分の担当か」を確かめています

では、どうやって返すものを決めているのか。**上から順番に条件を見ているだけ**です。

```
通信が来た
   ↓
GETで /welcome-message ですか？ ── はい → 文字を返す（おわり）
   ↓ いいえ
GETで /greeting ですか？        ── はい → 文字を返す（おわり）
   ↓ いいえ
どれでもなかった
   ↓
serveDir が public フォルダからファイルを探して返す
```

一番下の`serveDir`は、**どの`if`にも当たらなかったとき**の受け皿です。`public`フォルダの中から、パスに合うファイルを探して返してくれます。だから`index.html`や`styles.css`が表示されるわけです。

### だから、追加するのは`serveDir`の「上」です

`return`は「ここで返して、おわり」という意味です。`serveDir`の行にたどり着いた時点で、処理は終わってしまいます。

**もし`serveDir`より下に API を書いても、そこには一生たどりつきません。**

```js
  return serveDir(req, {     // ← ここで終わってしまう
    fsRoot: "public",
  });

  if (pathname === "/greeting") {   // ← ここには絶対に来ない
    return new Response("Hello!!");
  }
```

なので今日は、**必ず`return serveDir(`の上に足していきます。**この後の手順で何度も出てきますが、理由はこれです。

### みんなの `server.js` は、中身が違います

昨日、それぞれ好きなように書き換えたので、**`server.js`の中身は人によって違います。**返す文言を変えた人、自分でルーティングを足した人、Claude に手伝ってもらって整えた人もいるはずです。

なので、この資料には**行番号を書いていません。**「15 行目に足してください」と書いても、人によってそこが違う場所になってしまうからです。

かわりに使うのが、さっきの目印です。

- `server.js` → **`return serveDir(`** の行を探して、その上に足す
- `public/index.html` → **`</body>`** の行を探して、その上に足す

この 2 つの行は、消してしまうとページが表示されなくなるので、**昨日デプロイできた人には必ず残っています。**

だから、昨日どう書き換えていても、**今日は全員が同じ手順で進められます。**昨日の内容は消さずに、足していきましょう。

# 2. 文字を返す API をつくる

1 本目です。**`/greeting`を叩くと`Hello!!`が返ってくる API**をつくります。

進め方は、この後の 3 章・4 章・5 章もすべて同じです。

1. サーバー側に書く
2. **ブラウザの URL 直打ちで確認する**
3. ブラウザ側に書く
4. ボタンで確認する

2 番を必ず挟みます。ここを確認しておくと、動かないときに**サーバーとブラウザのどちらが原因か**を自分で切り分けられます。

サーバー側に書く場所は、[1-2](#1-2-serverjs-は全部の入口)で見たとおり **`return serveDir(`の上**です。この後も全部同じ場所です。

## 2-1. サーバーに `/greeting` を追加する

### 手順

1. VSCode で`server.js`を開く
2. ファイルの下のほうにある、この行を探す

```js
  return serveDir(req, {
```

3. その行の**すぐ上**に、以下を貼る

```js
  if (req.method === "GET" && pathname === "/greeting") {
    return new Response("Hello!!");
  }

```

4. `Cmd + S`（Windows は `Ctrl + S`）で保存する

### こうなっていれば成功

貼ったあと、あなたの`server.js`はこう見えます。`...`の部分は人によって違います。**昨日書き換えた内容はそのままで大丈夫です。**

```js
  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("...");
  }

  if (req.method === "GET" && pathname === "/greeting") {
    return new Response("Hello!!");
  }

  return serveDir(req, {
    fsRoot: "public",
```

ターミナルに、こう出ています。

```shell
Watcher File change detected! Restarting!
Listening on http://0.0.0.0:8000/ (http://localhost:8000/)
```

### 書いたコードの意味

- `req.method`で、ブラウザが使ったメソッドがわかります。前の章で勉強した`GET`がここに出てきます
- `pathname`に、叩かれた URL のパス（`/greeting`の部分）が入っています。ファイルの上のほうで`const pathname = new URL(req.url).pathname;`として取り出しています
- 条件に合ったら`new Response("返したい文字")`を`return`します

## 2-2. ブラウザで直接叩いて確認する

いまつくったのは**サーバー側だけ**です。ボタンはまだありませんが、動作は確認できます。

### 手順

1. ブラウザのアドレスバーに、以下を直接入力して Enter

```
http://localhost:8000/greeting
```

### こうなっていれば成功

画面に`Hello!!`とだけ表示されます。

これが「API を叩く」ということです。**サーバーはもう仕事をしています。**

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| `Not Found`と出る | 保存できていません。`server.js`のタブに`●`が付いていないか確認して、`Cmd + S` |
| `Not Found`と出る（保存済み） | `pathname === "/greeting"`の綴りを確認してください |
| ページが開けない | ターミナルで`deno run --watch --allow-read --allow-net server.js`を実行し直してください |

## 2-3. `api.js` をつくる

今日書く JavaScript を入れるファイルを、新しくつくります。

### 手順

1. VSCode の左側で、`public`フォルダを**右クリック**する
2. 「**新しいファイル**」を選ぶ
3. `api.js`と入力して Enter
4. 開いた空のファイルに、以下を貼る

```js
document.querySelector("#greetingButton").onclick = async () => {
  const response = await fetch("/greeting");
  document.querySelector("#greetingResult").innerText = await response.text();
};
```

5. `Cmd + S`で保存する

### こうなっていれば成功

VSCode の左側の`public`フォルダの中に、`api.js`が並んでいます。

```
public
├── api.js      ← 今つくった
├── index.html
├── index.js
└── styles.css
```

### 書いたコードの意味

- `document.querySelector("#greetingButton")`で、`id`が`greetingButton`のボタンを取ってきます
- `.onclick = async () => { ... }`で、そのボタンが押されたときの処理を登録します
- `fetch("/greeting")`で API を叩きます
- `await response.text()`で、返ってきた文字を取り出します
- それを`greetingResult`の中に入れて表示します

> [!NOTE]
> ボタンはまだ HTML にありません。次の手順でつくります。

## 2-4. ボタンを置く

### 手順

1. `public/index.html`を開く
2. `</body>`と書かれている行を探す
3. その行の**すぐ上**に、以下を貼る

```html
    <!-- 2章: /greeting -->
    <div>
      <button id="greetingButton">Hello</button>
      <span id="greetingResult"></span>
    </div>

    <script type="module" src="./api.js"></script>
```

4. `Cmd + S`で保存する

### こうなっていれば成功

貼ったあと、`index.html`の下のほうはこう見えます。`...`は昨日書いたものです。**そのままで大丈夫です。**

```html
    <h1 id="welcomeMessage"></h1>
    ...

    <!-- 2章: /greeting -->
    <div>
      <button id="greetingButton">Hello</button>
      <span id="greetingResult"></span>
    </div>

    <script type="module" src="./api.js"></script>
  </body>
</html>
```

> [!IMPORTANT]
> `<script type="module" src="./api.js"></script>`を書くのは、**今日ここだけ**です。
> 3 章以降で`api.js`に追記しても、この行を足す必要はありません。

## 2-5. ボタンから叩いて確認する

### 手順

1. ブラウザで <http://localhost:8000> を開く（アドレスバーに`/greeting`が残っていたら消す）
2. `Cmd + Shift + R`（Windows は `Ctrl + Shift + R`）で再読み込みする
3. `Hello`ボタンを押す

### こうなっていれば成功

ボタンの隣に`Hello!!`と表示されます。

**1 本目の API が完成しました。**

### つまずいたら

まずブラウザの**開発者ツール**を開きます。`F12`、または画面を右クリックして「**検証**」です。**Console**タブを見てください。

| Console に出ているもの | 意味と対処 |
| --- | --- |
| `Cannot set properties of null` | `index.html`の`id`と`api.js`の`#〇〇`が違います。見比べてください |
| `Failed to load resource: api.js` | `<script type="module" src="./api.js">`の行がないか、ファイル名が違います |
| 何も出ていないがボタンも動かない | 再読み込みを忘れています。`Cmd + Shift + R` |

# 3. 情報を渡せる API をつくる

2 本目です。さっきの`/greeting`は、いつ叩いても同じ`Hello!!`が返ってきました。

今度は**こちらから名前を渡して、それに応じた返事をもらう API**をつくります。

**`/greeting-me`に`name`を渡すと、`Hello, {渡した名前}`が返ってくる**ルールです。

渡す方法は、前の章で勉強した**クエリパラメータ**です。URL の後ろに`?name=taro`のようにくっつけます。

> [!NOTE]
> 2 章でつくった`/greeting`は消しません。**足していきます。**

## 3-1. サーバーに `/greeting-me` を追加する

### 手順

1. `server.js`を開く
2. `return serveDir(req, {`の行を探す（**2 章と同じ場所です**）
3. その行の**すぐ上**に、以下を貼る

```js
  if (req.method === "GET" && pathname === "/greeting-me") {
    const name = new URL(req.url).searchParams.get("name");
    return new Response("Hello, " + name);
  }

```

4. `Cmd + S`で保存する

### こうなっていれば成功

`server.js`はこう見えます。

```js
  if (req.method === "GET" && pathname === "/greeting") {
    return new Response("Hello!!");
  }

  if (req.method === "GET" && pathname === "/greeting-me") {
    const name = new URL(req.url).searchParams.get("name");
    return new Response("Hello, " + name);
  }

  return serveDir(req, {
```

### 書いたコードの意味

```js
new URL(req.url).searchParams.get("name")
```

これで、クエリパラメータの`name`の中身を取り出せます。`?name=taro`で来たら`taro`が入ります。

## 3-2. ブラウザで直接叩いて確認する

### 手順

1. ブラウザのアドレスバーに、以下を直接入力して Enter

```
http://localhost:8000/greeting-me?name=taro
```

2. `taro`の部分を自分の名前に変えて、もう一度 Enter

### こうなっていれば成功

1 回目は`Hello, taro`、2 回目は`Hello, 自分の名前`と表示されます。

**URL を変えると返事が変わりました。**これが「情報を渡す」ということです。

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| `Hello, null`と出る | `?name=`の部分を書き忘れています。URL を確認してください |
| `Not Found`と出る | `/greeting-me`の綴りを確認してください（`greeting_me`ではありません） |

## 3-3. `api.js` に追記する

### 手順

1. `public/api.js`を開く
2. **すでに書いてあるコードの下**に、以下を貼る

```js

document.querySelector("#greetingMeButton").onclick = async () => {
  const name = document.querySelector("#nameInput").value;
  const response = await fetch("/greeting-me?name=" + name);
  document.querySelector("#greetingMeResult").innerText = await response.text();
};
```

3. `Cmd + S`で保存する

### 書いたコードの意味

- `document.querySelector("#nameInput").value`で、入力欄に打たれた文字を取り出します
- それを`?name=`の後ろにくっつけて`fetch`します

## 3-4. 入力欄を置く

### 手順

1. `public/index.html`を開く
2. `</body>`の行を探す（**2 章と同じ場所です**）
3. その行の**すぐ上**に、以下を貼る

```html
    <!-- 3章: /greeting-me -->
    <div>
      <input type="text" id="nameInput">
      <button id="greetingMeButton">greeting me</button>
      <span id="greetingMeResult"></span>
    </div>
```

4. `Cmd + S`で保存する

> [!IMPORTANT]
> `<script type="module" src="./api.js"></script>`の行より**上**に貼ってください。
> 2 章で貼ったブロックのすぐ下が、ちょうどいい場所です。

### こうなっていれば成功

```html
    <!-- 2章: /greeting -->
    <div>
      <button id="greetingButton">Hello</button>
      <span id="greetingResult"></span>
    </div>

    <!-- 3章: /greeting-me -->
    <div>
      <input type="text" id="nameInput">
      <button id="greetingMeButton">greeting me</button>
      <span id="greetingMeResult"></span>
    </div>

    <script type="module" src="./api.js"></script>
  </body>
```

## 3-5. 入力して確認する

### 手順

1. ブラウザで <http://localhost:8000> を`Cmd + Shift + R`で再読み込みする
2. 入力欄に自分の名前を打つ
3. `greeting me`ボタンを押す

### こうなっていれば成功

`Hello, 打った名前`と表示されます。

**2 本目の API が完成しました。**

# 4. JSON を返す API をつくる

3 本目です。ここが今日の山場です。

これまでの API は、**文字を 1 つ**返していました。でも実際のアプリでは、1 回のやりとりで**複数の情報**をまとめて受け取りたいことがほとんどです。

たとえば、名前と好きなものを両方返したいとき。文字だけだとこうなってしまいます。

```js
return new Response("たにぐち,ラーメン");
```

これでも動きますが、受け取った側が`,`で切り分ける必要があります。切り分けるルールを別に用意しないといけません。**面倒だし、間違いやすいです。**

そこで使うのが **JSON** です。

```json
{ "name": "たにぐち", "favorite": "ラーメン" }
```

こう返せば、受け取った側は`データ.name`と書くだけで名前が取り出せます。**実際の Web アプリの API は、ほとんどこの形です。**

**`/profile`を叩くと、名前と好きなものが JSON で返ってくる**API をつくります。

## 4-1. サーバーに `/profile` を追加する

### 手順

1. `server.js`を開く
2. `return serveDir(req, {`の行の**すぐ上**に、以下を貼る

```js
  if (req.method === "GET" && pathname === "/profile") {
    return Response.json({
      name: "たにぐち",
      favorite: "ラーメン",
    });
  }

```

3. `Cmd + S`で保存する

### 書いたコードの意味

これまでは`new Response("文字")`でした。JSON を返すときは`Response.json({ ... })`を使います。

```js
new Response("文字")            // 文字を返す
Response.json({ キー: 値 })     // JSONを返す
```

`{ }`の中に、`キー: 値`をカンマで区切って並べます。いくつ並べても大丈夫です。

## 4-2. ブラウザで直接叩いて確認する

### 手順

1. ブラウザのアドレスバーに、以下を直接入力して Enter

```
http://localhost:8000/profile
```

### こうなっていれば成功

こう表示されます。

```json
{"name":"たにぐち","favorite":"ラーメン"}
```

**これが JSON です。**`{ }`で囲まれて、`キー:値`が並んでいます。

さっきの`/greeting`（`Hello!!`だけ）と見比べてみてください。**1 回のやりとりで 2 つの情報を返せています。**

> [!TIP]
> ブラウザによっては、見やすく整形して表示されたり、`Raw`と`Parsed`の切り替えが出たりします。どちらも同じものです。

## 4-3. `api.js` に追記する

### 手順

1. `public/api.js`を開く
2. **すでに書いてあるコードの下**に、以下を貼る

```js

document.querySelector("#profileButton").onclick = async () => {
  const response = await fetch("/profile");
  const data = await response.json();
  document.querySelector("#profileResult").innerText = data.name + " / " + data.favorite;
};
```

3. `Cmd + S`で保存する

### 書いたコードの意味

**これまでと 1 か所だけ違います。**

```js
await response.text()   // 文字として受け取る（2章・3章）
await response.json()   // JSONとして受け取る（4章）
```

`response.json()`で受け取ると、`data.name`や`data.favorite`のように**キーを指定して取り出せます。**

```js
const data = await response.json();
data.name       // "たにぐち"
data.favorite   // "ラーメン"
```

## 4-4. ボタンを置く

### 手順

1. `public/index.html`を開く
2. `<script type="module" src="./api.js"></script>`の行の**すぐ上**に、以下を貼る

```html
    <!-- 4章: /profile -->
    <div>
      <button id="profileButton">profile</button>
      <span id="profileResult"></span>
    </div>
```

3. `Cmd + S`で保存する

## 4-5. 確認する

### 手順

1. ブラウザで <http://localhost:8000> を`Cmd + Shift + R`で再読み込みする
2. `profile`ボタンを押す

### こうなっていれば成功

`たにぐち / ラーメン`と表示されます。

**JSON で受け取った 2 つの情報を、両方使えました。**

### つまずいたら

| 症状 | 原因 |
| --- | --- |
| `undefined / undefined`と出る | `server.js`のキー名と`api.js`の`data.〇〇`が違います。両方を見比べてください |
| `undefined`が片方だけ | 片方のキー名だけ間違っています |
| `[object Object]`と出る | `data.name`ではなく`data`をそのまま表示しています |

> [!NOTE]
> `undefined`が出た人は、**いま API のルールが食い違っている状態**です。
> サーバーが`name`で返しているのに、ブラウザが`userName`を探している、というようなときにこうなります。
> **片方だけ直しても動きません。**両側で同じ名前を使うのがルールなので、必ずセットで直します。

## 4-6. 中身を自分のものに書き換える

`server.js`の`/profile`の中身を、**自分の情報に書き換えてみましょう。**

```js
  if (req.method === "GET" && pathname === "/profile") {
    return Response.json({
      name: "自分の名前",
      favorite: "好きなもの",
    });
  }
```

保存して、ブラウザを再読み込みしてボタンを押すと、書き換えた内容が出ます。

**キーを増やしてもいいです。**その場合は`api.js`側も直すのを忘れないでください。ルールは両側セットです。

```js
// server.js
return Response.json({
  name: "自分の名前",
  favorite: "好きなもの",
  today: "眠い",          // ← 増やした
});
```

```js
// api.js
document.querySelector("#profileResult").innerText =
  data.name + " / " + data.favorite + " / " + data.today;   // ← 増やした
```

# 5. 情報を送る API をつくる

4 本目、最後です。

ここまでの 3 本は全部`GET`でした。前の章で勉強したとおり、`GET`で渡した情報は**URL に出ます。**

```
http://localhost:8000/greeting-me?name=taro
```

`taro`が URL に見えていますね。これが名前ならいいですが、**パスワードだったら困ります。**

なので今回は`POST`を使います。`POST`は情報を URL ではなく**body**に入れて送るので、URL には出ません。

**`/auth`にパスワードを送ると、あっているかどうかが返ってくる**API をつくります。

## 5-1. `server.js` の 1 行を書き換える

> [!IMPORTANT]
> **今日はじめて、すでにある行を書き換えます。**ここだけです。

### 手順

1. `server.js`を開く
2. ファイルの**上のほう**にある、この行を探す

```js
Deno.serve((req) => {
```

3. `async`を足して、こう書き換える

```js
Deno.serve(async (req) => {
```

4. `Cmd + S`で保存する

### なぜ必要か

このあと`await req.json()`と書きます。`await`は、`async`が付いた関数の中でしか使えません。

前に`fetch`で`await`を使ったときも、`async () => {`とセットになっていました。**`await`と`async`はセットです。**

### つまずいたら

`async`を書き忘れると、保存した瞬間にサーバーが止まって、ターミナルにこう出ます。

```shell
error: Uncaught SyntaxError: Unexpected reserved word
    const password = await req.json();
```

このエラーが出たら、この手順に戻ってきてください。

## 5-2. サーバーに `/auth` を追加する

### 手順

1. `return serveDir(req, {`の行の**すぐ上**に、以下を貼る

```js
  if (req.method === "POST" && pathname === "/auth") {
    const body = await req.json();
    if (body.password === "jigjp") {
      return Response.json({ ok: true, message: "ログインできました" });
    }
    return Response.json({ ok: false, message: "パスワードが違います" });
  }

```

2. `Cmd + S`で保存する

### 書いたコードの意味

- `req.method === "POST"`で、POST で来たときだけ動くようにしています
- `await req.json()`で、body に入っている JSON を取り出します
- `body.password`が`jigjp`と同じかどうかで、返す内容を変えています
- 返すのは JSON です。**4 章で覚えた`Response.json()`をそのまま使っています**

> [!NOTE]
> `POST`の API は、`GET`と違って**ブラウザのアドレスバーからは叩けません。**
> アドレスバーに URL を入れる操作は`GET`だからです。
> なので、この章だけは URL 直打ちの確認を飛ばして、ブラウザ側をつくってから確認します。

## 5-3. `api.js` に追記する

### 手順

1. `public/api.js`を開く
2. **すでに書いてあるコードの下**に、以下を貼る

```js

document.querySelector("#authButton").onclick = async () => {
  const password = document.querySelector("#passwordInput").value;
  const response = await fetch("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: password }),
  });
  const data = await response.json();
  document.querySelector("#authResult").innerText = data.message;
};
```

3. `Cmd + S`で保存する

### 書いたコードの意味

`fetch`の 2 番目に`{ }`が増えました。**POST で送るときは、これが必要です。**

| 書いたもの | 意味 |
| --- | --- |
| `method: "POST"` | POST で送る |
| `headers: { "Content-Type": "application/json" }` | 「これから JSON を送ります」とサーバーに伝える |
| `body: JSON.stringify({ password: password })` | 送りたい中身。`JSON.stringify()`で JSON の文字に変換する |

受け取り側は 4 章と同じ`await response.json()`です。

## 5-4. 入力欄を置く

### 手順

1. `public/index.html`を開く
2. `<script type="module" src="./api.js"></script>`の行の**すぐ上**に、以下を貼る

```html
    <!-- 5章: /auth -->
    <div>
      <input type="password" id="passwordInput">
      <button id="authButton">Authentication</button>
      <span id="authResult"></span>
    </div>
```

3. `Cmd + S`で保存する

`type="password"`にすると、打った文字が`●●●`で隠れます。

## 5-5. 確認する

### 手順

1. ブラウザで <http://localhost:8000> を`Cmd + Shift + R`で再読み込みする
2. 入力欄に`jigjp`と打って`Authentication`ボタンを押す
3. 次に、わざと違うパスワードを打ってボタンを押す

### こうなっていれば成功

- `jigjp`のとき → `ログインできました`
- 違うとき → `パスワードが違います`

**4 本目の API が完成しました。**

### 開発者ツールで、送ったものを見てみる

せっかくなので、`POST`で送ったパスワードが URL に出ていないことを確認しましょう。

1. 開発者ツールを開く（`F12`）
2. **Network**タブを開く
3. ボタンをもう一度押す
4. 一覧に出てきた`auth`をクリックする
5. **Payload**タブ（または**ペイロード**）を開く

`password`が body に入っていて、**URL には出ていない**ことが確認できます。前の章で見た GitHub のログインと同じ形です。

> [!WARNING]
> 今回はパスワードを`server.js`に直接書きました（**ハードコーディング**といいます）。
> これは練習用です。本物のアプリでこれをやると、GitHub にパスワードが公開されてしまいます。
> ちゃんとしたログイン機能は [ログインハンズオン](../did-login/README.md) でつくります。

# 6. 公開する

4 本の API ができました。でも、いま動いているのは**自分の PC の中だけ**です。`localhost`は自分のパソコンを指す住所なので、他の人は叩けません。

昨日デプロイした URL には、まだ今日の API がありません。GitHub にあるコードが昨日のままだからです。

### 手順

1. VSCode の左側の**ソース管理（Source Control）**タブを開く
2. 変更したファイルの一覧を確認する
3. **`public/api.js`の横の`+`ボタンを押す**
4. メッセージを書いて **commit** する
5. **push** する

> [!IMPORTANT]
> **手順 3 を忘れないでください。**
> `public/api.js`は今日新しくつくったファイルです。新しいファイルは`+`（ステージ）を押さないと commit に入りません。
> 押し忘れると、そのファイルだけ GitHub に届かず、公開したページでボタンが動きません。

やり方を忘れた人はこちらを見てください。

- [2-3. commit: 作業前と後の差分を記録しよう](../git/docs.md#2-3-commit-作業前と後の差分を記録しよう)
- [2-5. push: 作業の成果を Github にアップロードして共有しよう](../git/docs.md#2-5-push-作業の成果をgithubにアップロードして共有しよう)

push できたら、1〜2 分待ちます。Deno Deploy が**自動でデプロイし直してくれます。**昨日のような設定は必要ありません。

### こうなっていれば成功

**ページを開くのではなく、API を直接叩いて確認します。**

昨日の自分の URL の後ろに`/profile`を付けて、ブラウザで開いてみましょう。

```
https://自分のURL/profile
```

こう表示されます。

```json
{"name":"...","favorite":"..."}
```

4 章でやったのと同じことです。**違うのは URL の左側だけ**です。

```
http://localhost:8000/profile     ← 自分のPCの中
https://自分のURL/profile          ← インターネットの向こう側
```

`/greeting`や`/greeting-me?name=taro`も、同じように付けて試してみてください。

**自分のつくった API が、インターネットに公開されました。**この URL を教えれば、他の人のプログラムからも叩けます。

> [!TIP]
> API の動作確認は、こうやって**直接叩くのがふつう**です。
> ボタンを押して確かめると、画面が原因なのか API が原因なのか分かりません。
> API だけを先に確かめられると、原因の切り分けが速くなります。

ボタンから使えることも確認しておきましょう。スマホで自分の URL を開いて、ボタンを押してみてください。

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| `/profile`が`Not Found`になる | `server.js`が push できていません。GitHub のページで中身を確認してください |
| ボタンが表示されない | `index.html`が push できていません |
| ボタンはあるが動かない | `api.js`が push できていません。手順 3 のステージを確認してください |
| 何も変わらない | デプロイ中かもしれません。1 分待ってから、もう一度開いてください |

# 7. (終わった人から) 自分で API を増やす

ここまでで、API のつくり方は 4 パターン覚えました。

| パターン | 使うもの |
| --- | --- |
| 決まったものを返す | `new Response("文字")` |
| 渡された情報を使う | `searchParams.get("名前")` |
| まとめて返す | `Response.json({ ... })` |
| 送られたものを受け取る | `await req.json()` |

**この組み合わせで、自分の API を 1 本つくってみましょう。**

つくる手順は今日と同じです。

1. `server.js`の`return serveDir(`の上に書く
2. URL 直打ちで確認する（GET のとき）
3. `api.js`に書く
4. `index.html`にボタンを置く
5. ボタンで確認する

## 7-1. お題の例

思いつかない人は、この中から選んでください。

**やさしい**

- `/today` … 今日の気分を JSON で返す
- `/lucky` … 好きな数字を返す

**ふつう**

- `/double?number=5` … 渡された数字を 2 倍にして返す
  - ヒント: `Number(受け取った値) * 2`
- `/count?text=あいうえお` … 渡された文字が何文字か返す
  - ヒント: `受け取った値.length`

**むずかしい**

- `/dice` … 1〜6 のランダムな数字を返す
  - ヒント: `Math.floor(Math.random() * 6) + 1`
- `/greeting-time` … 時間帯によって「おはよう」「こんにちは」「こんばんは」を返す
  - ヒント: `new Date().getHours()`

## 7-2. (発展) 見つからないときは 404 を返す

いまつくった API は、いつでも成功したことになっています。

昨日、存在しない URL を開くと`Not Found`と出ましたね。あれは`404`という**ステータスコード**です。前の章で名前だけ出てきたものです。

自分の API でも返せます。

```js
  if (req.method === "GET" && pathname === "/profile") {
    const name = new URL(req.url).searchParams.get("name");
    if (name !== "taniguchi") {
      return Response.json({ message: "そんな人はいません" }, { status: 404 });
    }
    return Response.json({ name: "たにぐち", favorite: "ラーメン" });
  }
```

`Response.json()`の 2 番目に`{ status: 404 }`を渡すだけです。

**なぜ必要か。**ブラウザ側が「うまくいったのか、失敗したのか」を判断できるようになります。

```js
const response = await fetch("/profile?name=hoge");
if (!response.ok) {
  document.querySelector("#profileResult").innerText = "見つかりませんでした";
  return;
}
```

`response.ok`は、ステータスコードが 200 番台なら`true`、404 などなら`false`になります。

**エラーも、API のルールの一部です。**

# 8. うまくいかないときは

**ターミナルに`Unexpected reserved word`と出て、サーバーが止まった**

5 章の`async`を足し忘れています。[5-1](#5-1-serverjs-の-1-行を書き換える)に戻ってください。

**ブラウザで URL を直打ちすると`Not Found`**

`server.js`が保存できていないか、エンドポイントの綴りが違います。VSCode のタブに`●`が付いていたら未保存です。

**ボタンを押しても何も起きない**

開発者ツール（`F12`）の**Console**タブを見てください。

| 出ているもの | 対処 |
| --- | --- |
| `Cannot set properties of null` | `index.html`の`id`と`api.js`の`#〇〇`が違います |
| `Failed to load resource` | `<script type="module" src="./api.js">`の行を確認してください |
| 何も出ていない | `Cmd + Shift + R`で再読み込みしてください |

**`undefined`と表示される**

`server.js`で返しているキー名と、`api.js`の`data.〇〇`が違います。**両方を見比べて、同じ名前にそろえてください。**

**`server.js`に`return serveDir(`が見当たらない**

昨日の書き換えで消してしまったのかもしれません。以下のコマンドで`server.js`だけを最初の状態に戻せます。

```shell
curl -O https://raw.githubusercontent.com/jigintern/template-deno-dev/main/server.js
```

> [!WARNING]
> このコマンドは`server.js`を**上書きします。**昨日書き換えた文言も、今日つくった API も消えます。
> 実行する前に声をかけてください。

**どうしても直らない**

遠慮なく声をかけてください。

# 9. 今日書いたコードの全体

<details><summary>public/api.js（全体）</summary><div>

今日新しくつくったファイルなので、全体を載せます。

```js
document.querySelector("#greetingButton").onclick = async () => {
  const response = await fetch("/greeting");
  document.querySelector("#greetingResult").innerText = await response.text();
};

document.querySelector("#greetingMeButton").onclick = async () => {
  const name = document.querySelector("#nameInput").value;
  const response = await fetch("/greeting-me?name=" + name);
  document.querySelector("#greetingMeResult").innerText = await response.text();
};

document.querySelector("#profileButton").onclick = async () => {
  const response = await fetch("/profile");
  const data = await response.json();
  document.querySelector("#profileResult").innerText = data.name + " / " + data.favorite;
};

document.querySelector("#authButton").onclick = async () => {
  const password = document.querySelector("#passwordInput").value;
  const response = await fetch("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: password }),
  });
  const data = await response.json();
  document.querySelector("#authResult").innerText = data.message;
};
```

</div></details>

<details><summary>public/index.html に足したもの</summary><div>

`</body>`の直前に足した部分だけです。昨日書いたものはそのまま残っています。

```html
    <!-- 2章: /greeting -->
    <div>
      <button id="greetingButton">Hello</button>
      <span id="greetingResult"></span>
    </div>

    <!-- 3章: /greeting-me -->
    <div>
      <input type="text" id="nameInput">
      <button id="greetingMeButton">greeting me</button>
      <span id="greetingMeResult"></span>
    </div>

    <!-- 4章: /profile -->
    <div>
      <button id="profileButton">profile</button>
      <span id="profileResult"></span>
    </div>

    <!-- 5章: /auth -->
    <div>
      <input type="password" id="passwordInput">
      <button id="authButton">Authentication</button>
      <span id="authResult"></span>
    </div>

    <script type="module" src="./api.js"></script>
```

</div></details>

<details><summary>server.js に足したもの</summary><div>

> [!IMPORTANT]
> `server.js`は**全体を載せません。**昨日の書き換えで、中身が人それぞれ違うからです。
> ここにあるのは**今日足した部分だけ**です。まるごとコピーせず、自分の`server.js`と見比べてください。

まず、5 章で 1 行だけ書き換えました。

```js
Deno.serve(async (req) => {
```

そして、以下の 4 つが`return serveDir(`より**上**に並んでいれば完成です。

```js
  if (req.method === "GET" && pathname === "/greeting") {
    return new Response("Hello!!");
  }

  if (req.method === "GET" && pathname === "/greeting-me") {
    const name = new URL(req.url).searchParams.get("name");
    return new Response("Hello, " + name);
  }

  if (req.method === "GET" && pathname === "/profile") {
    return Response.json({
      name: "たにぐち",
      favorite: "ラーメン",
    });
  }

  if (req.method === "POST" && pathname === "/auth") {
    const body = await req.json();
    if (body.password === "jigjp") {
      return Response.json({ ok: true, message: "ログインできました" });
    }
    return Response.json({ ok: false, message: "パスワードが違います" });
  }
```

</div></details>

完成形の見本は、この教材リポジトリの [`api`](.) フォルダにも置いてあります。困ったときに見比べてみてください。

次は [Deno KV](../deno-kv/README.md) で、送られたデータを**保存**できるようにします。今日つくった`/auth`のようなデータは、サーバーを再起動すると消えてしまいますが、その解決編です。
