# API ハンズオン

- [0. スライド](#0-スライド)
  - [0-0. 今日の流れ](#0-0-今日の流れ)
  - [0-1. 今日さわるファイル](#0-1-今日さわるファイル)
  - [0-2. 昨日のアプリを開く](#0-2-昨日のアプリを開く)
  - [0-3. 直したら、毎回 push します](#0-3-直したら毎回-push-します)
  - [0-4. 見る場所は 2 つあります](#0-4-見る場所は-2-つあります)
  - [0-5. なぜ `serveDir` の「上」なのか](#0-5-なぜ-servedir-の上なのか)
- [1. 文字を返す API をつくる](#1-文字を返す-api-をつくる)
  - [1-1. サーバーに `/greeting` を追加する](#1-1-サーバーに-greeting-を追加する)
  - [1-2. ブラウザで直接叩いて確認する](#1-2-ブラウザで直接叩いて確認する)
  - [1-3. `api.js` をつくる](#1-3-apijs-をつくる)
  - [1-4. ボタンを置く](#1-4-ボタンを置く)
  - [1-5. ボタンから叩いて確認する](#1-5-ボタンから叩いて確認する)
- [2. 情報を渡せる API をつくる](#2-情報を渡せる-api-をつくる)
  - [2-1. サーバーに `/greeting-me` を追加する](#2-1-サーバーに-greeting-me-を追加する)
  - [2-2. ブラウザで直接叩いて確認する](#2-2-ブラウザで直接叩いて確認する)
  - [2-3. `api.js` に追記する](#2-3-apijs-に追記する)
  - [2-4. 入力欄を置く](#2-4-入力欄を置く)
  - [2-5. 入力して確認する](#2-5-入力して確認する)
- [3. JSON を返す API をつくる](#3-json-を返す-api-をつくる)
  - [3-1. サーバーに `/profile` を追加する](#3-1-サーバーに-profile-を追加する)
  - [3-2. ブラウザで直接叩いて確認する](#3-2-ブラウザで直接叩いて確認する)
  - [3-3. `api.js` に追記する](#3-3-apijs-に追記する)
  - [3-4. ボタンを置く](#3-4-ボタンを置く)
  - [3-5. 確認する](#3-5-確認する)
  - [3-6. 中身を自分のものに書き換える](#3-6-中身を自分のものに書き換える)
- [4. 情報を送る API をつくる](#4-情報を送る-api-をつくる)
  - [4-1. `server.js` の 1 行を書き換える](#4-1-serverjs-の-1-行を書き換える)
  - [4-2. サーバーに `/auth` を追加する](#4-2-サーバーに-auth-を追加する)
  - [4-3. `api.js` に追記する](#4-3-apijs-に追記する)
  - [4-4. 入力欄を置く](#4-4-入力欄を置く)
  - [4-5. 確認する](#4-5-確認する)
- [5. スマホから叩いてみる](#5-スマホから叩いてみる)
- [6. (終わった人から) 自分で API を増やす](#6-終わった人から-自分で-api-を増やす)
  - [6-1. お題の例](#6-1-お題の例)
  - [6-2. (発展) 見つからないときは 404 を返す](#6-2-発展-見つからないときは-404-を返す)
- [7. うまくいかないときは](#7-うまくいかないときは)
- [8. 今日書いたコードの全体](#8-今日書いたコードの全体)

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
| 1 | `/greeting` … 決まった文字を返す |
| 2 | `/greeting-me` … 渡した名前を使って返す |
| 3 | `/profile` … **JSON** を返す ← 今日の山場 |
| 4 | `/auth` … 送ったパスワードを確かめる（POST） |
| 5 | スマホから、自分の API を叩く |
| 6 | 終わった人から、自分で API を増やす |

API を 4 本つくります。**4 本とも、つくり方は同じ 5 ステップです。**

1. サーバー側に書く
2. **push する**
3. **ブラウザの URL 直打ちで確認する**
4. ブラウザ側に書く
5. **push して**、ボタンで確認する

今日は自分の PC でサーバーを動かしません。**書いたコードは、push して公開されてから確認します。**詳しくは [0-3](#0-3-直したら毎回-push-します) で説明します。

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

昨日、それぞれ好きなように書き換えたので、**`server.js`の中身は人によって違います。**返す文言を変えた人、自分でルーティングを足した人、Claude に手伝ってもらって整えた人もいるはずです。

なので、この資料には**行番号を書いていません。**「15 行目に足してください」と書いても、人によってそこが違う場所になってしまうからです。かわりに使うのが、上の 2 行の**目印**です。この 2 行は、消してしまうとページが表示されなくなるので、**昨日デプロイできた人には必ず残っています。**

## 0-2. 昨日のアプリを開く

### 手順

1. VSCode で、昨日クローンしたフォルダ（例: `deno-app`）を開く
2. ブラウザで、**昨日デプロイした自分の URL** を開く
3. その URL を、ブラウザのタブに開いたままにしておく

昨日発行された URL は、こういう形をしています。

```
https://アプリ名.置き場所の名前.deno.net
```

### こうなっていれば成功

昨日つくったページが表示されます。

> [!IMPORTANT]
> **この URL のタブは、今日ずっと開いたままにしておいてください。**
> 今日つくる API は、全部この URL の後ろにくっつけて叩きます。

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

つまり、**書き換えるたびに commit と push が必要です。**今日は 8 回くらいやります。手が覚えるまで繰り返してください。

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
> 特に、1 章で新しくつくる`public/api.js`は要注意です。新しいファイルは`+`（ステージ）を押さないと commit に入りません。
> 押し忘れると、そのファイルだけ GitHub に届かず、**直したはずなのに何も変わらない**という状態になります。

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
>
> Network タブで`Size`が`(memory cache)`になっている行は、**サーバーに取りに行かず手元の控えを使った**という意味です。ログにパスが出ないときは、これが理由かもしれません。`Cmd + Shift + R`で毎回取りに行かせられます。

そして大事なのは、**どちらからも「サーバーの中でやっている処理」は見えない**ということです。

`/welcome-message`が文字を返していることは分かりますが、**それをどうやって決めたのかは、外からは見えません。**`server.js`を開かないと分かりません。

これがスライドで見た**窓口**です。外から見えるのは窓口でのやりとりだけ。だから、見せたくないものはサーバー側に置けるわけです。

## 0-5. なぜ `serveDir` の「上」なのか

`server.js`に足すときは、必ず`return serveDir(`の**上**です。理由は`return`が「ここで返して、おわり」という意味だからです。

```js
  return serveDir(req, {     // ← ここで終わってしまう
    fsRoot: "public",
  });

  if (pathname === "/greeting") {   // ← ここには絶対に来ない
    return new Response("Hello!!");
  }
```

`serveDir`より下に書いた API には、**一生たどりつきません。**

これで準備は終わりです。昨日どう書き換えていても、**全員が同じ手順で進められます。**次の章から手を動かしていきましょう。

# 1. 文字を返す API をつくる

1 本目です。**`/greeting`を叩くと`Hello!!`が返ってくる API**をつくります。

進め方は [0-0](#0-0-今日の流れ) で見た 5 ステップです。2 章・3 章・4 章もすべて同じ流れです。

**「URL 直打ちで確認」を必ず挟みます。**ここを確認しておくと、動かないときに**サーバーとブラウザのどちらが原因か**を自分で切り分けられます。

そして書き換えたら、**そのつど push します。**push しないと`https://自分のURL`には何も届きません（[0-3](#0-3-直したら毎回-push-します)）。

## 1-1. サーバーに `/greeting` を追加する

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

### 書いたコードの意味

- `req.method`で、ブラウザが使ったメソッドがわかります。前の章で勉強した`GET`がここに出てきます
- `pathname`に、叩かれた URL のパス（`/greeting`の部分）が入っています。ファイルの上のほうで`const pathname = new URL(req.url).pathname;`として取り出しています
- 条件に合ったら`new Response("返したい文字")`を`return`します

## 1-2. ブラウザで直接叩いて確認する

いまつくったのは**サーバー側だけ**です。ボタンはまだありませんが、動作は確認できます。

### 手順

1. **commit して push する**（[0-3](#0-3-直したら毎回-push-します) の手順）
2. 1〜2 分待つ
3. ブラウザのアドレスバーに、以下を直接入力して Enter

```
https://自分のURL/greeting
```

### こうなっていれば成功

画面に`Hello!!`とだけ表示されます。

これが「API を叩く」ということです。**サーバーはもう仕事をしています。**

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| `Not Found`と出る | まだ届いていません。push できているか、デプロイが終わっているかを確認して、もう 1 分待ってください |
| `Not Found`と出る（push 済み・デプロイ済み） | `pathname === "/greeting"`の綴りを確認してください |
| ページが開けない | URL が違います。`https://自分のURL`だけで開けるか確認してください |

## 1-3. `api.js` をつくる

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

## 1-4. ボタンを置く

### 手順

1. `public/index.html`を開く
2. `</body>`と書かれている行を探す
3. その行の**すぐ上**に、以下を貼る

```html
    <!-- 1章: /greeting -->
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

    <!-- 1章: /greeting -->
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
> 2 章以降で`api.js`に追記しても、この行を足す必要はありません。

## 1-5. ボタンから叩いて確認する

### 手順

1. **commit して push する**（[0-3](#0-3-直したら毎回-push-します) の手順）
2. 1〜2 分待つ
3. ブラウザで`https://自分のURL`を開く（アドレスバーに`/greeting`が残っていたら消す）
4. `Cmd + Shift + R`（Windows は `Ctrl + Shift + R`）で再読み込みする
5. `Hello`ボタンを押す

> [!IMPORTANT]
> **今回の push には`public/api.js`が入っています。**新しくつくったファイルなので、ソース管理タブで`+`（ステージ）を押さないと commit に入りません。
> 押し忘れると、ボタンは表示されるのに**押しても何も起きない**という状態になります。

### こうなっていれば成功

ボタンの隣に`Hello!!`と表示されます。

**1 本目の API が完成しました。**

### つまずいたら

まずブラウザの**開発者ツール**を開きます。`F12`、または画面を右クリックして「**検証**」です。**Console**タブを見てください。

| Console に出ているもの | 意味と対処 |
| --- | --- |
| `Cannot set properties of null` | `index.html`の`id`と`api.js`の`#〇〇`が違います。見比べてください |
| `Failed to load resource: api.js` | `api.js`が push できていません。ソース管理タブで`+`を押したか確認してください。または`<script type="module" src="./api.js">`の行がないか、ファイル名が違います |
| 何も出ていないがボタンも動かない | 再読み込みを忘れています。`Cmd + Shift + R` |
| ボタンそのものが出てこない | `index.html`が push できていないか、デプロイがまだ終わっていません |

# 2. 情報を渡せる API をつくる

2 本目です。さっきの`/greeting`は、いつ叩いても同じ`Hello!!`が返ってきました。

今度は**こちらから名前を渡して、それに応じた返事をもらう API**をつくります。

**`/greeting-me`に`name`を渡すと、`Hello, {渡した名前}`が返ってくる**ルールです。

渡す方法は、前の章で勉強した**クエリパラメータ**です。URL の後ろに`?name=taro`のようにくっつけます。

> [!NOTE]
> 1 章でつくった`/greeting`は消しません。**足していきます。**

## 2-1. サーバーに `/greeting-me` を追加する

### 手順

1. `server.js`を開く
2. `return serveDir(req, {`の行を探す（**1 章と同じ場所です**）
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

## 2-2. ブラウザで直接叩いて確認する

### 手順

1. **commit して push する**（[0-3](#0-3-直したら毎回-push-します) の手順）
2. 1〜2 分待つ
3. ブラウザのアドレスバーに、以下を直接入力して Enter

```
https://自分のURL/greeting-me?name=taro
```

4. `taro`の部分を自分の名前に変えて、もう一度 Enter

### こうなっていれば成功

1 回目は`Hello, taro`、2 回目は`Hello, 自分の名前`と表示されます。

**URL を変えると返事が変わりました。**これが「情報を渡す」ということです。

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| `Hello, null`と出る | `?name=`の部分を書き忘れています。URL を確認してください |
| `Not Found`と出る | push できているか、デプロイが終わっているかを確認してください |
| `Not Found`と出る（push 済み・デプロイ済み） | `/greeting-me`の綴りを確認してください（`greeting_me`ではありません） |

## 2-3. `api.js` に追記する

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

## 2-4. 入力欄を置く

### 手順

1. `public/index.html`を開く
2. `</body>`の行を探す（**1 章と同じ場所です**）
3. その行の**すぐ上**に、以下を貼る

```html
    <!-- 2章: /greeting-me -->
    <div>
      <input type="text" id="nameInput">
      <button id="greetingMeButton">greeting me</button>
      <span id="greetingMeResult"></span>
    </div>
```

4. `Cmd + S`で保存する

> [!IMPORTANT]
> `<script type="module" src="./api.js"></script>`の行より**上**に貼ってください。
> 1 章で貼ったブロックのすぐ下が、ちょうどいい場所です。

### こうなっていれば成功

```html
    <!-- 1章: /greeting -->
    <div>
      <button id="greetingButton">Hello</button>
      <span id="greetingResult"></span>
    </div>

    <!-- 2章: /greeting-me -->
    <div>
      <input type="text" id="nameInput">
      <button id="greetingMeButton">greeting me</button>
      <span id="greetingMeResult"></span>
    </div>

    <script type="module" src="./api.js"></script>
  </body>
```

## 2-5. 入力して確認する

### 手順

1. **commit して push する**（[0-3](#0-3-直したら毎回-push-します) の手順）
2. 1〜2 分待つ
3. ブラウザで`https://自分のURL`を`Cmd + Shift + R`で再読み込みする
4. 入力欄に自分の名前を打つ
5. `greeting me`ボタンを押す

### こうなっていれば成功

`Hello, 打った名前`と表示されます。

**2 本目の API が完成しました。**

# 3. JSON を返す API をつくる

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

## 3-1. サーバーに `/profile` を追加する

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

## 3-2. ブラウザで直接叩いて確認する

### 手順

1. **commit して push する**（[0-3](#0-3-直したら毎回-push-します) の手順）
2. 1〜2 分待つ
3. ブラウザのアドレスバーに、以下を直接入力して Enter

```
https://自分のURL/profile
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

## 3-3. `api.js` に追記する

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
await response.text()   // 文字として受け取る（1章・2章）
await response.json()   // JSONとして受け取る（3章）
```

`response.json()`で受け取ると、`data.name`や`data.favorite`のように**キーを指定して取り出せます。**

```js
const data = await response.json();
data.name       // "たにぐち"
data.favorite   // "ラーメン"
```

## 3-4. ボタンを置く

### 手順

1. `public/index.html`を開く
2. `<script type="module" src="./api.js"></script>`の行の**すぐ上**に、以下を貼る

```html
    <!-- 3章: /profile -->
    <div>
      <button id="profileButton">profile</button>
      <span id="profileResult"></span>
    </div>
```

3. `Cmd + S`で保存する

## 3-5. 確認する

### 手順

1. **commit して push する**（[0-3](#0-3-直したら毎回-push-します) の手順）
2. 1〜2 分待つ
3. ブラウザで`https://自分のURL`を`Cmd + Shift + R`で再読み込みする
4. `profile`ボタンを押す

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

## 3-6. 中身を自分のものに書き換える

`server.js`の`/profile`の中身を、**自分の情報に書き換えてみましょう。**

```js
  if (req.method === "GET" && pathname === "/profile") {
    return Response.json({
      name: "自分の名前",
      favorite: "好きなもの",
    });
  }
```

保存して push し、ブラウザを`Cmd + Shift + R`で再読み込みしてボタンを押すと、書き換えた内容が出ます。

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

# 4. 情報を送る API をつくる

4 本目、最後です。

ここまでの 3 本は全部`GET`でした。前の章で勉強したとおり、`GET`で渡した情報は**URL に出ます。**

```
https://自分のURL/greeting-me?name=taro
```

`taro`が URL に見えていますね。これが名前ならいいですが、**パスワードだったら困ります。**

なので今回は`POST`を使います。`POST`は情報を URL ではなく**body**に入れて送るので、URL には出ません。

**`/auth`にパスワードを送ると、あっているかどうかが返ってくる**API をつくります。

## 4-1. `server.js` の 1 行を書き換える

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

`async`を書き忘れたまま push すると、**サーバーが起動できなくなります。**API だけでなく、**ページそのものが表示されなくなる**ので、いちばん焦るパターンです。

[Deno Deploy](https://deno.com/deploy) の自分のアプリのページを開いて、**Logs** を見てください。こう出ています。

```shell
error: Uncaught SyntaxError: Unexpected reserved word
    const password = await req.json();
```

このエラーが出たら、この手順に戻って`async`を足し、もう一度 push してください。**直して push すれば、ちゃんと元に戻ります。**

## 4-2. サーバーに `/auth` を追加する

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
- 返すのは JSON です。**3 章で覚えた`Response.json()`をそのまま使っています**

> [!NOTE]
> `POST`の API は、`GET`と違って**ブラウザのアドレスバーからは叩けません。**
> アドレスバーに URL を入れる操作は`GET`だからです。
> なので、この章だけは URL 直打ちの確認を飛ばして、ブラウザ側をつくってから確認します。

## 4-3. `api.js` に追記する

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

受け取り側は 3 章と同じ`await response.json()`です。

## 4-4. 入力欄を置く

### 手順

1. `public/index.html`を開く
2. `<script type="module" src="./api.js"></script>`の行の**すぐ上**に、以下を貼る

```html
    <!-- 4章: /auth -->
    <div>
      <input type="password" id="passwordInput">
      <button id="authButton">Authentication</button>
      <span id="authResult"></span>
    </div>
```

3. `Cmd + S`で保存する

`type="password"`にすると、打った文字が`●●●`で隠れます。

## 4-5. 確認する

### 手順

1. **commit して push する**（[0-3](#0-3-直したら毎回-push-します) の手順）
2. 1〜2 分待つ
3. ブラウザで`https://自分のURL`を`Cmd + Shift + R`で再読み込みする
4. 入力欄に`jigjp`と打って`Authentication`ボタンを押す
5. 次に、わざと違うパスワードを打ってボタンを押す

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

# 5. スマホから叩いてみる

4 本の API ができました。

そして、**もう公開されています。**章ごとに push してきたので、今つくった API は全部インターネットに出ています。改めて公開する作業はありません。

つまり、**この URL は自分の PC 以外からも叩けます。**確かめてみましょう。

### 手順

1. スマホのブラウザで`https://自分のURL`を開く
2. ボタンを押してみる
3. 次に、アドレスバーに`https://自分のURL/profile`と直接入力して開く

### こうなっていれば成功

ボタンは PC と同じように動きます。そして`/profile`を直接開くと、こう表示されます。

```json
{"name":"...","favorite":"..."}
```

3 章で PC から叩いたのと**まったく同じもの**が返ってきます。

`/greeting`や`/greeting-me?name=taro`も、同じように付けて試してみてください。

**自分のつくった API が、インターネットに公開されています。**この URL を教えれば、他の人のプログラムからも叩けます。

> [!TIP]
> API の動作確認は、こうやって**直接叩くのがふつう**です。
> ボタンを押して確かめると、画面が原因なのか API が原因なのか分かりません。
> API だけを先に確かめられると、原因の切り分けが速くなります。
> 今日、章ごとに URL 直打ちを挟んできたのは、これを身につけるためです。

### つまずいたら

| 症状 | 対処 |
| --- | --- |
| `/profile`が`Not Found`になる | `server.js`が push できていません。GitHub のリポジトリのページで中身を確認してください |
| ボタンが表示されない | `index.html`が push できていません |
| ボタンはあるが動かない | `api.js`が push できていません。ソース管理タブで`+`を押したか確認してください |
| PC では動くのにスマホでは古いまま | スマホのブラウザが古いものを覚えています。タブを閉じて開き直してください |

# 6. (終わった人から) 自分で API を増やす

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
2. **push する**
3. URL 直打ちで確認する（GET のとき）
4. `api.js`に書く
5. `index.html`にボタンを置く
6. **push して**、ボタンで確認する

## 6-1. お題の例

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

## 6-2. (発展) 見つからないときは 404 を返す

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

# 7. うまくいかないときは

**直したのに、何も変わらない**

いちばん多いのがこれです。今日は**保存しただけでは反映されません。**[0-3](#0-3-直したら毎回-push-します) の手順で push できているか、デプロイが終わっているかを確認してください。

**ページ全体が表示されなくなった**

`server.js`が壊れていて、サーバーが起動できていません。[Deno Deploy](https://deno.com/deploy) の **Logs** にエラーが出ています。4 章の`async`を足し忘れているときは`Unexpected reserved word`と出ます（[4-1](#4-1-serverjs-の-1-行を書き換える)）。**直して push し直せば戻ります。**

**ブラウザで URL を直打ちすると`Not Found`**

`server.js`が push できていないか、エンドポイントの綴りが違います。VSCode のタブに`●`が付いていたら、そもそも保存できていません。

**ボタンを押しても何も起きない**

開発者ツール（`F12`）の**Console**タブに、赤いエラーが出ていないか確認してください。症状ごとの対処は [1-5](#1-5-ボタンから叩いて確認する) にまとめてあります。

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

# 8. 今日書いたコードの全体

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
    <!-- 1章: /greeting -->
    <div>
      <button id="greetingButton">Hello</button>
      <span id="greetingResult"></span>
    </div>

    <!-- 2章: /greeting-me -->
    <div>
      <input type="text" id="nameInput">
      <button id="greetingMeButton">greeting me</button>
      <span id="greetingMeResult"></span>
    </div>

    <!-- 3章: /profile -->
    <div>
      <button id="profileButton">profile</button>
      <span id="profileResult"></span>
    </div>

    <!-- 4章: /auth -->
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

まず、4 章で 1 行だけ書き換えました。

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
