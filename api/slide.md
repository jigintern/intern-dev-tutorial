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
前の章で勉強したHTTPを、今日は実際にコードで書きます
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
だんだん「情報のやりとり」が増えていきます
</div>

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 1. APIは「約束」

---

## ブラウザとサーバーは、別のプログラム

<div class="row tight">
  <div class="browser">
    <div class="bar">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span class="barlabel">ブラウザ</span>
    </div>
    <div class="screen">
      <div class="big">画面を表示する</div>
    </div>
  </div>
  <div class="arrowlabel">
    <span class="arrow">⇄</span>
    約束
  </div>
  <div class="cloud">
    <div class="body">サーバー<br>server.js</div>
  </div>
</div>

<div class="note tight">
お互いの中身は直接さわれない。だから間に<strong>約束</strong>を置く
</div>

---

## 約束で決めるのは、いつも同じ4つ

| 決めること | 例 |
| --- | --- |
| どのURLか | `/greeting-me` |
| どのメソッドか | `GET` |
| 何を渡すか | `name` |
| 何が返るか | `Hello, taro` |

<div class="note tight">
2番目のGETとPOSTが、前の章でやったやつです
</div>

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 2. server.jsは<br>全部の入口

---

## 昨日、ページを開いたとき何が起きていたか

| ブラウザがやったこと | 誰が答えたか |
| --- | --- |
| `/` を開く | `server.js` が `index.html` を返した |
| `styles.css` を読み込む | `server.js` が返した |
| `index.js` を読み込む | `server.js` が返した |
| `/welcome-message` を叩く | `server.js` が文字を返した |

<div class="note tight">
<strong>4回とも、同じ server.js が答えています</strong>
</div>

---

<!-- _class: big -->

HTMLを返す係と
APIに答える係は
**同じファイル**

---

## 上から順に「自分の担当か」を見ています

<div class="steps">
  <div>通信が来た</div>
  <div><span class="step">1</span> <code>/welcome-message</code> ですか？ <span>→ はい なら 返して<strong>おわり</strong></span></div>
  <div><span class="step">2</span> <code>/greeting</code> ですか？ <span>→ はい なら 返して<strong>おわり</strong></span></div>
  <div class="on"><span class="step">3</span> どれでもない → <code>serveDir</code> がファイルを探して返す</div>
</div>

<div class="note tight">
一番下の <code>serveDir</code> は「どれにも当たらなかったとき」の受け皿
</div>

---

## だから、追加するのは`serveDir`の「上」

```js
  return serveDir(req, {     // ← ここで終わってしまう
    fsRoot: "public",
  });

  if (pathname === "/greeting") {   // ← ここには絶対に来ない
    return new Response("Hello!!");
  }
```

<div class="note tight">
<code>return</code> は「返しておわり」の意味。<br>
下に書いたAPIには<span class="ng">一生たどりつきません</span>
</div>

---

<!-- _class: big -->

今日は必ず
**`return serveDir(` の上**
に足していきます

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 3. 手を動かします

---

## 4本とも、同じ進め方です

<div class="steps">
  <div><span class="step">1</span> <strong>サーバー側</strong>に書く</div>
  <div class="on"><span class="step">2</span> <strong>ブラウザのURL直打ち</strong>で確かめる</div>
  <div><span class="step">3</span> <strong>ブラウザ側</strong>に書く</div>
  <div><span class="step">4</span> ボタンで確かめる</div>
</div>

<div class="note tight">
2番を挟むと、動かないとき<strong>どちらが原因か</strong>を自分で切り分けられます
</div>

---

## 今日さわるファイルは3つ

| ファイル | 今日の扱い |
| --- | --- |
| `server.js` | `return serveDir(` の**上に足す** |
| `public/api.js` | **新しくつくる**。今日書くJSは全部ここ |
| `public/index.html` | `</body>` の**直前に足す** |

<div class="note tight">
<code>index.js</code> と <code>styles.css</code> は開きません
</div>

---

<!-- _class: big -->

昨日書き換えたものは
<span class="ng">消しません</span>
足していくだけです

---

## 4章の山場: JSON

文字だけだと、2つの情報を返すのが苦しい

```js
return new Response("たにぐち,ラーメン");   // 受け取る側が , で切る…
```

JSONなら、キーで取り出せる

```js
return Response.json({ name: "たにぐち", favorite: "ラーメン" });
```

<div class="note tight">
<strong>実際のWebアプリのAPIは、ほとんどこの形です</strong>
</div>

---

## 受け取り方も1か所だけ変わります

```js
await response.text()   // 文字として受け取る（2章・3章）
await response.json()   // JSONとして受け取る（4章）
```

<div class="note">
<code>json()</code> で受け取ると <code>data.name</code> のように<br>
<strong>キーを指定して取り出せます</strong>
</div>

---

## 約束は、両側セットです

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
  <span class="caption">片方だけ直しても動きません</span>
</div>

---

<!-- _class: lead -->

# はじめましょう

READMEを開いてください
