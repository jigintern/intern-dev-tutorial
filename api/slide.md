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

<div class="goal">昨日つくったアプリに<br>自分でAPIを追加する</div>

<div class="note">
昨日は「スマホで見られる」まで。今日は、その先です
</div>

---

<!-- _class: big -->

昨日、みんなのアプリは
**インターネットに公開されました**

---

## でも、まだ「見えるだけ」です

<div class="row">
  <div class="browser">
    <div class="bar">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span class="barlabel">自分のアプリ</span>
    </div>
    <div class="screen">
      <div class="big">ようこそ！</div>
    </div>
  </div>
</div>

<div class="note">
開くと文字が出る。それだけでした
</div>

---

<!-- _class: big -->

今日は
**「動く」**
ようにします

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 1. APIとは何か

---

<!-- _class: big -->

**Application**
**Programming**
**Interface**

---

## アプリが、別のアプリの機能を呼び出す仕組み

<div class="row">
  <div class="box">
    <span class="label">自分のアプリ</span>
    天気を表示したい
  </div>
  <div class="arrowlabel">
    <span class="arrow">→</span>
    呼び出す
  </div>
  <div class="box api">
    <span class="label">気象庁のアプリ</span>
    天気のデータ
  </div>
</div>

<div class="note">
自分で気象観測をしなくても、天気を表示するアプリが作れます
</div>

---

## 中身を知らなくても、使えます

<div class="row">
  <div class="box">
    <span class="label">呼び出す側</span>
    「東京の天気を教えて」
    <div class="inner">どうやって調べているかは<br><strong>知らなくていい</strong></div>
  </div>
  <div class="arrowlabel">
    <span class="arrow">→</span>
  </div>
  <div class="box api">
    <span class="label">API</span>
    「晴れです」
  </div>
</div>

<div class="note">
呼び出す側は、APIの裏側にあるコードを意識しなくて済みます
</div>

---

## Webアプリでは「サーバーへの問い合わせ」

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
    やりとり
  </div>
  <div class="cloud">
    <div class="body">サーバー<br>server.js</div>
    <div class="caption">＝ みんなが昨日書いたコード</div>
  </div>
</div>

<div class="note tight">
今日つくるのは、この右側です
</div>

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 2. 実はもう、<br>APIを叩いています

---

## 昨日の`public/index.js`を見てみましょう

```js
const message = await fetch("/welcome-message")
document.querySelector("#welcomeMessage").innerText = await message.text()
```

<div class="note">
たった2行。この1行目が、<strong>APIを呼び出しているコード</strong>です
</div>

---

## 画面に文字が出るまでの流れ

<div class="steps">
  <div><span class="step">1</span> ブラウザがページを開く</div>
  <div class="on"><span class="step">2</span> ブラウザが<code>/welcome-message</code>に問い合わせる</div>
  <div><span class="step">3</span> サーバーが文字を返す</div>
  <div><span class="step">4</span> ブラウザが、返ってきた文字を画面に入れる</div>
</div>

<div class="note tight">
2番が、API呼び出しです
</div>

---

## 答えているのは`server.js`のここ

```js
if (req.method === "GET" && pathname === "/welcome-message") {
  return new Response("jigインターンへようこそ！");
}
```

<div class="note">
昨日「文言を変えてみよう」で書き換えたのは、<br>
まさに<strong>このAPIの中身</strong>でした
</div>

---

<!-- _class: big -->

つまり昨日の時点で、
**APIを持ったアプリ**
ができていました

---

## エンドポイント ＝ APIの接続先

<div class="urlrow">
  <span class="origin">http://localhost:8000</span><span class="path">/welcome-message</span>
  <span class="caption">オリジン ＋ パス</span>
</div>

<div class="note">
オリジンは基本同じなので、<code>/welcome-message</code>の部分だけを<br>
「エンドポイント」と呼ぶことがあります
</div>

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 3. 今日つくるAPI

---

## 3つ、追加します

<div class="apilist">
  <div><code>GET /greeting</code> <span>… <code>Hello!!</code>が返ってくる</span></div>
  <div><code>GET /greeting-me?name=taro</code> <span>… <code>Hello, taro</code>が返ってくる</span></div>
  <div><code>POST /auth</code> <span>… パスワードがあっているか答える</span></div>
</div>

<div class="note">
だんだん「情報を渡す」ようになっていきます
</div>

---

## 進め方は、3つとも同じです

<div class="steps">
  <div><span class="step">1</span> <strong>サーバー側</strong>にAPIを書く</div>
  <div class="on"><span class="step">2</span> <strong>ブラウザのURL直打ち</strong>で確かめる</div>
  <div><span class="step">3</span> <strong>ブラウザ側</strong>から叩くコードを書く</div>
  <div><span class="step">4</span> ボタンを押して確かめる</div>
</div>

<div class="note tight">
2番を挟むのが大事。動かないとき、<br>
<strong>サーバーとブラウザのどちらが原因か</strong>を自分で切り分けられます
</div>

---

## 今日さわるファイルは3つ

| ファイル | 今日の扱い |
| --- | --- |
| `public/api.js` | **新しく作る**。今日書くJSは全部ここ |
| `public/index.html` | `</body>`の直前に**足すだけ** |
| `server.js` | `return serveDir(`の**上に足すだけ** |

<div class="note tight">
<code>index.js</code>と<code>styles.css</code>は開きません
</div>

---

<!-- _class: big -->

昨日書き換えたものは
<span class="ng">消しません</span>
足していくだけです

---

## 最後に、もう一度公開します

<div class="row tight">
  <div class="browser">
    <div class="bar">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span class="barlabel">スマホ</span>
    </div>
    <div class="screen">
      <div class="big ok">Hello!!</div>
    </div>
  </div>
  <div class="arrowlabel">
    <span class="arrow">←</span>
    返事
  </div>
  <div class="cloud">
    <div class="body">自分のサーバー</div>
    <div class="caption">Deno Deploy</div>
  </div>
</div>

<div class="note tight">
ボタンを押すと、インターネットの向こう側が答えてくれます
</div>

---

<!-- _class: lead -->

# はじめましょう

READMEを開いてください
