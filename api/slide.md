---
marp: true
theme: default
paginate: true
header: 'はじめてのAPI'
style: |
  section {
    font-family: "Hiragino Sans", "Yu Gothic", sans-serif;
    font-size: 30px;
    padding: 60px;
  }
  section.lead {
    text-align: center;
    justify-content: center;
  }
  section.lead h1 {
    font-size: 66px;
  }
  section.big {
    justify-content: center;
    text-align: center;
  }
  section.big p {
    font-size: 52px;
    line-height: 1.6;
    font-weight: bold;
  }
  section.chapter {
    background: #1f2933;
    color: #fff;
    justify-content: center;
    text-align: center;
  }
  section.chapter h1 { color: #fff; font-size: 60px; }
  section.chapter p { color: #9aa5b1; }
  h1 { color: #1f2933; }
  h2 { color: #1f2933; border-bottom: 3px solid #4dc0b5; padding-bottom: 12px; }
  strong { color: #0b8f82; }
  h1 strong, h2 strong, h3 strong, h4 strong { color: #0b8f82; }
  code { font-size: 0.9em; }
  pre { font-size: 24px; line-height: 1.5; }
  table {
    font-size: 26px;
    margin: 0 auto;
  }
  th, td { padding: 13px 18px; }
  td:first-child, th:first-child { white-space: nowrap; }
  td code { white-space: nowrap; }
  .step {
    display: inline-block;
    background: #4dc0b5;
    color: #fff;
    border-radius: 50%;
    width: 52px; height: 52px;
    line-height: 52px; text-align: center;
    font-weight: bold; margin-right: 12px;
  }
  .note {
    font-size: 24px;
    color: #616e7c;
    margin-top: 36px;
  }
  .note.tight { margin-top: 18px; }
  /* --- 図用 --- */
  .row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-top: 46px;
  }
  .row.tight { margin-top: 26px; gap: 30px; }
  .box {
    border: 4px solid #7b8794;
    border-radius: 16px;
    padding: 26px 32px;
    text-align: center;
    font-size: 29px;
    font-weight: bold;
    color: #3e4c59;
    min-width: 240px;
  }
  .box .label {
    font-size: 21px;
    font-weight: normal;
    color: #7b8794;
    display: block;
    margin-bottom: 14px;
  }
  .box.api {
    border-color: #0b8f82;
    background: #f0fdfa;
    color: #0b8f82;
  }
  .box.api .label { color: #0b8f82; }
  .inner {
    background: #f5f7fa;
    border-radius: 12px;
    padding: 16px 22px;
    font-size: 25px;
    color: #3e4c59;
    margin-top: 14px;
  }
  .arrow {
    font-size: 56px;
    color: #4dc0b5;
    font-weight: bold;
  }
  .arrowlabel {
    text-align: center;
    color: #0b8f82;
    font-size: 22px;
    font-weight: bold;
  }
  .arrowlabel .arrow { display: block; line-height: 1; }
  .dim { opacity: 0.35; }
  /* --- 手順リスト --- */
  .steps { margin-top: 26px; }
  .steps div {
    font-size: 27px;
    color: #3e4c59;
    line-height: 1.95;
  }
  .steps strong { color: #0b8f82; }
  .steps span { color: #7b8794; font-size: 23px; }
  .steps div.on {
    color: #0b8f82;
    font-weight: bold;
  }
  .ng { color: #e12d39; font-weight: bold; }
  /* --- 強調用ハイライト --- */
  .steps div strong.hl,
  strong.hl {
    background: #4dc0b5;
    color: #fff;
    padding: 4px 14px;
    border-radius: 7px;
    font-weight: bold;
    font-size: 28px;
  }
  /* --- スクリーンショット --- */
  .shot { margin-top: 28px; text-align: center; }
  .shot img {
    max-height: 300px;
    max-width: 100%;
    border: 3px solid #cbd2d9;
    border-radius: 10px;
  }
  /* --- server.js が2種類を返す図 --- */
  .split { margin-top: 40px; text-align: center; }
  .split .stop {
    display: inline-block;
    border: 4px solid #0b8f82;
    background: #f0fdfa;
    border-radius: 14px;
    padding: 16px 46px;
    font-size: 30px;
    font-weight: bold;
    color: #0b8f82;
  }
  .split .sarrows {
    display: flex;
    justify-content: center;
    gap: 330px;
    font-size: 34px;
    color: #4dc0b5;
    line-height: 1.1;
    margin: 6px 0 2px;
  }
  .split .srow {
    display: flex;
    justify-content: center;
    gap: 36px;
  }
  .split .sbox {
    border: 3px solid #9aa5b1;
    border-radius: 12px;
    padding: 18px 24px;
    width: 380px;
    text-align: center;
  }
  .split .sbox.api {
    border-color: #0b8f82;
    background: #f0fdfa;
  }
  .split .sbox .stitle {
    display: block;
    font-size: 24px;
    font-weight: bold;
    color: #3e4c59;
    margin-bottom: 12px;
  }
  .split .sbox.api .stitle { color: #0b8f82; }
  .split .sbox .sitems {
    display: block;
    font-size: 21px;
    color: #7b8794;
    line-height: 1.7;
  }
  /* --- 三層構造との対比 --- */
  .layers { margin-top: 44px; }
  .lrow {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 40px;
  }
  .lrow .llabel {
    width: 168px;
    font-size: 23px;
    font-weight: bold;
    color: #9aa5b1;
    flex-shrink: 0;
  }
  .lrow.on .llabel { color: #0b8f82; }
  .lrow .lbox {
    border: 3px solid #cbd2d9;
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 22px;
    font-weight: bold;
    color: #7b8794;
    text-align: center;
    line-height: 1.25;
  }
  .lrow .lbox em {
    display: block;
    font-size: 17px;
    font-style: normal;
    font-weight: normal;
    color: #9aa5b1;
    margin-top: 3px;
  }
  .lrow.on .lbox {
    border-color: #0b8f82;
    background: #f0fdfa;
    color: #0b8f82;
  }
  .lrow.on .lbox em { color: #0b8f82; }
  .lrow .larrow {
    font-size: 22px;
    color: #4dc0b5;
    font-weight: bold;
  }
  /* --- 利点の予告 --- */
  .benefits { margin-top: 66px; }
  .benefits div {
    font-size: 38px;
    font-weight: bold;
    color: #3e4c59;
    margin-bottom: 38px;
  }
  .benefits .bnum {
    display: inline-block;
    background: #4dc0b5;
    color: #fff;
    font-size: 25px;
    border-radius: 8px;
    padding: 7px 18px;
    margin-right: 22px;
    vertical-align: middle;
  }
  /* --- 略語の分解 --- */
  .acronym { margin-top: 44px; }
  .arow {
    display: flex;
    align-items: baseline;
    gap: 0;
    margin-bottom: 24px;
  }
  .arow .ini {
    font-size: 68px;
    font-weight: bold;
    color: #4dc0b5;
    line-height: 1;
    width: 52px;
  }
  .arow .eng {
    font-size: 40px;
    font-weight: bold;
    color: #3e4c59;
    letter-spacing: 0.01em;
    width: 300px;
  }
  .arow .jp {
    margin-left: 24px;
    font-size: 30px;
    color: #616e7c;
  }
  .arow.on .ini { color: #0b8f82; }
  .arow.on .eng { color: #0b8f82; }
  .arow.on .jp { color: #0b8f82; font-weight: bold; }
  .sum {
    margin-top: 6px;
    padding-top: 26px;
    border-top: 3px solid #cbd2d9;
    font-size: 34px;
    font-weight: bold;
    color: #3e4c59;
    text-align: center;
  }
  .sum strong { color: #0b8f82; }
  /* --- 窓口の図（窓口 = サーバー側の表面。線1本で描く） --- */
  .io {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 0;
    margin-top: 56px;
  }
  .io .ioside {
    border: 4px solid #7b8794;
    border-radius: 16px;
    padding: 42px 30px;
    font-size: 28px;
    font-weight: bold;
    color: #3e4c59;
    min-width: 190px;
    text-align: center;
  }
  /* サーバー側。左辺だけを太くして、それを窓口として見せる */
  .io .ioside.api {
    border: 4px solid #0b8f82;
    border-left: 14px solid #4dc0b5;
    background: #f0fdfa;
    color: #0b8f82;
  }
  .io .arrows {
    width: 300px;
    padding: 0 14px 14px;
  }
  .io .ioline {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 14px 0;
  }
  .io .iolabel {
    font-size: 24px;
    font-weight: bold;
    color: #0b8f82;
  }
  .io .ioarrow {
    font-size: 30px;
    color: #4dc0b5;
    letter-spacing: -2px;
    line-height: 1.1;
  }
  .io .gatelabel {
    font-size: 22px;
    font-weight: bold;
    color: #0b8f82;
    margin-left: -6px;
    margin-bottom: 10px;
    white-space: nowrap;
  }
---
<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: '' -->

# はじめてのAPI

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 1. APIとは何か

---

## 名前がそのまま意味

<div class="acronym">
  <div class="arow">
    <span class="ini">A</span><span class="eng">pplication</span>
    <span class="jp">アプリケーションを</span>
  </div>
  <div class="arow">
    <span class="ini">P</span><span class="eng">rogramming</span>
    <span class="jp">プログラムから使うための</span>
  </div>
  <div class="arow on">
    <span class="ini">I</span><span class="eng">nterface</span>
    <span class="jp">窓口</span>
  </div>
  <div class="sum">アプリをプログラムから使うための<strong>窓口</strong></div>
</div>

---

## インターフェース ＝ 窓口

<div class="io">
  <div class="ioside">ブラウザ</div>
  <div class="arrows">
    <div class="ioline">
      <span class="iolabel">決まった形で頼む</span>
      <span class="ioarrow">──────▶</span>
    </div>
    <div class="ioline">
      <span class="ioarrow">◀──────</span>
      <span class="iolabel">答えが返る</span>
    </div>
  </div>
  <div>
    <div class="gatelabel">↓ この面が窓口 ＝ API</div>
    <div class="ioside api">server.js</div>
  </div>
</div>

<div class="note tight">
inter（間） + face（面） ＝ <strong>間にある面</strong> 厚みのない1枚の面<br>
窓口は<strong>サーバー側の表面</strong> 銀行の窓口が銀行の一部なのと同じ
</div>

---

## 窓口があると うれしいことが2つ

<div class="benefits">
  <div><span class="bnum">利点1</span> 中身を知らなくても使える</div>
  <div><span class="bnum">利点2</span> 見せたくないものを隠せる</div>
</div>

---

## 利点1 中身を知らなくても使える

| | 裏側でやっていること | 自分が書くこと |
| --- | --- | --- |
| **天気** | 観測データを集めて スパコンで計算 | `fetch("/weather")` |
| **地図** | 膨大な画像から その地点を切り出す | `fetch("/map")` |
| **翻訳** | 大量の文章で学習したモデルで推論 | `fetch("/translate")` |

<div class="note tight">
左は<strong>知らなくていい</strong> 書くのは右の<strong>1行</strong>だけ<br>
自分で気象観測をしなくても 天気を出すアプリがつくれる
</div>

---

## 利点2 見せたくないものを隠せる

<div class="row tight">
  <div class="box">
    <span class="label">ブラウザ側</span>
    index.html / api.js
    <div class="inner">開発者ツールで<br><strong>誰でも中身が見える</strong></div>
  </div>
  <div class="arrowlabel">
    <span class="arrow">⇄</span>
    API
  </div>
  <div class="box api">
    <span class="label">サーバー側</span>
    server.js
    <div class="inner">中身は<br><strong>誰にも見えない</strong></div>
  </div>
</div>

<div class="note tight">
パスワードの照合 APIキー データベースの情報は <strong>全部この右側に置く</strong><br>
この見えない側を<strong>バックエンド</strong>と呼ぶ
</div>

---

## 窓口のルールは この4つ

| | これがルール | 例 |
| --- | --- | --- |
| ① | どのURLか | `/greeting-me` |
| ② | どのメソッドか | `GET` |
| ③ | 何を渡すか | `name` |
| ④ | 何が返るか | `Hello, taro` |

<div class="note tight">
この4つが決まっていれば <strong>別々の人がつくっても繋がる</strong><br>
②のGETとPOSTが 前の章でやったやつ
</div>

---

## 4つを組み合わせると コードになる

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

<div class="note tight">
今日書くのは これだけ<br>
4本とも <strong>①②③④のどれかが変わるだけ</strong>
</div>

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 2. server.jsは<br>全部の入口

---

## これが昨日の最初の形

```js
import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {                    // 通信は全部ここに来る
  const pathname = new URL(req.url).pathname;
  console.log(pathname);                 // 叩かれたパスを表示

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("jigインターンへようこそ！");
  }

  return serveDir(req, { fsRoot: "public", ... });
});
```

<div class="note tight">
テンプレートから始まったときの <code>server.js</code><br>
書き換えたのは中身だけ <strong>形はこのまま残っている</strong>
</div>

---

## 上から順に「自分の担当か」を見ている

<div class="steps">
  <div>通信が来た</div>
  <div><span class="step">1</span> GETで <code>/welcome-message</code> か？ → <strong class="hl">バックエンドの情報</strong> を返す</div>
  <div class="on"><span class="step">2</span> どれでもない → <code>serveDir</code> が <strong class="hl">ブラウザの構成要素</strong> を返す</div>
</div>

<div class="note tight">
一番下の <code>serveDir</code> は「どれにも当たらなかったとき」の受け皿
</div>

---

## フロントの構成要素も server.js が返している

<div class="split">
  <div class="stop">server.js</div>
  <div class="sarrows"><span>↙</span><span>↘</span></div>
  <div class="srow">
    <div class="sbox">
      <span class="stitle">フロントの構成要素</span>
      <span class="sitems"><code>index.html</code> / <code>styles.css</code><br><code>index.js</code></span>
    </div>
    <div class="sbox api">
      <span class="stitle">バックエンドの情報</span>
      <span class="sitems"><code>/welcome-message</code><br>の文字</span>
    </div>
  </div>
</div>

<div class="note tight">
画面をつくる部品も データも <strong>同じ入口から 同じ形で返る</strong><br>
だから 1ファイルで両方できている
</div>

---

## 構成要素は 1つずつ 4回に分けて返る

| 叩かれたURL | 上から順に見た結果 | 返ってきたもの |
| --- | --- | --- |
| `/` | どれにも当たらない → `serveDir` | `index.html` |
| `/styles.css` | どれにも当たらない → `serveDir` | CSS |
| `/index.js` | どれにも当たらない → `serveDir` | JavaScript |
| `/welcome-message` | **1番目のifに当たった** | 「ようこそ」の文字 |

<div class="note tight">
3回は <strong>フロントの構成要素</strong> 1回は <strong>バックエンドの情報</strong><br>
どちらも同じ <code>server.js</code> が 同じ形で返している
</div>

---

## 自分のサイトで見てみよう

<div class="steps">
  <div><span class="step">1</span> <strong>開発者ツール</strong>（F12）→ <strong>Network</strong> タブ</div>
  <div class="on"><span class="step">2</span> ページを再読み込みすると <strong>4行ならぶ</strong></div>
</div>

<div class="shot">
  <img src="./imgs/network-tab.png" alt="NetworkタブにHTML CSS JS APIの4行が並んでいる">
</div>

<div class="note tight">
<code>Initiator</code> を見ると <strong>誰が呼んだか</strong>が分かる<br>
<code>styles.css</code> と <code>index.js</code> は <code>(index)</code> から つまり<strong>HTMLが呼んでいる</strong>
</div>

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 3. APIハンズオン

---

## 昨日デプロイしたアプリに 足していく

<div class="steps">
  <div><span class="step">1</span> 昨日クローンしたフォルダを開く <span>例: deno-app</span></div>
  <div><span class="step">2</span> <code>server.js</code> に窓口を4つ足す</div>
  <div class="on"><span class="step">3</span> push すると <strong>自動でデプロイされる</strong> <span>昨日のような設定は要らない</span></div>
  <div><span class="step">4</span> 昨日のURLに <code>/profile</code> を付けると <strong>スマホからも叩ける</strong></div>
</div>

<div class="note tight">
作業するのは<strong>自分のリポジトリ</strong><br>
教材リポジトリ（<code>intern-dev-tutorial</code>）<span class="ng">ではない</span>
</div>

---

## 4本とも同じ進め方

<div class="steps">
  <div><span class="step">1</span> <strong>サーバー側</strong>に書く</div>
  <div class="on"><span class="step">2</span> <strong>ブラウザのURL直打ち</strong>で確かめる</div>
  <div><span class="step">3</span> <strong>ブラウザ側</strong>に書く</div>
  <div><span class="step">4</span> ボタンで確かめる</div>
</div>

<div class="note tight">
2番を挟むと 動かないとき<strong>どちらが原因か</strong>を自分で切り分けられる
</div>

---

## 今日さわるファイルは3つ

| ファイル | 今日の扱い |
| --- | --- |
| `server.js` | `return serveDir(` の**上に足す** |
| `public/api.js` | **新しくつくる** 今日書くJSは全部ここ |
| `public/index.html` | `</body>` の**直前に足す** |

<div class="note tight">
今日書くJSは <code>api.js</code> に<strong>新しくつくる</strong><br>
<code>serveDir</code> より下に書くと<span class="ng">たどりつかない</span>ので 必ず<strong>その上</strong>へ
</div>

---

<!-- _class: lead -->

# READMEへ！
