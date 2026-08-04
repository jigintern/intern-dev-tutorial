---
marp: true
theme: default
paginate: true
header: 'はじめてのDeno'
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
  table { font-size: 28px; }
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
  /* --- 図用 --- */
  .row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    margin-top: 50px;
  }
  .box {
    border: 4px solid #7b8794;
    border-radius: 16px;
    padding: 28px 36px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #3e4c59;
    min-width: 300px;
  }
  .box .label {
    font-size: 22px;
    font-weight: normal;
    color: #7b8794;
    display: block;
    margin-bottom: 18px;
  }
  .engine {
    background: #4dc0b5;
    border: none;
    color: #fff;
    border-radius: 12px;
    padding: 22px 28px;
    font-size: 28px;
    font-weight: bold;
    min-width: auto;
  }
  .inner {
    background: #f5f7fa;
    border-radius: 12px;
    padding: 18px 24px;
    font-size: 26px;
    color: #3e4c59;
    margin-top: 16px;
  }
  .arrow {
    font-size: 64px;
    color: #4dc0b5;
    font-weight: bold;
  }
  .dim { opacity: 0.35; }
  .goal {
    font-size: 56px;
    font-weight: bold;
    color: #0b8f82;
    margin: 30px 0;
  }
  /* --- ブラウザの形 --- */
  .browser {
    width: 380px;
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
    padding: 26px 22px;
    min-height: 130px;
  }
  /* --- PC（モニター）の形 --- */
  .pc { width: 380px; }
  .pc .monitor {
    border: 4px solid #7b8794;
    border-radius: 12px;
    padding: 26px 22px;
    background: #fff;
    min-height: 130px;
  }
  .pc .stand { width: 70px; height: 18px; background: #7b8794; margin: 0 auto; }
  .pc .base { width: 180px; height: 12px; background: #7b8794; border-radius: 0 0 8px 8px; margin: 0 auto; }
  .pc .caption { text-align: center; font-size: 20px; color: #52606d; margin-top: 14px; }
  .frame-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 46px;
    margin-top: 36px;
  }
  .logobox { text-align: center; }
  .logobox img { width: 150px; height: 150px; }
  .logobox .caption { font-size: 22px; color: #52606d; margin-top: 10px; }
  .rtlist { margin-top: 16px; }
  .rtlist div { font-size: 24px; color: #9aa5b1; line-height: 1.6; }
  .rtlist div.on { font-size: 30px; color: #0b8f82; font-weight: bold; }
  .titlelogo { width: 120px; height: 120px; margin-bottom: 10px; }
  .compact { margin-top: 18px; }
  .compact .browser, .compact .pc { width: 300px; }
  .compact .browser .screen, .compact .pc .monitor { min-height: 84px; padding: 18px 16px; }
  .compact .browser .bar { padding: 9px 12px; }
  .compact .engine { padding: 14px 18px; font-size: 24px; }
  .compact .inner { padding: 12px 16px; font-size: 22px; margin-top: 10px; }
  .compact .arrow { font-size: 48px; }
  .compact .pc .caption { font-size: 18px; margin-top: 10px; }
  .frame-row.mid { margin-top: 20px; }
  .mid .browser, .mid .pc { width: 340px; }
  .mid .browser .screen, .mid .pc .monitor { min-height: 104px; }
  .mid .pc .caption { margin-top: 10px; }
  .note.tight { margin-top: 16px; }
  .leadin {
    margin-top: 20px;
    font-size: 29px;
    font-weight: bold;
    color: #0b8f82;
  }
  .etclist { margin-top: 16px; }
  .etclist div {
    font-size: 22px;
    color: #3e4c59;
    line-height: 1.8;
  }
  .etclist strong { color: #0b8f82; }
  .etclist span { color: #7b8794; }
  .etclist div.etc { color: #9aa5b1; margin-top: 2px; }
  .ng {
    font-size: 66px;
    font-weight: bold;
    color: #e12d39;
  }
  .sidelist { text-align: left; }
  .sidelist div {
    font-size: 34px;
    font-weight: bold;
    color: #3e4c59;
    margin: 22px 0;
  }
  .sidelist div.on { color: #0b8f82; }
  .browsers {
    display: flex;
    justify-content: center;
    gap: 28px;
    margin-top: 70px;
  }
  .browsers span {
    border: 3px solid #cbd2d9;
    border-radius: 12px;
    padding: 26px 30px;
    font-size: 32px;
    font-weight: bold;
    color: #3e4c59;
  }
  .companies {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 20px;
    margin-top: 30px;
  }
  .companies span {
    border: 3px solid #cbd2d9;
    border-radius: 10px;
    padding: 14px 26px;
    font-size: 30px;
    font-weight: bold;
    color: #3e4c59;
  }
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: '' -->

<img class="titlelogo" src="./imgs/deno-logo.svg" alt="Deno">

# はじめてのDeno

---

## 今日のゴール

<br>

<div class="goal">スマホで<br>自分のWebアプリが見られる</div>

<div class="note">
インターネットに公開するところまでやります
</div>

---

<!-- _class: big -->

コードを書けるように
なる必要はありません

---

<!-- _class: chapter -->
<!-- _header: '' -->

# 1. Denoとは何か

---

<!-- _class: big -->

JavaScriptって、
**どこで動いていますか？**

---

## <span class="step">1</span> ブラウザの中で動いている

<div class="browsers">
  <span>Chrome</span>
  <span>Edge</span>
  <span>Safari</span>
  <span>Firefox</span>
</div>

<div class="note">
こういうアプリの中で、JavaScriptが動いています
</div>

---

## <span class="step">2</span> でも、これはただの文字です

```js
console.log("こんにちは");
```

<br>

**読んで、実行してくれる「仕組み」が別に必要。**

---

## <span class="step">3</span> その仕組みは、ブラウザの中にある

<div class="frame-row">
  <div class="browser">
    <div class="bar">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span class="barlabel">ブラウザ</span>
    </div>
    <div class="screen">
      <div class="engine">JSを動かす仕組み</div>
      <div class="inner">JavaScript</div>
    </div>
  </div>
</div>

<div class="note">
だから今までは、ブラウザがないと動かせなかった
</div>

---

## <span class="step">4</span> 取り出して、PCに置いたら？

<div class="frame-row">
  <div class="browser dim">
    <div class="bar">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span class="barlabel">ブラウザ</span>
    </div>
    <div class="screen">
      <div class="inner">JavaScript</div>
    </div>
  </div>
  <div class="arrow">→</div>
  <div class="pc">
    <div class="monitor">
      <div class="engine">JSを動かす仕組み</div>
    </div>
    <div class="stand"></div>
    <div class="base"></div>
    <div class="caption">あなたのPC</div>
  </div>
</div>

---

## <span class="step">5</span> それが「JavaScriptランタイム」

<div class="frame-row">
  <div class="pc">
    <div class="monitor">
      <div class="engine">JSを動かす仕組み</div>
      <div class="inner">JavaScript</div>
    </div>
    <div class="stand"></div>
    <div class="base"></div>
    <div class="caption">あなたのPC</div>
  </div>
  <div class="logobox">
    <img src="./imgs/deno-logo.svg" alt="Deno">
    <div class="rtlist">
      <div class="on">Deno</div>
      <div>Node.js</div>
      <div>Bun</div>
    </div>
    <div class="caption">今日使うのはDeno</div>
  </div>
</div>

---

<!-- _class: big -->
<!-- _backgroundColor: #f0fdfa -->

Denoとは

<br>

**「ブラウザの外で<br>JavaScriptを動かす道具」**

---

## ブラウザの中は、制限されている

<br>

<div class="frame-row compact">
  <div class="sidelist">
    <div>ブラウザで動くJSからは、</div>
    <div class="on">PCの機能をほとんど使えません</div>
  </div>
  <div class="browser">
    <div class="bar">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span class="barlabel">ブラウザ</span>
    </div>
    <div class="screen">
      <div class="inner">JavaScript</div>
    </div>
  </div>
</div>

<div class="note">
ファイルを開く、好きなところと通信する、など<br>
不便だからではなく、わざとそうしてあります（安全のため）
</div>

---

## PC上でなら、PCの機能を使えます

<div class="frame-row">
  <div class="pc">
    <div class="monitor">
      <div class="engine">JavaScript</div>
      <div class="inner">ファイル</div>
      <div class="inner">ネットワーク</div>
    </div>
    <div class="stand"></div>
    <div class="base"></div>
    <div class="caption">あなたのPC</div>
  </div>
  <div class="sidelist">
    <div>1. ファイル操作ができる</div>
    <div class="on">2. ネットワークを使える</div>
  </div>
</div>

<div class="note">
今日使うのは2番です<br>
なお、どちらも使うときは Deno が「許可していいですか？」と聞いてきます
</div>

---

## ネットワークが使えると

<div class="frame-row mid">
  <div class="pc">
    <div class="monitor">
      <div class="engine">送る側</div>
    </div>
    <div class="stand"></div>
    <div class="base"></div>
    <div class="caption">あなたのPC</div>
  </div>
  <div class="arrow">→</div>
  <div class="browser">
    <div class="bar">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span class="barlabel">ブラウザ</span>
    </div>
    <div class="screen">
      <div class="inner">受け取る側</div>
    </div>
  </div>
</div>

<div class="etclist">
  <div>・<strong>アクセスを待ち受けられる</strong><span> ＝ HTTPサーバー、バックエンドを立ち上げられる</span></div>
  <div>・<strong>他所のAPIに、相手側の設定に関係なく繋げる</strong><span> — ブラウザからだと弾かれることがある</span></div>
  <div>・<strong>HTTP以外の通信もできる</strong><span> — データベースに直接つなぐ、など</span></div>
  <div>・<strong>そのまま公開できる</strong><span> — 他の人にも見てもらえる</span></div>
  <div class="etc">etc...</div>
</div>

<div class="leadin">
一番上の「アクセスを待ち受けられる」を、このあと実際にやります
</div>

---

## Denoを使っている会社

<div class="companies">
  <span>Slack</span>
  <span>Spotify</span>
  <span>GitHub</span>
  <span>Stripe</span>
  <span>Netlify</span>
  <span>Supabase</span>
</div>

<div class="note">
たとえば <strong>Slack</strong> は、アプリの自動化を動かす仕組みにDenoを使っています
</div>

---

<!-- _class: big -->
<!-- _backgroundColor: #f0fdfa -->

後日のチーム開発でも
**Denoを使います**

---

## 1章のまとめ

<br>

- Denoは **ブラウザの外でJavaScriptを動かす道具**
- PC上でなら、ファイルやネットワークが使える
- だから、**自分のPCでサーバーを動かせる**

<br>

### 次は、実際に自分のPCに入れます

