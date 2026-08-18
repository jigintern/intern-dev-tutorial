# API ハンズオン

- [0. スライド](#0-スライド)
  - [0-0. 今日の流れ](#0-0-今日の流れ)
  - [0-1. 今日さわるファイル](#0-1-今日さわるファイル)
  - [0-2. 昨日のアプリを開く](#0-2-昨日のアプリを開く)
  - [0-3. 直したら、毎回 push します](#0-3-直したら毎回-push-します)
  - [0-4. 見る場所は 2 つあります](#0-4-見る場所は-2-つあります)
  - [0-5. なぜ `serveDir` の「上」なのか](#0-5-なぜ-servedir-の上なのか)
- [1. 情報を送る API をつくる](#1-情報を送る-api-をつくる)
  - [1-1. 今日のページをつくる](#1-1-今日のページをつくる)
  - [1-2. `server.js` の 1 行を書き換える](#1-2-serverjs-の-1-行を書き換える)
  - [1-3. サーバーに `/auth` を追加する](#1-3-サーバーに-auth-を追加する)
  - [1-4. `api.js` をつくる](#1-4-apijs-をつくる)
  - [1-5. push して確認する](#1-5-push-して確認する)
  - [1-6. 送ったものを開発者ツールで見てみる](#1-6-送ったものを開発者ツールで見てみる)
- [2. スマホから叩いてみる](#2-スマホから叩いてみる)
- [3. (発展) 自分で API を増やす](#3-発展-自分で-api-を増やす)
  - [3-1. まずは GET の API を 1 本](#3-1-まずは-get-の-api-を-1-本)
  - [3-2. お題の例](#3-2-お題の例)
  - [3-3. 見つからないときは 404 を返す](#3-3-見つからないときは-404-を返す)
- [4. うまくいかないときは](#4-うまくいかないときは)
- [5. 今日書いたコードの全体](#5-今日書いたコードの全体)

# 0. スライド

> [!NOTE]
> このセクションにはスライド資料があります。
>
> - [スライド資料](https://jigintern.github.io/intern-dev-tutorial/api/api-slide.html)
> - [PDF資料](https://jigintern.github.io/intern-dev-tutorial/api/api-slide.pdf)
> - [テキスト資料](./slide.md)

## 0-0. 今日の流れ

「API とは何か」と「`server.js`が何をしているファイルなのか」は、**スライドで説明したとおり**です。ここからは手を動かします。

| 章 | やること |
| --- | --- |
| 0 | 準備。アプリを開いて、今日の進め方を確認する |
| 1 | `/auth` … パスワードを**送って**、あっているかどうかを返してもらう |
| 2 | スマホから、自分の API を叩く |
| 3 | (発展) 自分で API を増やす |

**つくる API は 1 本だけです。**手順は 4 つ。

1. `server.js`に窓口を足す
2. `public/api.html`と`public/api.js`を**新しくつくる**
3. **push する**
4. ブラウザで確認する

> [!NOTE]
> **実は、API を使うのは今日が初めてではありません。**
> 昨日のページは`index.js`から`fetch("/welcome-message")`で文字を受け取っていました。あれが**受け取るだけ**の API です。
> 今日やるのは**送る側**です。ブラウザからサーバーへ情報を渡して、その結果を返してもらいます。

> [!IMPORTANT]
> 今日は、[Deno のセクション](../deno/README.md)で作った**自分のリポジトリ**の中で作業します。
> この教材リポジトリ（`intern-dev-tutorial`）ではありません。

## 0-1. 今日さわるファイル

3 つです。そのうち 2 つは、これから新しくつくります。

| ファイル | 今日の扱い |
| --- | --- |
| `server.js` | `return serveDir(`の行の**上に足す**だけ |
| `public/api.html` | **新しくつくる。**今日の画面はここ |
| `public/api.js` | **新しくつくる。**今日書く JavaScript は全部ここ |

> [!IMPORTANT]
> **`public/index.html`は、今日は開きません。**
> 昨日つくったページはそのまま残して、今日の分は`api.html`という**別のページ**につくります。
> 昨日の成果を壊す心配がありません。

`public/index.js`と`public/styles.css`も開きません。

**既存のファイルに足すのは`server.js`の 1 か所だけです。場所はここ。**

```js
import { serveDir } from "jsr:@std/http@1.1.3/file-server";

Deno.serve((req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("jigインターンへようこそ！");
  }

  // ====================================
  //   ここ！
  //   今日足すのは、ぜんぶこの場所です
  // ====================================

  return serveDir(req, {          // ← この行の「すぐ上」
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
```

上のほう（`/welcome-message`のあたり）は、昨日書き換えた人はもっと違う形になっているはずです。**そこは気にしなくて大丈夫です。**探すのは`return serveDir(`の 1 行だけ。それを見つけたら、そのすぐ上に足します。

昨日、それぞれ好きなように書き換えたので、**`server.js`の中身は人によって違います。**返す文言を変えた人、自分でルーティングを足した人、Claude に手伝ってもらって整えた人もいるはずです。

なので、この資料には**行番号を書いていません。**「15 行目に足してください」と書いても、人によってそこが違う場所になってしまうからです。かわりに使うのが、上の`return serveDir(`という**目印**です。この行は、消してしまうとページが表示されなくなるので、**昨日デプロイできた人には必ず残っています。**

## 0-2. 昨日のアプリを開く

### 手順

1. VSCode で、昨日クローンしたフォルダ（例: `deno-app`）を開く
2. ブラウザで **<https://deno.com/deploy>** を開いて、**自分のアプリのページ**を表示する
3. そこに出ている URL を開く（昨日デプロイしたページです）

昨日発行された URL は、こういう形をしています。

```
https://アプリ名.置き場所の名前.deno.net
```

### こうなっていれば成功

昨日つくったページが表示されます。

> [!IMPORTANT]
> **この 2 つのタブは、今日ずっと開いたままにしておいてください。**
>
> | タブ | 何に使うか |
> | --- | --- |
> | 自分のアプリ（`.deno.net`） | 今日つくるページも API も、全部この URL の後ろにくっつけて開きます |
> | [Deno Deploy](https://deno.com/deploy) | push したあとの**デプロイの進み具合**と、サーバー側の**ログ**を見ます |

> [!NOTE]
> この資料では、あなたの URL のことを`https://自分のURL`と書きます。
> 出てきたら、自分の URL に読み替えてください。

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| URL が分からなくなった | [Deno Deploy](https://deno.com/deploy) を開いて、自分のアプリのページを見てください |
| ページが表示されない | 昨日のデプロイが終わっていないかもしれません。声をかけてください |
| VSCode に`server.js`が見えない | フォルダが違います。昨日クローンしたフォルダを開き直してください |

## 0-3. 直したら、毎回 push します

**今日は、自分の PC でサーバーを動かしません。**書いたコードは、`https://自分のURL`で動いているものを直接見て確認します。

ただし、あちらで動いているのは**GitHub に置いてあるコード**です。VSCode で保存しただけでは、まだ自分の PC の中にあるだけで、あちらには何も届いていません。

```
VSCodeで保存  →  commit  →  push  →  GitHub  →  自動でデプロイ  →  https://自分のURL に反映
   手元                                            1〜2分
```

つまり、**書き換えるたびに commit と push が必要です。**

### 毎回やる手順

1. VSCode で`Cmd + S`（Windows は `Ctrl + S`）で保存する
2. 左側の**ソース管理（Source Control）**タブを開く
3. **変更したファイルの横の`+`ボタンを押す**（ステージする）
4. メッセージを書いて **commit** する
5. **push** する
6. **1〜2 分待つ**
7. ブラウザで`Cmd + Shift + R`（Windows は `Ctrl + Shift + R`）で強制再読み込みして確認する

やり方を忘れた人はこちらを見てください。

- [2-3. commit: 作業前と後の差分を記録しよう](../git/docs.md#2-3-commit-作業前と後の差分を記録しよう)
- [2-5. push: 作業の成果を Github にアップロードして共有しよう](../git/docs.md#2-5-push-作業の成果をgithubにアップロードして共有しよう)

> [!IMPORTANT]
> **手順 3 の`+`を忘れないでください。**
> 今日つくる`public/api.html`と`public/api.js`は、どちらも新しいファイルです。新しいファイルは`+`（ステージ）を押さないと commit に入りません。
> 押し忘れると、そのファイルだけ GitHub に届かず、**ページを開いても`Not Found`**になります。

### 待っている間に見るもの

push したあと、デプロイが終わったかどうかは [Deno Deploy](https://deno.com/deploy) の自分のアプリのページで分かります。

新しいビルドが走り、**緑のチェックが付けば反映済み**です。昨日デプロイしたときに見たのと同じ画面です。

> [!TIP]
> **「直したのに変わらない」と思ったら、まずこの 3 つを疑ってください。**
>
> 1. push できていない（ソース管理タブに変更が残っていないか）
> 2. デプロイがまだ終わっていない（あと 1 分待つ）
> 3. ブラウザが古いものを覚えている（`Cmd + Shift + R`で強制再読み込み）

## 0-4. 見る場所は 2 つあります

うまく動かないとき、中を覗ける場所が 2 つあります。**見えるものが違います。**

| どこで見るか | 何が見えるか |
| --- | --- |
| **Deno Deploy の Logs**（サーバー側） | どのパスが叩かれたか |
| **開発者ツールの Network タブ**（ブラウザ側） | 何を送って、何が返ってきたか |

**サーバー側**は、[Deno Deploy](https://deno.com/deploy) で自分のアプリのページを開いて **Logs**（ログ）を見ます。ページを開くと、こう出ます。

```shell
/
/styles.css
/index.js
/welcome-message
```

これを出しているのは`server.js`の`console.log(pathname)`です。**叩かれたパスを毎回表示している**ので、今日 API を追加したあとも、ここを見れば「ちゃんと叩けているか」が分かります。

**ブラウザ側**は、`F12`（または右クリック →「検証」）で開発者ツールを開いて、**Network**タブを見ます。**Status**が`200`なら成功、`404`なら「そんな窓口はない」という意味です。行をクリックすると、送ったものと返ってきたものが見られます。

> [!TIP]
> この 2 つは**切り分けの道具**になります。今日、ボタンを押して動かないときはこう考えてください。
>
> - ログに何も出ない → **リクエストがサーバーに届いていない**（ブラウザ側の問題）
> - ログには出るのに画面が変わらない → **届いてはいる**（サーバーの返し方か、ブラウザの受け取り方の問題）

そして大事なのは、**どちらからも「サーバーの中でやっている処理」は見えない**ということです。

`/welcome-message`が文字を返していることは分かりますが、**それをどうやって決めたのかは、外からは見えません。**`server.js`を開かないと分かりません。

これがスライドで見た**窓口**です。外から見えるのは窓口でのやりとりだけ。だから、見せたくないものはサーバー側に置けるわけです。**今日つくる`/auth`が、まさにこれです。**

## 0-5. なぜ `serveDir` の「上」なのか

`server.js`に足すときは、必ず`return serveDir(`の**上**です。理由は`return`が「ここで返して、おわり」という意味だからです。

```js
  return serveDir(req, {     // ← ここで終わってしまう
    fsRoot: "public",
  });

  if (pathname === "/auth") {       // ← ここには絶対に来ない
    return new Response("Hello!!");
  }
```

`serveDir`より下に書いた API には、**一生たどりつきません。**

これで準備は終わりです。昨日どう書き換えていても、**全員が同じ手順で進められます。**手を動かしていきましょう。

# 1. 情報を送る API をつくる

**`/auth`にパスワードを送ると、あっているかどうかが返ってくる**API をつくります。

なぜパスワードなのか。スライドで見た**利点 2「見せたくないものを隠せる」**を、実際にやってみるためです。

ブラウザ側のコードは、開発者ツールで誰でも中身を見られます。でもサーバー側（`server.js`）の中身は見えません。だから**パスワードの照合はサーバー側でやります。**

そして、送るときに使うのが`POST`です。前の章で勉強したとおり、`GET`で渡した情報は**URL に出ます。**もし`GET`でパスワードを送ったら、こうなってしまいます。

```
https://自分のURL/auth?password=jigjp
```

**丸見えです。**アドレスバーにも、ブラウザの履歴にも残ります。

`POST`は情報を URL ではなく**body**に入れて送るので、URL には出ません。だから今日は`POST`を使います。

つくるものはこの 4 つです。

| | これがルール | 今日の場合 |
| --- | --- | --- |
| ① | どの URL か | `/auth` |
| ② | どのメソッドか | **`POST`** |
| ③ | 何を渡すか | `password`（body に JSON で） |
| ④ | 何が返るか | `{ ok, message }`（**JSON**） |

## 1-1. 今日のページをつくる

まず、今日の画面をつくります。**昨日の`index.html`とは別の、新しいページです。**

### 手順

1. VSCode の左側で、`public`フォルダを**右クリック**する
2. 「**新しいファイル**」を選ぶ
3. `api.html`と入力して Enter
4. 開いた空のファイルに、以下を**全部**貼る

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API ハンズオン</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <h1>ログイン</h1>

    <div>
      <input type="password" id="passwordInput" placeholder="パスワード">
      <button id="authButton">Authentication</button>
      <span id="authResult"></span>
    </div>

    <script type="module" src="./api.js"></script>
  </body>
</html>
```

5. `Cmd + S`で保存する

### こうなっていれば成功

VSCode の左側の`public`フォルダの中に、`api.html`が並んでいます。

```
public
├── api.html    ← 今つくった
├── index.html
├── index.js
└── styles.css
```

### 書いたコードの意味

- `type="password"`にすると、打った文字が`●●●`で隠れます
- `<link rel="stylesheet" href="./styles.css">`で、昨日の CSS をそのまま使い回しています
- `<script type="module" src="./api.js"></script>`で、次につくる`api.js`を読み込みます

> [!NOTE]
> **このページは、どうやって表示されるのでしょうか。**
> あとで`https://自分のURL/api.html`を開くと、`server.js`の`if`はどれにも当たりません。
> なので[0-5](#0-5-なぜ-servedir-の上なのか)で見たとおり、一番下の`serveDir`が受け皿になって`public/api.html`を返します。
> **ページを開くのも、API を叩くのも、同じ窓口へのリクエストです。**違うのは、誰が答えるかだけです。

## 1-2. `server.js` の 1 行を書き換える

> [!IMPORTANT]
> **今日、すでにある行を書き換えるのはここだけです。**そして、**今日いちばん間違えやすいところです。**

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

昨日`fetch`で`await`を使ったときも、`async () => {`とセットになっていました。**`await`と`async`はセットです。**

> [!WARNING]
> **`async`を書き忘れたまま push すると、サーバーが起動できなくなります。**
> API だけでなく、**昨日つくったページも表示されなくなる**ので、いちばん焦るパターンです。
>
> そうなったら [Deno Deploy](https://deno.com/deploy) の **Logs** を見てください。こう出ています。
>
> ```shell
> error: Uncaught SyntaxError: Unexpected reserved word
>     const body = await req.json();
> ```
>
> **この手順に戻って`async`を足し、もう一度 push すれば元に戻ります。**壊れっぱなしにはなりません。

## 1-3. サーバーに `/auth` を追加する

### 手順

1. `server.js`の下のほうにある、この行を探す

```js
  return serveDir(req, {
```

2. その行の**すぐ上**に、以下を貼る

```js
  if (req.method === "POST" && pathname === "/auth") {
    const body = await req.json();
    if (body.password === "jigjp") {
      return Response.json({ ok: true, message: "ログインできました" });
    }
    return Response.json({ ok: false, message: "パスワードが違います" });
  }

```

3. `Cmd + S`で保存する

### こうなっていれば成功

貼ったあと、あなたの`server.js`はこう見えます。`...`の部分は人によって違います。**昨日書き換えた内容はそのままで大丈夫です。**

```js
Deno.serve(async (req) => {          // ← 1-2 で async を足した
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("...");
  }

  if (req.method === "POST" && pathname === "/auth") {
    const body = await req.json();
    if (body.password === "jigjp") {
      return Response.json({ ok: true, message: "ログインできました" });
    }
    return Response.json({ ok: false, message: "パスワードが違います" });
  }

  return serveDir(req, {
    fsRoot: "public",
```

### 書いたコードの意味

- `req.method === "POST"`で、**POST で来たときだけ**動くようにしています。前の章で勉強した`GET`と`POST`が、ここに出てきます
- `pathname`に、叩かれた URL のパス（`/auth`の部分）が入っています
- `await req.json()`で、**body に入っている JSON を取り出します**
- `body.password`が`jigjp`と同じかどうかで、返す内容を変えています

そして返し方です。昨日の`/welcome-message`は文字を 1 つ返していました。今日は **JSON** を返します。

```js
new Response("文字")            // 文字を返す（昨日）
Response.json({ キー: 値 })     // JSONを返す（今日）
```

`{ }`の中に`キー: 値`をカンマで区切って並べます。今回は`ok`と`message`の 2 つを返しています。**1 回のやりとりで、複数の情報をまとめて返せる**のが JSON です。実際の Web アプリの API は、ほとんどこの形です。

> [!NOTE]
> `POST`の API は、`GET`と違って**ブラウザのアドレスバーからは叩けません。**
> アドレスバーに URL を入れる操作は`GET`だからです。
> なので、ブラウザ側をつくってから、ボタンで確認します。

## 1-4. `api.js` をつくる

今日書く JavaScript を入れるファイルを、新しくつくります。

### 手順

1. VSCode の左側で、`public`フォルダを**右クリック**する
2. 「**新しいファイル**」を選ぶ
3. `api.js`と入力して Enter
4. 開いた空のファイルに、以下を**全部**貼る

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

5. `Cmd + S`で保存する

### 書いたコードの意味

- `document.querySelector("#authButton")`で、`id`が`authButton`のボタンを取ってきます
- `.onclick = async () => { ... }`で、そのボタンが押されたときの処理を登録します
- `document.querySelector("#passwordInput").value`で、入力欄に打たれた文字を取り出します

そして`fetch`です。昨日は`fetch("/welcome-message")`だけでした。今日は 2 番目に`{ }`が増えています。**POST で送るときは、これが必要です。**

| 書いたもの | 意味 |
| --- | --- |
| `method: "POST"` | POST で送る |
| `headers: { "Content-Type": "application/json" }` | 「これから JSON を送ります」とサーバーに伝える |
| `body: JSON.stringify({ password: password })` | 送りたい中身。`JSON.stringify()`で JSON の文字に変換する |

受け取り方も昨日と 1 か所だけ違います。

```js
await response.text()   // 文字として受け取る（昨日）
await response.json()   // JSONとして受け取る（今日）
```

`response.json()`で受け取ると、`data.ok`や`data.message`のように**キーを指定して取り出せます。**

```js
const data = await response.json();
data.ok        // true
data.message   // "ログインできました"
```

## 1-5. push して確認する

3 つのファイルが揃いました。まとめて公開します。

### 手順

1. **commit して push する**（[0-3](#0-3-直したら毎回-push-します) の手順）
   - **`public/api.html`と`public/api.js`の`+`を押すのを忘れずに**
2. 1〜2 分待つ
3. ブラウザのアドレスバーに、以下を直接入力して Enter

```
https://自分のURL/api.html
```

4. 入力欄に`jigjp`と打って`Authentication`ボタンを押す
5. 次に、わざと違うパスワードを打ってボタンを押す

### こうなっていれば成功

- `jigjp`のとき → `ログインできました`
- 違うとき → `パスワードが違います`

**API が完成しました。**送った情報でサーバーが判断して、その結果が返ってきています。

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| ページ自体が`Not Found` | `api.html`が push できていません。ソース管理タブで`+`を押したか確認してください |
| 昨日のページまで表示されなくなった | `async`の書き忘れです。[1-2](#1-2-serverjs-の-1-行を書き換える)に戻ってください |
| ボタンを押しても何も起きない | 開発者ツール（`F12`）の**Console**タブを見てください。下の表へ |
| 何も変わらない | デプロイがまだ終わっていません。1 分待って`Cmd + Shift + R` |

**Console**タブに出ているものと、その意味です。

| Console に出ているもの | 意味と対処 |
| --- | --- |
| `Cannot set properties of null` | `api.html`の`id`と`api.js`の`#〇〇`が違います。見比べてください |
| `Failed to load resource: api.js` | `api.js`が push できていません。ソース管理タブで`+`を押したか確認してください |
| `undefined`と表示される | `server.js`のキー名（`message`）と`api.js`の`data.〇〇`が違います。**両側セットで**そろえてください |

## 1-6. 送ったものを開発者ツールで見てみる

せっかくなので、`POST`で送ったパスワードが URL に出ていないことを確認しましょう。

### 手順

1. 開発者ツールを開く（`F12`）
2. **Network**タブを開く
3. ボタンをもう一度押す
4. 一覧に出てきた`auth`をクリックする
5. **Payload**タブ（または**ペイロード**）を開く

### こうなっていれば成功

`password`が body に入っていて、**URL には出ていない**ことが確認できます。前の章で見た GitHub のログインと同じ形です。

**Response**タブを開けば、返ってきた JSON もそのまま見られます。

> [!WARNING]
> 今回はパスワードを`server.js`に直接書きました（**ハードコーディング**といいます）。
> これは練習用です。本物のアプリでこれをやると、GitHub にパスワードが公開されてしまいます。
> ちゃんとしたログイン機能は [ログインハンズオン](../did-login/README.md) でつくります。

# 2. スマホから叩いてみる

API ができました。そして、**もう公開されています。**push した時点でインターネットに出ているので、改めて公開する作業はありません。

つまり、**この URL は自分の PC 以外からも叩けます。**確かめてみましょう。

### 手順

1. スマホのブラウザで`https://自分のURL/api.html`を開く
2. `jigjp`と打ってボタンを押す

### こうなっていれば成功

PC と同じように`ログインできました`と表示されます。

**自分のつくった API が、インターネットに公開されています。**この URL を教えれば、他の人のプログラムからも叩けます。

> [!TIP]
> 昨日のページ（`https://自分のURL`）も、そのまま残っています。
> `index.html`を触らなかったので、**2 つのページが 1 つのアプリの中に並んでいる**状態です。
> `index.html`にリンクを 1 行足せば、昨日のページから今日のページに飛べます。
>
> ```html
> <a href="./api.html">APIハンズオンのページへ</a>
> ```

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| スマホだけ古いまま | スマホのブラウザが古いものを覚えています。タブを閉じて開き直してください |
| スマホだと`Not Found` | URL の`/api.html`まで正しく入力できているか確認してください |

# 3. (発展) 自分で API を増やす

ここまでで、API のつくり方は 4 パターン覚えました。

| パターン | 使うもの |
| --- | --- |
| 決まったものを返す | `new Response("文字")` |
| まとめて返す | `Response.json({ ... })` |
| 送られたものを受け取る | `await req.json()` |
| 送る側から呼ぶ | `fetch(URL, { method, headers, body })` |

**この組み合わせで、自分の API をつくってみましょう。**

## 3-1. まずは GET の API を 1 本

今日つくったのは`POST`でした。もう 1 つのメソッド、`GET`もやってみましょう。

**`/greeting-me`に`name`を渡すと、`Hello, {渡した名前}`が返ってくる**API です。渡す方法は、前の章で勉強した**クエリパラメータ**です。URL の後ろに`?name=taro`のようにくっつけます。

### 手順

1. `server.js`の`return serveDir(req, {`の**すぐ上**に、以下を貼る

```js
  if (req.method === "GET" && pathname === "/greeting-me") {
    const name = new URL(req.url).searchParams.get("name");
    return new Response("Hello, " + name);
  }

```

2. `Cmd + S`で保存して、**push する**
3. 1〜2 分待って、ブラウザのアドレスバーに以下を入力して Enter

```
https://自分のURL/greeting-me?name=taro
```

4. `taro`の部分を自分の名前に変えて、もう一度 Enter

### こうなっていれば成功

1 回目は`Hello, taro`、2 回目は`Hello, 自分の名前`と表示されます。**URL を変えると返事が変わりました。**

### GET はブラウザだけで確認できます

気づいたでしょうか。**ボタンをつくらずに動作確認ができました。**

`GET`はアドレスバーに URL を入れるだけで叩けるので、**サーバー側だけを先に確かめられます。**動かないときに「サーバーが悪いのか、ブラウザ側が悪いのか」を自分で切り分けられるので、これは覚えておくと便利です。

### 書いたコードの意味

```js
new URL(req.url).searchParams.get("name")
```

これで、クエリパラメータの`name`の中身を取り出せます。`?name=taro`で来たら`taro`が入ります。

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| `Hello, null`と出る | `?name=`の部分を書き忘れています。URL を確認してください |
| `Not Found`と出る | push できているか、デプロイが終わっているかを確認してください |
| `Not Found`と出る（push 済み） | `/greeting-me`の綴りを確認してください（`greeting_me`ではありません） |

### ボタンからも叩くには

`api.html`の`</body>`の**すぐ上**（`<script>`の行より上）に足します。

```html
    <div>
      <input type="text" id="nameInput">
      <button id="greetingMeButton">greeting me</button>
      <span id="greetingMeResult"></span>
    </div>
```

`api.js`の**いちばん下**に足します。

```js

document.querySelector("#greetingMeButton").onclick = async () => {
  const name = document.querySelector("#nameInput").value;
  const response = await fetch("/greeting-me?name=" + name);
  document.querySelector("#greetingMeResult").innerText = await response.text();
};
```

`GET`なので`fetch`は URL 1 つだけ。受け取るのは文字なので`response.text()`です。

## 3-2. お題の例

思いつかない人は、この中から選んでください。手順は同じで、`server.js`に足して push、URL 直打ちで確認、必要ならボタンを置く、です。

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

## 3-3. 見つからないときは 404 を返す

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

# 4. うまくいかないときは

**直したのに、何も変わらない**

いちばん多いのがこれです。今日は**保存しただけでは反映されません。**[0-3](#0-3-直したら毎回-push-します) の手順で push できているか、デプロイが終わっているかを確認してください。

**ページ全体が表示されなくなった**

`server.js`が壊れていて、サーバーが起動できていません。[Deno Deploy](https://deno.com/deploy) の **Logs** にエラーが出ています。`async`を足し忘れているときは`Unexpected reserved word`と出ます（[1-2](#1-2-serverjs-の-1-行を書き換える)）。**直して push し直せば戻ります。**

**`/api.html`が`Not Found`**

`api.html`が push できていません。新しいファイルなので、ソース管理タブで`+`を押す必要があります。GitHub の自分のリポジトリのページを開いて、`public`の中に`api.html`があるか確認してください。

**ボタンを押しても何も起きない**

開発者ツール（`F12`）の**Console**タブに、赤いエラーが出ていないか確認してください。症状ごとの対処は [1-5](#1-5-push-して確認する) にまとめてあります。

**`undefined`と表示される**

`server.js`で返しているキー名と、`api.js`の`data.〇〇`が違います。**両方を見比べて、同じ名前にそろえてください。**片方だけ直しても動きません。

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

# 5. 今日書いたコードの全体

<details><summary>public/api.html（全体）</summary><div>

今日新しくつくったファイルなので、全体を載せます。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API ハンズオン</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <h1>ログイン</h1>

    <div>
      <input type="password" id="passwordInput" placeholder="パスワード">
      <button id="authButton">Authentication</button>
      <span id="authResult"></span>
    </div>

    <script type="module" src="./api.js"></script>
  </body>
</html>
```

</div></details>

<details><summary>public/api.js（全体）</summary><div>

こちらも今日新しくつくったファイルです。

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

</div></details>

<details><summary>server.js に足したもの</summary><div>

> [!IMPORTANT]
> `server.js`は**全体を載せません。**昨日の書き換えで、中身が人それぞれ違うからです。
> ここにあるのは**今日足した部分だけ**です。まるごとコピーせず、自分の`server.js`と見比べてください。

まず、1 行だけ書き換えました。

```js
Deno.serve(async (req) => {
```

そして、以下が`return serveDir(`より**上**にあれば完成です。

```js
  if (req.method === "POST" && pathname === "/auth") {
    const body = await req.json();
    if (body.password === "jigjp") {
      return Response.json({ ok: true, message: "ログインできました" });
    }
    return Response.json({ ok: false, message: "パスワードが違います" });
  }
```

</div></details>

`public/index.html`は今日は触っていません。昨日のページはそのまま残っています。

完成形の見本は、この教材リポジトリの [`api`](.) フォルダにも置いてあります。困ったときに見比べてみてください。

次は [Deno KV](../deno-kv/README.md) で、送られたデータを**保存**できるようにします。今日つくった`/auth`のようなデータは、サーバーを再起動すると消えてしまいますが、その解決編です。
