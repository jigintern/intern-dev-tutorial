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
### 0. ブラウザの開発者用ツールを使おう
※ Google Chrome を利用することを前提としています

chromeの開発者ツールを利用します。
↓の画像のように右上のケバブメニューから開くことが出来ます。

![ケバブメニューからの開きかた](../getting-started-with-javascript/imgs/chrome-open-devtools-from-kebab-menu.png)

> ショートカットキー
> Windows / Linux / ChromeOS : `Ctrl + Shift + I`
> macOS: `⌥ + ⌘ + I`

↓のような表示になっていれば開けています。(開発者ツールの幅は適当に調節してください)
![開発者ツールを開いたときの見た目](imgs/chrome-opened-devtools-firstview.png)

今回の資料では↑の `Console` タブを利用します。
