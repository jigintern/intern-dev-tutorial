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
  table { font-size: 26px; }
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
  .goal {
    font-size: 52px;
    font-weight: bold;
    color: #0b8f82;
    margin: 30px 0;
  }
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
  /* --- ブラウザの形 --- */
  .browser {
    width: 360px;
    border: 4px solid #7b8794;
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
  }
  .browser .bar {
    background: #cbd2d9;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .browser .dot {
    width: 13px; height: 13px;
    border-radius: 50%;
    background: #9aa5b1;
    display: inline-block;
  }
  .browser .barlabel {
    margin-left: 14px;
    font-size: 20px;
    color: #52606d;
  }
  .browser .screen {
    padding: 24px 20px;
    min-height: 120px;
    text-align: center;
  }
  .browser .screen .big {
    font-size: 30px;
    font-weight: bold;
    color: #3e4c59;
  }
  .browser .screen .ok { color: #0b8f82; }
  /* --- サーバー（雲）の形 --- */
  .cloud { width: 340px; }
  .cloud .body {
    border: 4px solid #0b8f82;
    background: #f0fdfa;
    border-radius: 60px;
    padding: 28px 24px;
    min-height: 118px;
    text-align: center;
    font-weight: bold;
    color: #0b8f82;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .cloud .caption {
    text-align: center; font-size: 20px;
    color: #0b8f82; margin-top: 12px; font-weight: bold;
  }
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
  /* --- エンドポイント表示 --- */
  .urlrow {
    margin-top: 40px;
    text-align: center;
    font-size: 34px;
    font-weight: bold;
    color: #3e4c59;
  }
  .urlrow .origin { color: #9aa5b1; }
  .urlrow .path { color: #0b8f82; }
  .urlrow .caption {
    display: block;
    font-size: 21px;
    font-weight: normal;
    color: #7b8794;
    margin-top: 14px;
  }
  /* --- 3つのAPI一覧 --- */
  .apilist { margin-top: 30px; }
  .apilist div {
    font-size: 27px;
    color: #3e4c59;
    line-height: 1.9;
  }
  .apilist code { color: #0b8f82; font-weight: bold; }
  .apilist span { color: #7b8794; font-size: 23px; }
  .ng { color: #e12d39; font-weight: bold; }
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
  }
  .arow .jp {
    margin-left: auto;
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
  /* --- 窓口の図 --- */
  .io {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 0;
    margin-top: 46px;
  }
  .io .ioside {
    border: 4px solid #7b8794;
    border-radius: 16px;
    padding: 34px 26px;
    font-size: 28px;
    font-weight: bold;
    color: #3e4c59;
    min-width: 200px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .io .ioside.api {
    border-color: #0b8f82;
    background: #f0fdfa;
    color: #0b8f82;
  }
  /* 真ん中の「面」 */
  .io .counter {
    width: 300px;
    border-left: 7px solid #4dc0b5;
    border-right: 7px solid #4dc0b5;
    background: #f0fdfa;
    padding: 14px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  .io .countertitle {
    position: absolute;
    top: -34px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #0b8f82;
  }
  .io .ioline {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 7px 0;
  }
  .io .iolabel {
    font-size: 23px;
    font-weight: bold;
    color: #0b8f82;
  }
  .io .ioarrow {
    font-size: 26px;
    color: #4dc0b5;
    letter-spacing: -2px;
    line-height: 1.1;
  }
  /* --- 中身を知らなくても使える --- */
  .hide { margin-top: 40px; }
  .hrow {
    display: flex;
    align-items: center;
    margin-bottom: 26px;
    gap: 20px;
  }
  .hrow .hlabel {
    font-size: 27px;
    font-weight: bold;
    color: #3e4c59;
    width: 92px;
    flex-shrink: 0;
  }
  .hrow .hback {
    font-size: 21px;
    color: #9aa5b1;
    line-height: 1.5;
    width: 330px;
    flex-shrink: 0;
  }
  .hrow .hwall {
    font-size: 19px;
    font-weight: bold;
    color: #4dc0b5;
    border-left: 5px solid #4dc0b5;
    padding-left: 12px;
    flex-shrink: 0;
  }
  .hrow .hfront {
    font-family: monospace;
    font-size: 23px;
    font-weight: bold;
    color: #0b8f82;
    background: #f0fdfa;
    border-radius: 8px;
    padding: 12px 16px;
  }
  .hcap {
    display: flex;
    gap: 20px;
    margin-top: 4px;
    font-size: 20px;
    color: #7b8794;
  }
  .hcap .c1 { width: 92px; flex-shrink: 0; }
  .hcap .c2 { width: 330px; flex-shrink: 0; }
---
<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: '' -->

# はじめてのAPI

---

## 今日のゴール

<br>

<div class="goal">自分のアプリに<br>自分でAPIを1本増やせるようになる</div>

<div class="note">
前の章で勉強したHTTPを 今日は実際にコードで書く
</div>

---

## 今日つくるAPIは4本

<div class="apilist">
  <div><code>GET /greeting</code> <span>… 決まった文字を返す</span></div>
  <div><code>GET /greeting-me?name=taro</code> <span>… 渡した名前を使って返す</span></div>
  <div><code>GET /profile</code> <span>… <strong>JSON</strong>を返す</span></div>
  <div><code>POST /auth</code> <span>… 送ったパスワードを確かめる</span></div>
</div>

<div class="note tight">
だんだん「情報のやりとり」が増えていく
</div>

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
  <div class="counter">
    <div class="countertitle">inter（間） + face（面）</div>
    <div class="ioline">
      <span class="iolabel">決まった形で頼む</span>
      <span class="ioarrow">──────▶</span>
    </div>
    <div class="ioline">
      <span class="ioarrow">◀──────</span>
      <span class="iolabel">答えが返る</span>
    </div>
  </div>
  <div class="ioside api">server.js</div>
</div>

<div class="note tight">
銀行や役所の窓口と同じ<br>
<strong>中で何をしているかは見えない</strong> けれど 決まった形で頼めば答えが返る
</div>

---

## だから中身を知らなくても使える

<div class="hcap">
  <span class="c1"></span>
  <span class="c2">裏側でやっていること</span>
  <span>自分が書くこと</span>
</div>

<div class="hide">
  <div class="hrow">
    <span class="hlabel">天気</span>
    <span class="hback">世界中の観測データを集めて<br>スパコンで何時間も計算している</span>
    <span class="hwall">API</span>
    <span class="hfront">fetch("/weather?city=fukui")</span>
  </div>
  <div class="hrow">
    <span class="hlabel">地図</span>
    <span class="hback">膨大な画像データの中から<br>その地点の1枚を切り出している</span>
    <span class="hwall">API</span>
    <span class="hfront">fetch("/map?lat=36&lng=136")</span>
  </div>
</div>

<div class="note tight">
使う側が書くのは<strong>1行</strong><br>
自分で気象観測をしなくても 天気を出すアプリがつくれる
</div>

---

## もうひとつの利点 見せたくないものを隠せる

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

| これがルール | 例 |
| --- | --- |
| どのURLか | `/greeting-me` |
| どのメソッドか | `GET` |
| 何を渡すか | `name` |
| 何が返るか | `Hello, taro` |

<div class="note tight">
この4つが決まっていれば <strong>別々の人がつくっても繋がる</strong><br>
2番目のGETとPOSTが 前の章でやったやつ
</div>

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 2. server.jsは<br>全部の入口

---

## 昨日ページを開いたとき何が起きていたか

| ブラウザがやったこと | 誰が答えたか |
| --- | --- |
| `/` を開く | `server.js` が `index.html` を返した |
| `styles.css` を読み込む | `server.js` が返した |
| `index.js` を読み込む | `server.js` が返した |
| `/welcome-message` を叩く | `server.js` が文字を返した |

<div class="note tight">
<strong>4回とも同じ server.js が答えている</strong>
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

<!-- _class: chapter -->
<!-- _header: '' -->

# 3. 手を動かす

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
<code>index.js</code> と <code>styles.css</code> は開かない<br>
昨日書き換えたものは<span class="ng">消さず</span> 足していくだけ
</div>

---

## 4章の山場 JSON

文字だけだと 2つの情報を返すのが苦しい

```js
return new Response("たにぐち,ラーメン");   // 受け取る側が , で切る…
```

JSONならキーで取り出せる

```js
return Response.json({ name: "たにぐち", favorite: "ラーメン" });
```

<div class="note tight">
<strong>実際のWebアプリのAPIはほとんどこの形</strong>
</div>

---

## 受け取り方も1か所だけ変わる

```js
await response.text()   // 文字として受け取る（2章・3章）
await response.json()   // JSONとして受け取る（4章）
```

<div class="note">
<code>json()</code> で受け取ると <code>data.name</code> のように<br>
<strong>キーを指定して取り出せる</strong>
</div>

---

## 形が合わないと繋がらない

<div class="row tight">
  <div class="box">
    <span class="label">server.js</span>
    <code>name</code> で返す
  </div>
  <div class="arrowlabel">
    <span class="arrow">≠</span>
  </div>
  <div class="box">
    <span class="label">api.js</span>
    <code>data.userName</code> を探す
  </div>
</div>

<div class="urlrow">
  <span class="path">undefined</span>
  <span class="caption">ルールは両側セット 片方だけ直しても動かない</span>
</div>

---

<!-- _class: lead -->

# はじめよう

READMEを開く
