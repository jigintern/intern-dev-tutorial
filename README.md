# intern-dev-tutorial

# 目次
- [Denoをインストールしよう](#deno-をインストールしよう)
- [Denoのテンプレートプロジェクトを触ってよう](#サンプルプロジェクトを触ってみよう)
  - [下準備](#下準備)
  - [コードを実行してみよう](#コードを実行してみよう)
  - [何が起こった？](#何が起こった)
  - [リントを走らせてみよう](#リントを走らせてみよう)
  - [フォーマッタを使ってみよう](#フォーマッタを使ってみよう)
  - [テストを実行してみよう](#テストを実行してみよう)
- [サンプルプロジェクトのコードを読んでみよう](#サンプルプロジェクトのコードを読んでみよう)
  - [ファイル構造を見てみよう](#ファイル構造)
  - [server.jsを読んでみよう](#serverjsを読んでみよう)
  - [public/index.jsを読んでみよう](#publicindexjsを読んでみよう)
- [まとめ (Denoって何？)](#まとめ-denoって何)

# Deno をインストールしよう

[公式サイト - Denoのインストール方法](https://deno.land/manual@v1.35.0/getting_started/installation)

早速、Denoをインストールしてみましょう。

基本的には

Windowsの方は `PowerShell`
```txt
irm https://deno.land/install.ps1 | iex
```

# サンプルプロジェクトを触ってみよう

このフォルダの中にあるコードをまずは色々実行してみよう！

## 下準備
1. このプロジェクトを`clone`しよう
2. VScodeの拡張機能のタブから「`Deno`」を検索してインストールしよう
3. VScodeの上のヘッダーの「`表示`」から「`コマンドパレット(Command Palette)`」を押して、「`Deno: Initialize Workspace Configuration`」を選択して、すべて`yes`を選択して、Denoを使用できるようにしよう
4. VScodeの上のヘッダーの「`ターミナル`」から「`new Terminal`」を押して、ターミナルを表示しておこう

3を行うと現在のフォルダに`.vscode`というフォルダが作成されて、中に`settings.json`というファイルが作成されると思います。

今回はVScodeで`Deno`を快適に使用できるようにするためにこのような設定をします。

`settings.json`で`VScode`を使用する上で様々な設定を登録できますが、一旦中身は以下のようなもので問題ないです。

```settings.json
{
  "deno.enable": true,
  "deno.lint": true
}
```

## コードを実行してみよう

ターミナルで以下のテキストを入力してEnterを押してみましょう
```
deno task start
```

そうすると
```txt
Task start deno run --watch --allow-net --allow-read server.js
Watcher Process started.
Listening on http://localhost:8000/
```
のようなテキストが表示されるので、ブラウザを開いてURLの欄に`http://localhost:8000/`を入力してみよう。

画面に「Jig.jpインターンへようこそ」の文言が表示されれば成功です！

## 何が起こった？

先ほどの流れでいったい何が起こったのか説明しようと思います。

まず`deno task ***`で`deno.json`の中にある`tasks`に登録してあるコマンドが実行されます。

今回の場合、`deno task start`なので`deno.json`の`tasks`に登録してある`start`の項目が実行されました。

`start`には`deno run --watch --allow-net --allow-read server.js`が紐付けられていて、つまりは

```txt
deno task start

↓ 実際には下のコマンドが実行されていました。

deno run --watch --allow-net --allow-read server.js
```

このように`deno task *`は`deno.json`内の`tasks`にあらかじめ登録しておいたコマンドを実行してくれる機能です。

`deno.json`は`Deno`の様々な機能の**設定ファイル**なようなものです。

この後で説明する機能の設定も全てそこに記載してあります。

では次に`deno run --watch --allow-net --allow-read server.js`を紐どいていきましょう。

`deno run server.js`で「`server.js`を実行(`run`)する」という処理を行います。

実際に先ほどブラウザの画面に「Jig.jpインターンへようこそ」の文言が表示されましたが、その文言を表示させるための処理が`server.js`に書かれていて、それを実行したわけです。

この
```txt
deno run server.js
```
のような`deno run ***`は`Deno`で`JavaScript`ファイルを実行する基本的なコマンドになります。

では、`--watch --allow-net --allow-read`は何？ということですが、こちらは`index.js`を実行する際の**オプション指定**になります。一つずつ見ていきましょう。

`--watch`は`server.js`をもし書き換えたときに再度`deno run server.js`をし直さなくても、ファイルを書き換えて保存した時にそれを検知して勝手に再度実行し直してくれるように指定するものです。

`--allow-net`, `--allow-read`は`Deno`の重要な機能の一つである**セキュリティに関するオプション**です。デフォルトでは`deno run server.js`を実行したときにネットワーク通信やファイルの読み込み/書き込みなどを遮断します。

`deno run server.js`を実行する時には以下の項目からそのファイルではどの範囲までアクセスを許可するかを指定して実行します。

よく使用するパーミッションのオプション指定
- `--allow-net`: ネットワークへのアクセス
- `--allow-read`: ファイルの読み込み
- `--allow-write`: ファイルへの書き込み
- `--allow-env`: 環境変数へのアクセス
- `--allow-all, -A`: すべて許可

このことを踏まえて改めて、`deno run --watch --allow-net --allow-read server.js`を見てみましょう。

`--allow-net  --allow-read`のパーミッションが指定されているので、`ネットワークへのアクセス`と`ファイルの読み込み`が許可されています。後ほど説明しますが`server.js`内では、ブラウザからアクセスされた時に`public`フォルダにあるファイルを読み込んで返す処理を行っているため、その際に必要な`ネットワークへのアクセス`と`ファイルの読み込み`を許可しているということになります。

試しに
```txt
deno run --watch server.js
```

と`--allow-net  --allow-read`を外して、ターミナルで実行してみると

```txt
┌ ⚠️  Deno requests net access to "0.0.0.0:8000".
├ Requested by `Deno.listen()` API.
├ Run again with --allow-net to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions)
```
のように警告文が表示されることが確認できると思います。(この場合は`Y`を押して一時的に許可できます)

このパーミッション指定は`Deno`の機能の中でも重要なものの一つとなっています。

このセクションでは「**コードを実行する**」ことについての以下の内容を学びました。

- `Deno`で`JavaScript`ファイルを実行する方法
- ファイルの内容が更新されたときに自動で再読み込みしてくれるようにする`--watch`オプション
- 実行する際のパーミッション指定

## リントを走らせてみよう

`Deno`には`Linter`が標準で備わっています。

`Linter`というのは、「`Lintを行うツールの総称`」で`Lint`とは、「`潜在的にバグとなりうるかもしれないソースコードをcheckすること`」です。

例えば
- ソースコード内に未使用の変数が存在する
- ソースコード内に初期化されていない変数が存在する
などのような箇所を指摘してくれるものです。

物は試しに、`server.js`を開いて一番下の行に
```js
var message = 'Jig.jpインターンへようこそ！';
```
を追加して、保存してみましょう。
保存ができたらターミナルで

```txt
deno lint
```
を実行してみましょう。

そうすると
```txt
(no-var) `var` keyword is not allowed.
var message = 'Jig.jpインターンへようこそ！';
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    at /Users/fujii/dev/deno-sample-project/server.js:27:1

    help: for further information visit https://lint.deno.land/#no-var

Found 1 problem
Checked 3 files
```
のような結果が表示されるかと思います。

これは「`var`は使わないでください」といった警告文です。

このように、`deno lint`を実行すると、あらかじめ決めておいた「`ルール`」を元に、それにそぐわないコードがないかcheckします。

この「`ルール`」は`deno.json`内の`lint`の箇所で指定しています。

こちらのサンプルコードでは[公式の設定そのまま](https://deno.land/manual@v1.35.0/getting_started/configuration_file)を使用しています。

`rules`の`tags`の位置に`recommended`が指定されていると思いますが、`recommended`ルールは,
[ESLint](https://eslint.org/) や [typescript-eslint](https://typescript-eslint.io/) で `recommended` として扱われているルールの多くをサポートしています。

`Deno`はコードをcheckする機能(`リント`)をすぐに使用できます。

## フォーマッタを使ってみよう

`Deno`には`フォーマッタ`も標準の機能として備わっています。

`フォーマッタ`はリントの「潜在的にバグとなりうるかもしれないコードをcheckする」とは違い、「`コードの形を整える`」ものです。

実際に使ってみましょう！

```txt
deno fmt
```
をターミナルに打ち込んでEnterをしてみましょう。

```txt
Checked 3 files
```
のような文言が表示されました。

では、`server.js`の中身を見て何か変化はありましたでしょうか？

おそらくないはずです。

なぜならもうすでにフォーマット(整形)してあるからです。

では試しに、`deno.json`の`fmt`の項目を見て、`semiColons`の部分を`true`, `singleQuote`の部分を`false`に書き換えてみましょう。

そして再度、
```txt
deno fmt
```
を実行してみると, `server.js`の中身を見ると
- 行末にセミコロン(;)がついている
- 文字列はすべて("")で囲まれている
のようになっていると思います。

このように`deno fmt`を使用することでコードを整えてくれます。

コードを整形する際の項目については`deno.json`の`fmt`の部分から設定できます。

設定できるフォーマッ他の種類については[公式サイト](https://deno.land/manual@v1.35.1/tools/formatter)から確認できます。

このように`Deno`にはコードを整形してくれるフォーマッタも標準で備わっています。

## テストを実行してみよう

Denoには`テスト`を実行する環境も標準で備わっています。

では早速テストコードを実行してみましょう。

ターミナルに
```txt
deno test
```
を入力してEnterを押してみましょう。

すると
```txt
running 1 test from ./server.test.js
1 + 1 は 2 である ... ok (9ms)

ok | 1 passed | 0 failed (89ms)
```
このような文言が表示されると思います。
中身は「`「1+1は2である」というテストが1つ実行され、OKでした`」となっています。

では`server.test.ts`の中身を
```js
assertEquals(1 + 1, 2);

↓

assertEquals(1 + 1, 3); // 3に修正
```
のように修正して、保存し
```txt
deno test
```
を実行してみましょう。

すると今度は

```txt
1 + 1 は 2 である ... FAILED (10ms)

 ERRORS

1 + 1 は 2 である => ./server.test.js:3:6
error: AssertionError: Values are not equal.


    [Diff] Actual / Expected


-   2
+   3

  throw new AssertionError(message);
        ^
    at assertEquals (https://deno.land/std@0.193.0/testing/asserts.ts:188:9)
    at file:///Users/fujii/dev/deno-sample-project/server.test.js:5:3

 FAILURES

1 + 1 は 2 である => ./server.test.js:3:6

FAILED | 0 passed | 1 failed (24ms)

error: Test failed
```
のように`失敗したテスト`と`なぜ失敗したか`を報告してくれます。

このように`Deno`では、テストを行える環境が標準で備わっています。

# サンプルプロジェクトのコードを読んでみよう

ここからはいままで実行してきた`server.js`やこのディレクトリのファイル構造についてみていきましょう。

## ファイル構造を見てみよう

それぞれのファイルの役割を説明していきます。

- `deno.json`
  - `Deno`であれこれ続行させるときに必要な設定ファイル
  - `task`, `lint`, `fmt`, `test`などの様々な設定ができます。
  - `imports`に関しては後ほど説明
- `server.js`
  - このサンプルプロジェクトのサーバー部分。
  - ブラウザからのアクセスに対して、表示させたいファイルや文言を返す処理が書かれています。
  - 先ほど`deno task start`で実行させていたファイル
- `sample.test.js`
  - テストコードが書かれたファイル
  - `deno test`で実行させていたファイル
- `public/`
  - ブラウザからリクエストが来た時に、返すファイル一式が入っています。
  - `index.html`
    - ブラウザに表示するファイル
  - `styles.css`
    - スタイリングを指定するファイル
  - `index.js`
    - ブラウザからサーバーにアクセスする処理が書かれたファイル
    - 後ほど説明します。

## server.jsを読んでみよう

`server.js`を開くとまず最初に

```js
// https://deno.land/std@0.194.0/http/server.ts?s=serve
import { serve } from "http/server.ts";
// https://deno.land/std@0.194.0/http/file_server.ts?s=serveDir
import { serveDir } from "http/file_server.ts";
```

があります。
こちらはこのファイルで必要になる関数を外部から取り込んでいます。

`Deno`で「`ファイルを外部から取り込む`」時は`ESModule`というファイルの読み込みの仕組みを採用しています。

`ESModule`の特徴は
- `import`, `export`を用いて取り入れ/公開を制御
- ファイルを実行するときに、勝手に`import`先からコードを参照するため、複数のファイルを読み込む必要がなくなります。

先ほど、`deno task start`で、`server.js`だけを実行していましたが、その中で、`import`で指定された先から欲しい関数を取ってきて使ってたのです。

ちなみにhtmlファイルからアクセスするときは

```html
<script type="module" src="hogehoge.js"></script>
```
のように`type="module"`をつけることを忘れないようにしましょう。

次に、`from`の続きに注目してみましょう。

```js
// https://deno.land/std@0.194.0/http/server.ts?s=serve
import { serve } from "http/server.ts";
```

こちらは
```js
import { serve } from "https://deno.land/std@0.194.0/http/server.ts";
```
のように書いてもいいのですが、`import maps`という仕組みを利用しています。

`deno.json`の`import`部分を見てみると、
```json
  "imports": {
    "http/": "https://deno.land/std@0.194.0/http/",
    "testing/": "https://deno.land/std@0.193.0/testing/"
  },
```
のようになっています。
こちらは、「`from`で外部のファイルを取り入れるときに、`https://deno.land/std@0.194.0/http/`の部分を`http/`で、`https://deno.land/std@0.193.0/testing/`の部分を`testing/`で置き換えられます」といった指定をしています。

だから、`from "https://deno.land/std@0.194.0/http/server.ts"`を`from "http/server.ts"`で簡略化しています。

これは`http`モジュールをいろんなところで使用している場合に毎度`https`から下記必要がなくなったり、`deno.json`の`import`分をみることで、このプロジェクトで使用されているモジュールを一発で確認することができます。

続きをみていきましょう。
```js
/**
 * APIリクエストを処理する
 */
serve((req) => {
  // code
});
```

ここの部分はブラウザからのAPIリクエストがあったときに、関数内で登録してある処理を実行します。

```js
  // URLのパスを取得
  const pathname = new URL(req.url).pathname;
  // パスが"/welcome-message"だったら「"jigインターンへようこそ！"」の文字を返す
  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("jig.jpインターンへようこそ！👍");
  }
```

この部分は、APIリクエストの`method`部分と`path`部分を見ています。
APIリクエストには`method`というものがあり
- GET (取得)
- POST (送る)
- PUT (置き換え)
- DELETE (削除)
があります。

また`path`というものは、
`http://localhost:8000/welcome-message`の`/welcome-message`部分を指します。

このコードでは、受け付けたAPIリクエストの`method`が`GET`で、`path`が`/welcome-message`の時に「"jig.jpインターンへようこそ！👍"」のメッセージを返しています。

それ以外の時、例えば`http://localhost:8000/`にアクセスした時は、pathが`/`なので

```js
  // publicフォルダ内にあるファイルを返す
  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
```

のコードを実行しています。
こちらのコードでは、`public`フォルダ内にあるファイルを返しています。

よって、`deno task run`を実行してから、`http://localhost:8000/`にアクセスすると`public`内の`index.html`のページが表示されるんですね。

## public/index.jsを読んでみよう

`public`フォルダの中の`index.js`を読んでみましょう！

先ほどの「`server.js`を読んでみよう」で`http://localhost:8000/`にアクセスされた時に`public`内の`index.html`のページが表示されることを説明しましたが、`index.html`では`index.js`を読み込んでいます。

読み込み方法は
```html
<script type="module" src="./index.js"></script>
```
で`esmodule`の形で読み込んでいます。

`index.js`の中身は
```js
/**
 * ロードが終わったら 「GET /welcome-message」でサーバーにアクセスする
 */
window.onload = async () => {
  const response = await fetch("/welcome-message");
  document.querySelector("#welcomeMessage").innerText = await response.text();
};
```
のようになっています。

```js
window.onload = async () => {
  ...
};
```
この部分は「`画面がロードされたら中のコードを実行する`」というものです。
中のコードを見ていきます。

```js
const response = await fetch("/welcome-message");
```
では`fetch`関数を使用しています。
`fetch`関数は引数で`path`を指定して、サーバーにリクエストを送ります。

この場合引数が`/welcome-message`をなっているので、現在開いているアドレスの`http://localhost:8000/`にpathの`/welcome-message`をくっ付けて`http://localhost:8000/welcome-message`にアクセスします。

このリクエストを先ほどの`server.js`で説明した、
```js
if (req.method === "GET" && pathname === "/welcome-message") {
  return new Response("jig.jpインターンへようこそ！👍");
}
```
の部分でキャッチして`"jig.jpインターンへようこそ！👍"`という文字を返却するという流れになります。

サーバーにリクエストを送って、返って文字を表示する流れが
```js
document.querySelector("#welcomeMessage").innerText = await response.text();
```
にあたります。

`index.html`内にある`id="welcomeMessage"`の要素を探して、そこの要素に返ってきた文字を入力しています。

これで`http://localhost:8000/`にアクセスした時に、「jig.jpインターンへようこそ！👍」の文言が画面に表示されるサンプルプロジェクトの流れを追うことができました。

# まとめ (Denoって何？)

[公式サイト](https://deno.land/)

「**Deno**」は、`JavaScriptやTypeScript`を実行する環境です。
`.js/.ts`の拡張子のファイルを実行させるためにはいくつか方法がありますが、その中でも**より手軽に、より便利に実行できる環境**といった感じです。

「Deno」 は V8 JavaScriptエンジンをベースに実装されたJavaScript/TypeScriptランタイムです。

- TypeScriptを**標準で**サポートしている
- ファイルの読み書きやネットワーク通信等がデフォルトで無効となっており、実行する際に明示的に権限を与える必要があり、**高いセキュリティ**が期待できる
- 普段の開発で基本的に使われている機能を**デフォルトで**提供しています。
- ブラウザとの通信を強く意識しており、多くの機能が[Web標準](https://developer.mozilla.org/ja/docs/Learn/Getting_started_with_the_web/The_web_and_web_standards)をベースに実装されています。
- **ES Modulesベース**のモジュールシステムを前提としているため、何らかのライブラリを使用したい時には`import文`から取得することができる。
- `npmパッケージ`もサポートされているため、使用したいライブラリが[`deno.land`](https://deno.land/x)にない時には、`import文`のURLを`npm:{パッケージ名}@{バージョン}`のような形にすることで、Denoが探してきてくれます。
- 最新のJavaScript使用に準拠しています。