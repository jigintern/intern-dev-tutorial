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

## 昨日ページを開いたとき何が起きていたか

| ブラウザが求めたもの | 中身のもとは | 答えたのは |
| --- | --- | --- |
| `index.html` | `public` のファイル | `server.js` |
| `styles.css` | `public` のファイル | `server.js` |
| `index.js` | `public` のファイル | `server.js` |
| `/welcome-message` | `server.js` に書いた文字 | `server.js` |

<div class="note tight">
4回とも同じ形 <strong>レスポンスボディに中身が入って返ってくる</strong><br>
違うのは <strong>ファイルから読んだか コードに書いたか</strong>だけ
</div>

---

## 上から順に「自分の担当か」を見ている

<div class="steps">
  <div>通信が来た</div>
  <div><span class="step">1</span> GETで <code>/welcome-message</code> か？ <span>→ はい なら 返して<strong>おわり</strong></span></div>
  <div><span class="step">2</span> GETで <code>/greeting</code> か？ <span>→ はい なら 返して<strong>おわり</strong></span></div>
  <div class="on"><span class="step">3</span> どれでもない → <code>serveDir</code> がファイルを探して返す</div>
</div>

<div class="note tight">
一番下の <code>serveDir</code> は「どれにも当たらなかったとき」の受け皿
</div>

---

## だから追加するのは`serveDir`の「上」

```js
  return serveDir(req, {     // ← ここで終わってしまう
    fsRoot: "public",
  });

  if (pathname === "/greeting") {   // ← ここには絶対に来ない
    return new Response("Hello!!");
  }
```

<div class="note tight">
<code>return</code> は「返しておわり」の意味<br>
下に書いたAPIには<span class="ng">一生たどりつかない</span>
</div>

---

<!-- _class: big -->

昨日の書き換えで
みんなの`server.js`は
**中身が違う**

---

## だから 行番号ではなく「目印」で示す

<div class="steps">
  <div>資料には行番号を書いていない</div>
  <div class="on">かわりに <code>return serveDir(</code> という<strong>目印</strong>で場所を示す</div>
  <div>この行はほぼ全員に残っている <span>消したら昨日ページが出なくなっている</span></div>
</div>

<div class="note tight">
昨日 何をどう書き換えていても <strong>同じ手順で進められる</strong><br>
書き換えたものは消さず 足していくだけ
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
だから昨日書いた <code>index.js</code> と <code>styles.css</code> は<span class="ng">開かない</span>
</div>

---

<!-- _class: lead -->

# はじめよう

READMEを開く
