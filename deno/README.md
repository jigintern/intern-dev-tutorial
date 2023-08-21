# intern-dev-tutorial

# 目次
- [1. Denoって何？](#1-denoって何)
- [2. Denoをインストールしよう](#2-deno-をインストールしよう)
- [3. Denoのサンプルプロジェクトを触ってよう](#3-サンプルプロジェクトを触ってみよう)
  - [3-1. 下準備](#3-1-下準備)
  - [3-2. JavaScriptのコードを実行してみよう](#3-2-javascriptのコードを実行してみよう)
  - [3-3. 毎回打ち込むコマンドが長い](#3-3-毎回打ち込むコマンドが長い)
  - [3-4. JavaScriptファイルをリントしてみよう](#3-4-javascriptファイルをリントしてみよう)
  - [3-5. JavaScriptファイルをフォーマットしてみよう](#3-5-javascriptファイルをフォーマットしてみよう)
  - [3-6. JavaScriptファイルをテストしてみよう](#3-6-javascriptファイルをテストしてみよう)
- [4. サンプルプロジェクトのコードを読んでみよう](#4-サンプルプロジェクトのコードを読んでみよう)
  - [4-1. ファイル構造を見てみよう](#4-1-ファイル構造を見てみよう)
  - [4-2. server.jsを読んでみよう](#4-2-serverjsを読んでみよう)
    -  [4-2-1. ESModuleの形でファイルを読み込む](#4-2-1-esmoduleの形でファイルを読み込む)
    - [4-2-2. import mapを使ってみよう](#4-2-2-import-mapを使ってみよう)
    - [4-2-2. クライアント側からのAPIリクエストを処理](#4-2-2-クライアント側からのapiリクエストを処理)
  - [4-3. public/index.jsを読んでみよう](#4-3-publicindexjsを読んでみよう)
- [5. まとめ](#5-まとめ)

# 1. Denoって何？

[公式サイト](https://deno.land/)

「**Deno**」は、JavaScriptやTypeScriptを実行する環境です。

<img src="./imgs/スクリーンショット 2023-08-10 16.15.00.png" alt="deno">

`Deno`には様々な機能がありますが、このセクションでは以下の内容を学びます。

- `Deno`でJavaScriptファイルを**実行する**方法

- `Deno`でJavaScriptファイルを**リントする**方法

- `Deno`でJavaScriptファイルを**フォーマットする**方法

- `Deno`でJavaScriptファイルを**テストする**方法

また、このセクションではサンプルプロジェクトを通じて、以下の内容も学びます。

- ESModuleの形でファイルを読み込む方法

- クライアント側からサーバー側へAPIリクエストを送る方法(**fetch API**)

- クライアント側からのAPIリクエストに対して、ファイルや文字列を返す方法

# 2. Deno をインストールしよう

[公式サイト - Denoのインストール方法](https://deno.land/manual@v1.35.0/getting_started/installation)

早速、Denoをインストールしてみましょう。

基本的には公式サイトの手順を参考にします。

ターミナルを準備してから、公式サイトのコマンドをコピーしてターミナルに貼り付けてインストールしてみましょう。

**ターミナル**は**Windows**なら`powershell`、**MacOS**なら`ターミナル`などがありますが、なんでも大丈夫です。

MacOSの人は`homebrew`というパッケージ管理ツールをインストールして、その`homebrew`を使用して`Deno`をインストールすると今後も便利そうです。

[homebrewの公式サイト](https://brew.sh/index_ja)


# 3. サンプルプロジェクトを触ってみよう

サンプルプロジェクトの中のコードをDenoで実行してみよう。

## 3-1. 下準備
1. まずカレントディレクトリを`intern-dev-tutorial/deno`に移動しましょう。  

2. VScodeの拡張機能のタブから「Deno」を検索してインストールしよう

<img src="./imgs/スクリーンショット 2023-08-10 16.18.15.png" alt="deno">

3. VScodeの上のヘッダーの「**表示**」から「**コマンドパレット(Command Palette)**」を押して、「**Deno: Initialize Workspace Configuration**」を選択して、すべて**yes**を選択して、Denoを使用できるようにしよう

<img src="./imgs/スクリーンショット 2023-08-10 16.21.05.png" alt="deno">

<img src="./imgs/スクリーンショット 2023-08-10 16.21.33.png" alt="deno">

<img src="./imgs/スクリーンショット 2023-08-10 16.21.37.png" alt="deno">

<img src="./imgs/スクリーンショット 2023-08-10 16.21.39.png" alt="deno">

4. VScodeの上のヘッダーの「**ターミナル**」から「**new Terminal**」を押して、ターミナルを表示しておこう

<img src="./imgs/スクリーンショット 2023-08-10 16.20.38.png" alt="deno">

<img src="./imgs/スクリーンショット 2023-08-10 16.26.08.png" alt="deno">

3を行うと現在のフォルダに`.vscode`というフォルダが作成されて、中に`settings.json`というファイルが作成されると思います。

今回はVScodeでDenoを快適に使用できるようにするためにこのような設定をします。

`settings.json`でVScode上でDenoを使用する上で様々な設定を登録できますが、一旦中身は以下のようなもので問題ないです。

```json
{
  "deno.enable": true,
  "deno.lint": true
}
```

## 3-2. JavaScriptのコードを実行してみよう

このセクションでは、DenoでJavaScriptファイルを**実行する**方法を学びます。

DenoではJavaScriptファイルを`run`コマンドを用いて以下のようにして実行できます。

```shell
deno run <ファイル名>.js
```

では、早速Denoでこのプロジェクトの直下にある`server.js`を実行してみましょう。

ターミナルで以下のテキストを入力してEnterを押してみましょう。

```shell
deno run server.js
```

実行すると以下のような文言がターミナルに表示されると思います。

```shell
┌ ⚠️  Deno requests net access to "0.0.0.0:8000".
├ Requested by `Deno.listen()` API.
├ Run again with --allow-net to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) >
```

一旦は深く考えずに`y`を入力していきましょう。

そうすると以下のような文言がターミナルに表示されると思います。

```shell
Listening on http://localhost:8000/
```

では、ブラウザのアドレスバーにhttp\://localhost:8000/のアドレスを入力して検索してみましょう。

検索してみても画面が切り替わらないと思います。  
ここでターミナルの方を見てみましょう。

```shell
┌ ⚠️  Deno requests read access to "public".
├ Requested by `Deno.stat()` API.
├ Run again with --allow-read to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all read permissions) >
```

このような文言が表示されていると思うので、先ほど同様に`y`を押してみましょう。

ブラウザに戻ってみて、以下のような画面が表示されれば成功です🙆‍♀️

<img src="./imgs/スクリーンショット 2023-08-13 12.40.47.png" alt="deno">

Denoで`server.js`を無事実行できました！簡単ですね！

では、先ほど`y`を入力したところの説明をします。

Denoは、以下のような処理はデフォルトでは一切実行することができません
- ファイルの読み込み
- ファイルの書き込み
- ネットワーク通信

この仕組みにより、Denoでは**高いセキュリティ**が期待できます。

もしJavScriptファイル内のコードでファイルの読み込みなどを行いたいときは、  
それぞれ権限を許可してあげる必要があります。

この「権限を許可」をする工程が先ほど`y`を入力した工程になります。

```shell
deno run server.js
```
を実行した時に表示された以下の文言は、  
「実行するJavaScriptファイルでネットワーク通信を行おうとしているので、権限を許可してください」  
と言う内容でした。

```shell
┌ ⚠️  Deno requests net access to "0.0.0.0:8000".
├ Requested by `Deno.listen()` API.
├ Run again with --allow-net to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) >
```

一方で、ブラウザでhttp\://localhost:8000/にアクセスした時に表示された以下の文言は  
「実行するJavaScriptファイルでファイルの読み込みを行おうとしているので、権限を許可してください」 
と言う内容でした。 

```shell
┌ ⚠️  Deno requests read access to "public".
├ Requested by `Deno.stat()` API.
├ Run again with --allow-read to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all read permissions) >
```

しかし、毎回実行するたびに`y`を入力するのは面倒ですので、**run**コマンドのオプション指定をしてみましょう。

`deno run`をするときに、それぞれ以下のような対応のオプション指定をしてあげると、権限を許可することができます。

- ファイルの読み込み -> `--allow-read`

- ファイルの書き込み -> `--allow-write`

- ネットワーク通信 -> `--allow-net`

今回の場合「ファイルの読み込み」と「ネットワーク通信」の権限を与える必要があったので

```shell
deno run --allow-read --allow-net server.js
```

で実行してあげるとターミナルに警告文が表示されずに実行できます！

追加で一つ`--watch`オプション指定を知っておくと良さそうです。

`--watch`オプション指定をしておくことで、  
`server.js`を書き換えた時に再度実行しなくてもDenoが勝手に再実行してくれるので便利です。

`--watch`オプション指定を加えると最終的に以下のようなコマンドで`server.js`を実行します。

```shell
deno run --watch --allow-read --allow-net server.js
```

このセクションでは、DenoでJavaScriptファイルを**実行する**方法を学びました。  
**run**コマンドで実行したいファイルを実行して、ファイルの読み書き等の権限を与えることに注意しましょう！

## 3-3. 毎回打ち込むコマンドが長い...

前のセクションでは以下のコマンドで`server.js`が実行できることを学びました。

```shell
deno run --watch --allow-read --allow-net server.js
```

しかし、このコマンドで実行すると以下のようなデメリットが考えられます

- 長い
- どの権限を許可していたか忘れたら、一度実行しないといけない
- 結局このコマンドをどこかにメモなどに保存する流れになりそう

このようなデメリットを解決する方法として、**task**コマンドがあります！

このセクションでは**task**コマンドについて学んでいきますが、   
チーム開発する際には、無理に使う必要はなく最悪**run**コマンドで毎回実行するのでも問題ないです🙆‍♀️

**task**コマンドは以下のようにして実行します。

```shell
deno task <タスク名>
```

では、このタスク名は`deno.json`ファイルで設定しています。

`deno.json`ファイルの以下の部分をみてみましょう。

```json
  "tasks": {
    "start": "deno run --watch --allow-net --allow-read server.js"
  },
```

ここには、実行したいコマンドに別名を与えています。 

`deno run --watch --allow-net --allow-read server.js`に`start`と言う別名を与えるように設定しています。

よって以下のように実行すると`deno run --watch --allow-net --allow-read server.js`を実行していることと同じになります。

```shell
deno task start
```

とてもスッキリして良さそうです！

しかももし追加でファイルの書き込み権限を与えるために`--allow-write`オプションを追加したいとなっても  
`deno.json`の`start`部分のコードを修正するだけでよくて、実行するときは

```shell
deno task start
```

のままなので便利です。

このセクションでは**task**コマンドについて学びましたが、便利コマンドなのでぜひ使ってみてください！

## 3-4. JavaScriptファイルをリントしてみよう

このセクションでは、DenoでJavaScriptファイルを**リント**する方法を学びます。

`Deno`にはJavaScriptファイルをリントする機能が標準で備わっています。

**リント**とは、「**潜在的にバグとなりうるかもしれないソースコードをcheckすること**」です。

例えば
- ソースコード内に未使用の変数が存在する
- ソースコード内に初期化されていない変数が存在する
などのような箇所を指摘してくれるものです。

この機能を使うことで意図してないミスを未然に警告してくれて大変に役立ちます。

JavaScriptファイルをリントするには以下のようなコマンドでできます。

```shell
deno lint
```

このリントには**ルール**が必要で、   
`deno.json`の`lint`部分で設定されています。

```json
  "lint": {
    "include": ["./**/*.js"],
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  },
```

今回のこの設定は[Deno公式サイト](https://deno.land/manual@v1.36.0/getting_started/configuration_file#lint)のものをそのままコピーしているのです。

`rules`の`tags`の位置に`recommended`が指定されていると思いますが、    
`recommended`ルールは,
[ESLint](https://eslint.org/) や [typescript-eslint](https://typescript-eslint.io/) で `recommended` として扱われているルールの多くをサポートしています。

では、`server.js`を開いて一番下の行に

```js
var message = 'Jig.jpインターンへようこそ！';
```
を追加して、`Ctrl + S`で保存してみましょう。  
保存ができたらターミナルで

```txt
deno lint
```
を実行してみましょう。

そうすると
```shell
(no-var) `var` keyword is not allowed.
var message = 'Jig.jpインターンへようこそ！';
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    at /Users/fujii/dev/deno-sample-project/server.js:27:1

    help: for further information visit https://lint.deno.land/#no-var

Found 1 problem
Checked 3 files
```
のような結果が表示されるかと思います。

これは「varは使わないでください」といった警告文です。

どのファイルの何行目まで表示してくれて便利です。

このように、**lint**コマンドを実行すると、あらかじめ決めておいた「ルール」を元に、それにそぐわないコードがないかcheckします。

開発する時に**リント**コマンドを実行してみて、自分のコードをチェックしてみて潜在的に不具合につながりそうなコードがないかチェックしてみましょう！

## 3-5. JavaScriptファイルをフォーマットしてみよう

このセクションでは、DenoでJavaScriptファイルを**フォーマット**する方法を学びます。

`Deno`にはファイルを**フォーマット**する機能も標準で備わっています。

`フォーマットする`とは「**コードの形を整える**」ことです。

この**フォーマット**を使用することでどの人がコードを書いても同じようにコードを整えられるので、   
人によってコードの形がバラバラになるといったことが起こらず便利です。

JavaScriptファイルをフォーマットするには以下のようなコマンドでできます。

```shell
deno fmt
```

このコマンドを実行するとカレントディレクトリ以下のJavaScriptファイル全てに対してフォーマットします。

フォーマットの設定は以下のように、`deno.json`の`fmt`で設定しています。
フォーマットするルールを変更したい時には、こちらの設定をいじりましょう。

```json
  "fmt": {
    "useTabs": false, // タブを使用するか
    "lineWidth": 80, // 線の幅
    "indentWidth": 2, // インデントの文字数
    "semiColons": false, // セミコロンをつけるかどうか
    "singleQuote": true, // シングルクウォートを使用するかどうか
    "proseWrap": "preserve",
    "include": ["./**/*.js"]
  },
```

設定できるフォーマッタの種類については[公式サイト](https://deno.land/manual@v1.35.1/tools/formatter)から確認できます。  

では、実際にフォーマットしてみましょう！

```shell
deno fmt
```
をターミナルに打ち込んでEnterをしてみましょう。

```chell
Checked 3 files
```
のような文言が表示されました。

では、`server.js`の中身を見て何か変化はありましたでしょうか？

おそらくないはずです。

すでに指定されたルールに則って、フォーマット(整形)してあったからです。

では試しに、フォーマットのルールを変えてみましょう。

`deno.json`の`fmt`部分の   
`semiColons`の部分を`true`, `singleQuote`の部分を`false`に書き換えてみましょう。

以下のようになります。

```json
  "fmt": {
    "useTabs": false, // タブを使用するか
    "lineWidth": 80, // 線の幅
    "indentWidth": 2, // インデントの文字数
    "semiColons": true, // セミコロンをつけるかどうか
    "singleQuote": false, // シングルクウォートを使用するかどうか
    "proseWrap": "preserve",
    "include": ["./**/*.js"]
  },
```

そして再度、
```shell
deno fmt
```
を実行してみると, `server.js`の中身を見ると

- 行末にセミコロン(;)がついている

- 文字列はすべて("")で囲まれている
のようになっていると思います。

このように`deno fmt`を使用することでコードを整えてくれます。

チーム開発でもこのフォーマット機能を利用してきれいなコードにしていきましょう！

## 3-6. JavaScriptファイルをテストしてみよう

このセクションでは、DenoでJavaScriptファイルを**テスト**する方法を学びます。

DenoにはJavaScriptファイルを`テスト`を実行する環境も標準で備わっています。

**テスト**には手動テストと自動テストがあります。
- 手動テストは、実際にブラウザで手を動かして動作確認するもの

- 自動テストは、コードが正しく動作されるかテストする、**テスト専用のコード**が書かれたファイルを実行すること

で、Denoに備わっているのは「自動テスト」が行える環境です。

自動テストが行える環境を構築するのはやや大変ですが、Denoでは標準で備わっているためとても便利です。

自動テストコードを書いてテストを実行することで、以下のようなメリットがあります。
- コードが適切に動作することに安心できる
- 一回の実行で全てのテストファイルを実行できるので手動でテストするよりも効率がいい
- 自分が修正した範囲以外で悪影響がないことを安心できる

JavaScriptファイルをテストするには以下のようなコマンドでできます。

```shell
deno test
```

テストの設定に関しても以下のように、`deno.json`の`test`の部分に記載があります。

```json
  "test": {
    "include": [
      "./**/*.test.js"
    ]
  }
```

では早速テストコードを実行してみましょう。

ターミナルに
```shell
deno test
```
を入力してEnterを押してみましょう。

すると、以下のような文言が表示されると思います。

```shell
running 1 test from ./server.test.js
1 + 1 は 2 である ... ok (9ms)

ok | 1 passed | 0 failed (89ms)
```

「1+1は2である」というテストが1つ実行され、OKでしたと表示されています。

では`server.test.ts`の中身を
```js
assertEquals(1 + 1, 2);

↓

assertEquals(1 + 1, 3); // 3に修正
```
のように修正して、保存し
```shell
deno test
```
を実行してみましょう。

すると今度は以下のような文言が表示されます。

```shell
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

このようにもし自動テストで失敗したテストがあれば、以下の情報が表示されます。  
- 自動テストが失敗したこと

- どのテストが失敗したか

- 失敗した箇所

- 期待された値とテスト時に渡されたか

このように`Deno`では、テストを行える環境が標準で備わっています。

# 4. サンプルプロジェクトのコードを読んでみよう

ここからはいままで実行してきた`server.js`やこのディレクトリのファイル構造についてみていきましょう。

## 4-1. ファイル構造を見てみよう

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
  - ブラウザからリクエストが来た時に、`server.js`内の処理によってブラウザに返されるファイル類
  - `index.html`
    - ブラウザに表示するファイル
  - `styles.css`
    - スタイリングを指定するファイル
  - `index.js`
    - ブラウザからサーバーにアクセスする処理が書かれたファイル
    - 後ほど説明します。

## 4-2. server.jsを読んでみよう

このセクションでは`server.js`を読みながら以下のことを学んでいきましょう！
- ESModuleの形でファイルを読み込む方法

- import mapを使う方法

- クライアント側からのAPIリクエストに対して、ファイルや文字列を返す方法

## 4-2-1. ESModuleの形でファイルを読み込む

まずは「ESModuleの形でファイルを読み込む方法」について学んでいきます。

Denoで「ファイルを外部から取り込む」時は**ESModule**というファイルの読み込みの仕組みを採用しています。

**ESModule**の特徴は
- `import`, `export`を用いて取り入れ/公開を制御
- ファイルを実行するときに、勝手に`import`先からコードを参照するため、複数のファイルを読み込む必要がなくなります。

以下のようにしてそのJavaScriptファイルに必要な外部の変数やメソッドを取り込むことができます。

```ts
import { <変数>, <メソッド> } from "JavaScriptファイルのPathやUrl"
```

また、`html`ファイルからJavScriptファイルを読み込みたい時がありますが、  
その場合は`type="module"`を付与して以下のようにします。

```html
<script type="module" src="<JavaScriptファイルのPathやUrl>"></script>
```

`server.js`の最初の行で行っているように外部の`serve`と`serveDir`メソッドを取り込むことは以下のようにしてできます。

```js
import { serve } from "https://deno.land/std@0.194.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.194.0/http/file_server.ts";
```

しかし、実際の`server.js`で書かれているコードは少し違っていますね。
そのことに関しては次のセクションで学びましょう。

上記のコードで書いても問題なく動くため安心してください。

このセクションでは**ESModule**と言う形で外部のファイルを取り込む方法を学びました！

## 4-2-2. import mapを使ってみよう

前のセクションで以下のように外部の変数やメソッドを取り込む方法を学びました。

```js
import { serve } from "https://deno.land/std@0.194.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.194.0/http/file_server.ts";
```

全てURLを直書きで書こうとすると   
例えば以下のように一見同じバージョンのものを取り込んでいるように見えて実際には異なることが起きてもなかなか気づきにくいです。(`0.194.0`と`0.195.0`)

```js
import { serve } from "https://deno.land/std@0.194.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.195.0/http/file_server.ts";
```

ここで便利なのがDenoの**import map**と言う機能です。

まず`deno.json`の`import`部分をみてみると以下のようになっています。
```json
  "imports": {
    "http/": "https://deno.land/std@0.194.0/http/"
  },
```

この設定によってJavaScriptファイルで外部のファイルにアクセスするとき、  
`https://deno.land/std@0.194.0/http/`は`http/`でアクセスできるようになりました。

よって以下のように書き換えることができます！
```ts
import { serve } from "http/server.ts";
import { serveDir } from "http/file_server.ts";
```

スッキリして良さそうですね。

**import map**と言う機能を使用することで以下のようなメリットがあります。
- 毎回`https://`からURLを直書きする必要がなくなる

- 可読性が上がる

- 使用する外部のファイルのバージョンを固定できる

- 逆にバーションを上げたり下げたりするときは`deno.json`の`import`部分のURLの数字を変えるだけで全てのファイルに適用される

- `deno.json`の`import`部分を見るだけで、このプロジェクトで使用されているライブラリの一覧が見れる

ぜひ使ってみましょう！

このセクションでは**import map**と言う機能の使い方や使用するメリットを学びました。

## 4-2-3. クライアント側からのAPIリクエストを処理

このセクションではクライアント側からのAPIリクエストに対する以下のような処理を学びましょう！
- APIリクエストの種類を判別する処理

- ファイルを返す処理

- 文字列を返す処理

まずクライアント側からのAPIリクエストを受け付ける処理は以下のように`serve`関数で行います

```js
/**
 * APIリクエストを処理する
 */
serve((req) => {
  // リクエストに対する処理の中身
});
```

この`req`変数を用いてAPIリクエストの`method`部分と`path`部分を見ていきます。

APIリクエストには`method`というものがあり

- GET (取得)

- POST (送る)

- PUT (置き換え)

- DELETE (削除)

があります。

またAPIリクエストの**path**というものはmethodが「GET」であるとした時に  
`GET http://localhost:8000/welcome-message`の`/welcome-message`部分を指します

サンプルプロジェクトの`serve.js`では  
受け付けたAPIリクエストの`method`が`GET`で、`path`が`/welcome-message`の時に`return new Response(<文言>)`で文言を返しています。

以下の箇所で行っています。

```js
  // URLのパスを取得
  const pathname = new URL(req.url).pathname;
  // パスが"/welcome-message"だったら「"jigインターンへようこそ！"」の文字を返す
  if (req.method === "GET" && pathname === "/welcome-message") {
    // 文言を返す
    return new Response("jig.jpインターンへようこそ！👍");
  }
```

それ以外の時、例えば`http://localhost:8000/`にアクセスした時は、   
pathが`/`なので以下のようにpublicフォルダをクライアントに返しています。

```js
  // publicフォルダ内にあるファイルを返す
  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
```

よって、`deno run`を実行してから、`http://localhost:8000/`にアクセスすると`public`内の`index.html`のページが表示されるんですね。

## 4-3. public/index.jsを読んでみよう

このセクションでは、`deno run`を実行してから`http://localhost:8000/`にアクセスした時にクライアント側に返されるpublicフォルダ内の`index.js`を読んでいきましょう。

`public`内の`index.html`のページが表示されることを説明しましたが、`index.html`では`index.js`を読み込んでいます。

読み込み方法は以下のように、ESModuleの形で読み込んでいます。

```html
<script type="module" src="./index.js"></script>
```

`index.js`をみてみましょう。

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
ここでは**fetch API**を使用しています。
fetchメソッドは引数で**path**を指定して、サーバーにリクエストを送ります。

この場合、引数が`/welcome-message`になっているので、現在開いているアドレスの`http://localhost:8000/`にpathの`/welcome-message`をくっ付けて`http://localhost:8000/welcome-message`にアクセスします。

クライアント側に`"jig.jpインターンへようこそ！👍"`という文字を返しています。

サーバー側から返ってきた文字列をクライアント側のブラウザに表示する処理は`public`フォルダ内の`index.js`で行っています。

```js
document.querySelector("#welcomeMessage").innerText = await response.text();
```
にあたります。

`index.html`内にある`id="welcomeMessage"`の要素を探して、そこの要素に返ってきた文字を入力しています。

これで`http://localhost:8000/`にアクセスした時に、「jig.jpインターンへようこそ！👍」の文言が画面に表示されるサンプルプロジェクトの流れを追うことができました。

# 5. まとめ

学んだことを整理してみましょう。

- `Deno`について
  - `deno run **`
  - `deno task **`
  - `deno lint`
  - `deno fmt`
  - `deno test`
  - `deno run`のパーミッション指定
  - `import map`について
- サンプルプロジェクトについて
  - `ESModule`の形でのファイルの読み込み
  - `server.js`から、クライアント側からのリクエストに対してファイルを返したり、文字列を返したりする処理
  - サーバー側へリクエストを送る`fetch API`

ぜひ実際に開発を行う時にはDenoの様々な機能を活用してみてください！
