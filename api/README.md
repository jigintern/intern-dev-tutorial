# API ハンズオン

- [API ハンズオン](#api-ハンズオン)
- [0. このセクションの目標](#0-このセクションの目標)
  - [0-1. 今日さわるファイル](#0-1-今日さわるファイル)
  - [0-2. 昨日のアプリを起動しよう](#0-2-昨日のアプリを起動しよう)
- [1. そもそも API とは](#1-そもそも-api-とは)
- [2. 実は、昨日のアプリはもう API を叩いている](#2-実は昨日のアプリはもう-api-を叩いている)
- [3. API を追加してみよう その 1: GET](#3-api-を追加してみよう-その-1-get)
  - [3-1. サーバー側に API を生やす](#3-1-サーバー側に-api-を生やす)
  - [3-2. ブラウザで直接叩いて確認する](#3-2-ブラウザで直接叩いて確認する)
  - [3-3. クライアント側から叩く](#3-3-クライアント側から叩く)
  - [3-4. ボタンを押して確認する](#3-4-ボタンを押して確認する)
- [4. API を追加してみよう その 2: GET + クエリパラメータ](#4-api-を追加してみよう-その-2-get--クエリパラメータ)
  - [4-1. サーバー側](#4-1-サーバー側)
  - [4-2. ブラウザで直接叩いて確認する](#4-2-ブラウザで直接叩いて確認する)
  - [4-3. クライアント側](#4-3-クライアント側)
- [5. (終わった人から) API を追加してみよう その 3: POST](#5-終わった人から-api-を追加してみよう-その-3-post)
  - [5-1. サーバー側](#5-1-サーバー側)
  - [5-2. クライアント側](#5-2-クライアント側)
- [6. 公開して、スマホから叩いてみよう](#6-公開してスマホから叩いてみよう)
- [7. うまくいかないときは](#7-うまくいかないときは)
- [8. 今日書いたコードの全体](#8-今日書いたコードの全体)

# 0. このセクションの目標

このセクションのゴールはひとつです！

**昨日つくった自分の Web アプリに、自分で API を追加する**

昨日は「スマホで**見られる**」ところまでいきました。今日は、そのアプリが「**動く**」ようにします。

そのために、以下の順で進めます。

1. API が何なのかを知る
2. 昨日のアプリのどこが API だったのかを確かめる
3. 自分で API を追加する（3 種類）
4. 公開して、スマホから叩いてみる

> [!IMPORTANT]
> 今日は、[Deno のセクション](../deno/README.md)で作った**自分のリポジトリ**の中で作業します。
> この教材リポジトリ（`intern-dev-tutorial`）ではないので気をつけてください。
> 昨日クローンしたフォルダ（例: `deno-app`）を VSCode で開きましょう。

## 0-1. 今日さわるファイル

今日さわるのは 3 つだけです。そのうち 1 つは、これから新しく作ります。

| ファイル | 今日の扱い |
| --- | --- |
| `public/api.js` | **新しく作ります。**今日書く JavaScript は、全部このファイルに書きます |
| `public/index.html` | `</body>`の直前に**付け足す**だけ |
| `server.js` | `return serveDir(`と書いてある行の**上に付け足す**だけ |

> [!NOTE]
> **昨日書き換えた見た目やメッセージは、そのままで大丈夫です。**
> 今日は、消したり書き直したりはしません。**付け足していくだけ**です。
> `public/index.js`と`public/styles.css`は開きません。昨日のままにしておいてください。

## 0-2. 昨日のアプリを起動しよう

VSCode でフォルダを開いたら、「**ターミナル**」から「**新しいターミナル**」を選んで、昨日と同じコマンドを実行しましょう。

```shell
deno run --watch --allow-read --allow-net server.js
```

以下のように表示されたら起動できています。

```shell
Listening on http://0.0.0.0:8000/ (http://localhost:8000/)
```

ブラウザで <http://localhost:8000> を開いて、昨日つくったページが表示されることを確認しましょう。

**このターミナルは、今日ずっと開いたままにしておいてください。**`--watch`が付いているので、`server.js`を保存するたびに Deno が自動で再起動してくれます。

# 1. そもそも API とは

このセクションにはスライド資料があります。

- [スライド資料](https://jigintern.github.io/intern-dev-tutorial/api/api-slide.html)
- [PDF資料](https://jigintern.github.io/intern-dev-tutorial/api/api-slide.pdf)
- [テキスト資料](./slide.md)

**Application Programming Interface**の略です。

アプリケーションが別のアプリケーションの機能を呼び出すために使用するインターフェースのことを指します。

すでに実装されているアプリケーションの API を呼び出すことで、無駄な実装をする必要がなくなります。

また、呼び出す側は API の裏側にあるコードの動作を意識せずに使用できます。

主に API という言葉が使用されるのは Web アプリケーションにおけるサーバ側の処理の呼び出しですが、API はこれに限らず OS とアプリケーションの間や、Java などのライブラリでも使用されます。

# 2. 実は、昨日のアプリはもう API を叩いている

さて、いきなり新しいものを作る前に、**昨日つくったアプリの中身**を見てみましょう。

`public/index.js`を開いてみてください。2 行しか書かれていないはずです。

```js
const message = await fetch("/welcome-message")
document.querySelector("#welcomeMessage").innerText = await message.text()
```

実は、この 1 行目が **API を叩いているコード**です。

昨日、ブラウザに表示された「jig インターンへようこそ！」（や、自分で書き換えた文言）は、HTML に直接書かれていたわけではありません。

1. ブラウザがページを開く
2. ブラウザが`/welcome-message`という**エンドポイント**に問い合わせる ← これが API 呼び出し
3. サーバーが文字を返す
4. ブラウザが、返ってきた文字を`h1`タグの中に入れて表示する

という流れで表示されていました。

`server.js`の側も見てみましょう。この部分が、2 の問い合わせに答えている場所です。

```js
if (req.method === "GET" && pathname === "/welcome-message") {
  return new Response("jigインターンへようこそ！");
}
```

昨日「サーバーが返す文言を変えてみよう」で書き換えたのは、まさにこの API の中身だったというわけです。

つまり、**昨日の時点ですでに、みなさんは API をひとつ持っているアプリを作っていました。**

今日は、ここに自分で API を増やしていきます。

> [!NOTE]
> **fetch とは**
>
> ブラウザ側から API を叩くための機能です。`fetch("{叩きたいエンドポイント}")`と書くだけで、好きな API を呼び出せます。
>
> `fetch`は**非同期処理**を行うので、通信が終わる（データが返ってくる）まで待ちたい場合は`await`を付ける必要があります。

> [!NOTE]
> **エンドポイントとは**
>
> API の呼び出し側から見た、API の接続先のことです。
>
> たとえば、API を`http://hoge.com/fuga`と`http://hoge.com/piyo`（それぞれの処理は異なる）で呼び出せる場合、このそれぞれをエンドポイントと呼びます。
>
> なお、API のオリジン（プロトコルとホストとポート名をまとめたもの。今回の例では`http://hoge.com`にあたる）は基本同一であるため、オリジン以降の`/fuga`や`/piyo`のみでエンドポイントと呼ぶことがあります。

# 3. API を追加してみよう その 1: GET

まずは一番シンプルな API を作ります。

**`/greeting`というエンドポイントを叩くと、`Hello!!`が返ってくる API**です。

進め方は、この後の 4 章・5 章もすべて同じ 4 ステップです。

1. **サーバー側**に API を生やす
2. **ブラウザで直接叩いて**、サーバー側だけで動くことを確かめる
3. **クライアント側**から叩くコードを書く
4. ボタンを押して確かめる

2 を挟むのが大事です。ここを確認しておくと、うまく動かないときに**サーバーとブラウザのどちらが原因なのか**を自分で切り分けられるようになります。

## 3-1. サーバー側に API を生やす

`server.js`を開きましょう。

ファイルの下のほうに、こう書かれた行があるはずです。**これが今日の目印**になります。

```js
  return serveDir(req, {
```

この行の**すぐ上**に、以下のコードを追加します。

```js
  if (req.method === "GET" && pathname === "/greeting") {
    return new Response("Hello!!");
  }
```

追加すると、`server.js`はこんな形になります（`...`の部分は人によって違います。昨日書き換えた内容がそのまま残っていて大丈夫です）。

```js
  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("..."); // ← 昨日書き換えた文言。そのままでOK
  }

  // ↓ 今日追加したもの
  if (req.method === "GET" && pathname === "/greeting") {
    return new Response("Hello!!");
  }

  // ↓ この行が目印。これより上に追加していく
  return serveDir(req, {
```

書けたら`Ctrl + S`（Mac は`Cmd + S`）で保存しましょう。ターミナルに`Watcher File change detected! Restarting!`と出れば、サーバーが再起動されています。

コードの意味は以下のとおりです。

- `req.method`で、クライアントが使用した**メソッド**（GET や POST）を取得できます
- アクセス先のパスは`URL`クラスの`pathname`プロパティに入っています。ファイルの先頭のほうで`const pathname = new URL(req.url).pathname;`として取り出しているので、これを使って**どのエンドポイントが叩かれたのか**を判定します
- 条件に合ったら`new Response("返したい文字")`を`return`します

## 3-2. ブラウザで直接叩いて確認する

いま作ったのは**サーバー側だけ**です。まだボタンはありませんが、それでも動作は確認できます。

ブラウザのアドレスバーに、以下を直接入力してみましょう。

<http://localhost:8000/greeting>

画面に`Hello!!`とだけ表示されれば成功です 🎉

これが「API を叩く」ということです。ボタンもデザインもありませんが、**サーバーはちゃんと仕事をしています。**

> [!TIP]
> `Not Found`と表示される場合は、`server.js`の保存を忘れていないか、ターミナルにエラーが出ていないかを確認してみましょう。

## 3-3. クライアント側から叩く

サーバー側ができたので、今度はブラウザ側から叩けるようにします。

**まず、新しいファイルを作ります。**

`public`フォルダを右クリックして「**新しいファイル**」を選び、`api.js`という名前で作成しましょう。`public/api.js`ができれば OK です。

**次に、`public/index.html`にボタンを追加します。**

`index.html`を開いて、`</body>`と書かれている行の**すぐ上**に、以下をまるごと貼り付けましょう。

```html
    <!-- ここから今日の作業 -->
    <div id="apiPlayground">
      <button id="greetingButton">Hello</button>
      <p>Server: <span id="serverResponse"></span></p>
    </div>
    <script type="module" src="./api.js"></script>
```

- `button`が、API を叩くためのボタンです
- `span`が、返ってきた文字を表示する場所です
- 最後の`script`タグで、いま作った`api.js`を読み込んでいます

> [!NOTE]
> 昨日追加した`h1`や`p`はさわりません。その下に付け足すだけで大丈夫です。

**最後に、`public/api.js`にコードを書きます。**

```js
document.querySelector("#greetingButton").onclick = async () => {
  const response = await fetch("/greeting");
  document.querySelector("#serverResponse").innerText = await response.text();
};
```

やっていることは、2 章で見た`index.js`とほぼ同じです。違うのは、**ボタンが押されたときに**実行される点だけです。

- `document.querySelector("#greetingButton")`で、`id`が`greetingButton`のボタンを取得します
- `.onclick = async () => { ... }`で、そのボタンが押されたときの処理を登録します
- `fetch("/greeting")`で API を叩き、`await response.text()`で返ってきた文字を取り出します
- 取り出した文字を`serverResponse`の中に入れて表示します

## 3-4. ボタンを押して確認する

ブラウザで <http://localhost:8000> を再読み込みして、`Hello`ボタンを押してみましょう。

`Server: Hello!!`と表示されれば成功です 🎉

> [!TIP]
> `public`フォルダの中のファイルは、サーバーを再起動しなくても反映されます。ブラウザの再読み込みだけで大丈夫です。
>
> それでも変わらない場合は`Ctrl + Shift + R`（Mac は`Cmd + Shift + R`）で強制的に再読み込みしてみましょう。

うまくいかないときは、ブラウザで**開発者ツール**を開いて（`F12`、または右クリック →「検証」）、**Console**タブに赤いエラーが出ていないか見てみましょう。

# 4. API を追加してみよう その 2: GET + クエリパラメータ

さっきの API は、いつ叩いても同じ`Hello!!`が返ってきました。

今度は、**こちらから情報を渡して、それに応じた返事をもらう**API を作ります。

**`/greeting-me`というエンドポイントに`name`という情報を付けて送ると、`Hello, {name}`が返ってくる API**です。

この「情報を付けて送る」ための仕組みのひとつが**クエリパラメータ**です。URL の後ろに`?name=taro`のようにくっつけて送ります。

さっき作った`/greeting`は消さずに、追加していきましょう。

## 4-1. サーバー側

クライアントから送られてきたクエリパラメータは、以下のように取得できます。

```js
const param = new URL(req.url).searchParams.get("クエリパラメータ名");
```

これを使って、`server.js`の`return serveDir(`の**上**に追加しましょう。

```js
  if (req.method === "GET" && pathname === "/greeting-me") {
    const param = new URL(req.url).searchParams.get("name");
    return new Response("Hello, " + param);
  }
```

保存を忘れずに。

## 4-2. ブラウザで直接叩いて確認する

今回もまず、ブラウザのアドレスバーから直接叩いてみましょう。`?name=`の後ろは好きな名前に変えてみてください。

<http://localhost:8000/greeting-me?name=taro>

`Hello, taro`と表示されれば成功です。

URL の`taro`の部分を書き換えて、表示が変わることも確かめてみましょう。

## 4-3. クライアント側

**`public/index.html`にテキストボックスとボタンを追加します。**

さっき追加した`</div>`の**上**（`apiPlayground`の中）に、以下を追加しましょう。

```html
      <input type="text" id="nameInput">
      <button id="greetingMeButton">greeting me</button>
```

**`public/api.js`に、以下を追加します。**（前に書いたコードは消さずに、その下に付け足してください）

```js
document.querySelector("#greetingMeButton").onclick = async () => {
  const name = document.querySelector("#nameInput").value;
  const response = await fetch("/greeting-me?name=" + name);
  document.querySelector("#serverResponse").innerText = await response.text();
};
```

`document.querySelector("#nameInput").value`で、テキストボックスに入力された文字を取り出しています。それを`?name=`の後ろにくっつけて`fetch`しているだけです。

ブラウザを再読み込みして、名前を入力してボタンを押してみましょう。`Server: Hello, 〇〇`と表示されれば成功です 🎉

# 5. (終わった人から) API を追加してみよう その 3: POST

> [!NOTE]
> ここは**終わった人からやってみる**章です。時間が足りなければ、6 章に進んでも大丈夫です。あとから自分で進められます。

ここまでは`GET`メソッドを使ってきました。今度は`POST`メソッドを使って、**認証のようなもの**を作ってみます。

`GET`と`POST`の使い分けは、ざっくり言うとこうです。

- **GET**: 情報を**もらう**とき。送る情報は URL に付ける（＝ URL に見えてしまう）
- **POST**: 情報を**送る**とき。送る情報は**ボディ（body）**という見えない場所に入れる

パスワードのように人に見られたくないものは、URL に付ける`GET`ではなく`POST`で送ります。

作るのは、**`/auth`というエンドポイントに`pass`を送ると、あらかじめ決めたパスワードと一致していれば`Authentication Successful!!`、違っていれば`Authentication Failure`が返ってくる API**です。

## 5-1. サーバー側

POST で送信されたパラメータは、以下のように取得できます。

```js
const reqJson = await req.json();
const pass = reqJson.pass;
```

`json()`メソッドで、リクエストのボディに入っている JSON 形式のデータを取り出せます。これも非同期で行われるため`await`を使って、一度 JSON としてボディのデータを全部取り出してから、必要なパラメータを取り出す流れになります。

> [!IMPORTANT]
> **ここだけ、先に 1 単語を書き足します。**
>
> 今日はここまで「付け足すだけ」で進めてきましたが、この章では**すでにある行を 1 箇所だけ**書き換える必要があります。
>
> `server.js`の上のほうにある、この行を見てください。
>
> ```js
> Deno.serve((req) => {
> ```
>
> ここに`async`を足して、こうします。
>
> ```js
> Deno.serve(async (req) => {
> ```
>
> `await`は、`async`が付いた関数の中でしか使えないためです。2 章で見た`fetch`と同じで、`await`と`async`はセットになっています。
>
> これを忘れると、保存した瞬間にサーバーが止まって、ターミナルに以下のエラーが出ます。
>
> ```shell
> error: Uncaught SyntaxError: Unexpected reserved word
>     const reqJson = await req.json();
> ```

`async`を足したら、`server.js`の`return serveDir(`の**上**に追加しましょう。

```js
  if (req.method === "POST" && pathname === "/auth") {
    const reqJson = await req.json();
    const pass = reqJson.pass;
    if (pass === "jigjp") {
      return new Response("Authentication Successful!!");
    } else {
      return new Response("Authentication Failure");
    }
  }
```

> [!NOTE]
> POST の API は、GET と違って**ブラウザのアドレスバーからは叩けません。**
> アドレスバーに URL を入れる操作は GET だからです。ここだけは、クライアント側を作ってから確認します。

## 5-2. クライアント側

**`public/index.html`の`apiPlayground`の中に追加します。**

パスワードを扱うので、`type="password"`にしておきます。こうすると入力した文字が`●●●`で表示されます。

```html
      <input type="password" id="passwordInput">
      <button id="authButton">Authentication</button>
```

**`public/api.js`に追加します。**

`fetch`で POST を使う場合は、第 2 引数のオプションでメソッドを指定する必要があります。今回はボディも送り、その中身は JSON で送るため、以下のようになります。

```js
document.querySelector("#authButton").onclick = async () => {
  const pass = document.querySelector("#passwordInput").value;
  const response = await fetch("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pass: pass }),
  });
  document.querySelector("#serverResponse").innerText = await response.text();
};
```

- `method: "POST"`で、POST メソッドを使うことを指定します
- `headers`で「これから JSON を送ります」とサーバーに伝えています
- `body`に、送りたい中身を入れます。`JSON.stringify()`は、JavaScript のオブジェクトを JSON の文字列に変換する関数です

ブラウザを再読み込みして、`jigjp`と入力してボタンを押してみましょう。`Authentication Successful!!`と表示されれば成功です。わざと違うパスワードを入れて、`Authentication Failure`になることも確かめてみましょう。

> [!WARNING]
> 今回はパスワードを`server.js`に直接書きました（**ハードコーディング**といいます）が、これは練習用の書き方です。
> 本物のアプリでこれをやると、GitHub にパスワードがそのまま公開されてしまいます。
> ちゃんとした認証の作り方は [ログインハンズオン](../did-login/README.md) で扱います。

# 6. 公開して、スマホから叩いてみよう

自分のアプリに API が増えました。でも、いま動いているのは**自分の PC の中だけ**です。

昨日デプロイした URL を開いても、まだ`Hello`ボタンはありません。GitHub に置いてあるコードが、まだ昨日のままだからです。

**commit して push しましょう。**

1. VSCode の左側の**ソース管理（Source Control）**タブを開く
2. 変更したファイルを確認して、メッセージを書いて **commit** する
3. **push** して GitHub に送る

やり方を忘れてしまった人は、こちらを見てください。

- [2-3. commit: 作業前と後の差分を記録しよう](../git/docs.md#2-3-commit-作業前と後の差分を記録しよう)
- [2-5. push: 作業の成果を Github にアップロードして共有しよう](../git/docs.md#2-5-push-作業の成果をgithubにアップロードして共有しよう)

> [!TIP]
> 今日は`public/api.js`という**新しいファイル**を作りました。
> 新しく作ったファイルは、commit する前に**ステージ（`+`ボタン）**を押す必要があります。押し忘れると、そのファイルだけ GitHub に届きません。

push できたら、少し待ちましょう。Deno Deploy が**自動でデプロイし直してくれます。**昨日のように設定をやり直す必要はありません。

デプロイが終わったら、**自分のスマホで昨日の URL を開いてみてください。**

ボタンを押すと、インターネットの向こう側にあるサーバーが返事をしてくれます 🎉

昨日は「見えるだけ」だったアプリが、今日は「**動く**」ようになりました。

# 7. うまくいかないときは

**ブラウザで直接叩くと`Not Found`になる**

`server.js`の保存を忘れていないか確認しましょう。ターミナルに`Watcher File change detected! Restarting!`と出ていれば保存できています。

エンドポイントの綴りが合っているかも確認してみてください。`/greeting-me`を`/greeting_me`と書いていた、というのはよくある間違いです。

**ターミナルに`Unexpected reserved word`と出て、サーバーが止まった**

5 章で`Deno.serve(async (req) => {`の`async`を足し忘れています。[5-1](#5-1-サーバー側)を確認してください。

**ボタンを押しても何も起きない**

ブラウザの開発者ツール（`F12`、または右クリック →「検証」）を開いて、**Console**タブを見てみましょう。

`Cannot set properties of null`のようなエラーが出ている場合は、`index.html`の`id`と`api.js`の`#〇〇`が一致していない可能性が高いです。見比べてみてください。

**エラーは出ていないが、表示が変わらない**

`index.html`に`<script type="module" src="./api.js"></script>`の行を追加し忘れていないか確認しましょう。この行がないと、`api.js`は読み込まれません。

**`server.js`に`return serveDir(`が見当たらない**

昨日の書き換えで消してしまったのかもしれません。以下のコマンドで、`server.js`だけを最初の状態に戻せます。

```shell
curl -O https://raw.githubusercontent.com/jigintern/template-deno-dev/main/server.js
```

> [!WARNING]
> このコマンドは`server.js`を**上書き**します。昨日書き換えた文言も元に戻ってしまうので、実行する前に一度声をかけてください 🙋
> `public`フォルダの中身（見た目）には影響しません。

**そのほか、どうしても直らない**

遠慮なく声をかけてください 🙋

# 8. 今日書いたコードの全体

`public/api.js`は今日新しく作ったファイルなので、全体を載せておきます。

<details><summary>public/api.js</summary><div>

```js
document.querySelector("#greetingButton").onclick = async () => {
  const response = await fetch("/greeting");
  document.querySelector("#serverResponse").innerText = await response.text();
};

document.querySelector("#greetingMeButton").onclick = async () => {
  const name = document.querySelector("#nameInput").value;
  const response = await fetch("/greeting-me?name=" + name);
  document.querySelector("#serverResponse").innerText = await response.text();
};

// 5章まで進んだ人だけ
document.querySelector("#authButton").onclick = async () => {
  const pass = document.querySelector("#passwordInput").value;
  const response = await fetch("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pass: pass }),
  });
  document.querySelector("#serverResponse").innerText = await response.text();
};
```

</div></details>

<details><summary>public/index.html に追加したもの</summary><div>

`</body>`の直前に追加した部分です。昨日書いたものはそのまま残しておいてください。

```html
    <!-- ここから今日の作業 -->
    <div id="apiPlayground">
      <button id="greetingButton">Hello</button>
      <input type="text" id="nameInput">
      <button id="greetingMeButton">greeting me</button>
      <input type="password" id="passwordInput">
      <button id="authButton">Authentication</button>
      <p>Server: <span id="serverResponse"></span></p>
    </div>
    <script type="module" src="./api.js"></script>
```

</div></details>

<details><summary>server.js に追加したもの</summary><div>

> [!IMPORTANT]
> `server.js`は**全体を載せません。**昨日の書き換えで、中身が人それぞれ違うからです。
> ここに載っているのは**今日追加した部分だけ**です。まるごとコピーせず、自分の`server.js`と見比べてください。

以下の 3 つが`return serveDir(`より**上**に並んでいれば完成です。（5 章まで進んだ人は、あわせて`Deno.serve(async (req) => {`の`async`も必要です）

```js
  if (req.method === "GET" && pathname === "/greeting") {
    return new Response("Hello!!");
  }

  if (req.method === "GET" && pathname === "/greeting-me") {
    const param = new URL(req.url).searchParams.get("name");
    return new Response("Hello, " + param);
  }

  if (req.method === "POST" && pathname === "/auth") {
    const reqJson = await req.json();
    const pass = reqJson.pass;
    if (pass === "jigjp") {
      return new Response("Authentication Successful!!");
    } else {
      return new Response("Authentication Failure");
    }
  }
```

</div></details>

完成形の見本は、この教材リポジトリの [`api`](.) フォルダにも置いてあります。困ったときに見比べてみてください。

次は [クライアント・サーバの通信](../transfer-protocol/README.md) で、いま叩いた API の裏側で何が起きていたのかを見ていきます。
