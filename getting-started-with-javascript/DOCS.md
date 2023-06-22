# JavaScript を始めよう

> 想定時間: 90分

<details>
  <summary>TOC</summary>  

  1. JavaScript に触れてみよう
    1. console.xxx()
    2. コメント
    3. 変数
    4. 演算子
    5. 条件分岐
  2. 身の回りの計算を JavaScript にやらせてみよう
    1. 日付
    2. 三角方程式
  3. ブラウザの標準APIを利用しよう
    1. 非同期処理の使い方
    2. ファイル読み込み
    3. 位置情報API
</details>

## 1. JavaScript に触れてみよう
### 0. ブラウザの開発者用ツールを開こう
※ Google Chrome を利用することを前提としています

chromeの開発者ツールを利用します。
↓の画像のように右上のケバブメニューから開くことが出来ます。

![ケバブメニューからの開きかた](../getting-started-with-javascript/imgs/chrome-open-devtools-from-kebab-menu.png)

> ショートカットキー
> Windows / Linux / ChromeOS : `Ctrl + Shift + I`
> macOS: `⌥ + ⌘ + I`

↓のような表示になっていれば開けています。(開発者ツールの幅は適当に調節してください)
![開発者ツールを開いたときの見た目](imgs/chrome-opened-devtools-firstview.png)

今回の資料では↑の `Console` タブを利用します。他のタブは適宜他の資料で説明される予定です 🙏

### 1. Hello, World !
> [console](https://developer.mozilla.org/ja/docs/Web/API/console)

最初にやることといえばこれでしょう。以下のコードを先程の `Console` タブに入力してEnterで実行してみてください。

```javascript
console.log('Hello, World !');
```

![実行結果](imgs/console-hello-world.png)
このようにして `Console` タブ上に任意のデータを出力することが出来ます。
ここで使った `console.log()` の仲間に↓のようなものがあります。後で使えるかもしれないのでそれぞれ試してみてほしいです。

| code | 出力結果 | 使い所 |
| ---- | ---- | ---- |
| `console.log('multiple', 'args)` | ![multiple-args](imgs/console-log-multi-arg.png) | 複数の値をいっぺんに確認したいとき |
| `console.warn('this is warn')` | ![warn](imgs/console-warn-sample.png) | 黄色い出力になって見つけやすい<br>被致命のエラーに使うとよい |
| `console.error('this is error')` | ![error](imgs/console-error-sample.png) | 赤い出力になって見つけやすい<br>致命的なエラーに使うとよい |
| `console.table({'this': 'table'})` | ![table](imgs/console-table-sample.png) | オブジェクトを見やすく表示したいときに便利 |

### 2. コメント
> JavaScript Comments [w3c](https://www.w3schools.com/js/js_comments.asp)

おおよそのプログラミング言語にはコメントという機能があります。
コメントを書くことでコードの処理や意図を他の開発者にわかりやすくできます。
また、コードの動作を確かめるときに不要な部分をコメントにすることで実行を省くことができます。

```javascript
// JavaScriptには2種類のコメントの書き方があり、こちらは行中の // 以後をコメントにします
// console.log('例えばこんなふうな実行したくない行をコメントにできます。');

/* 
  この書き方では複数行をコメントにできます。
  処理の塊をまるごとコメントにしたい場合に便利です。
*/
```