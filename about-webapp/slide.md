---
marp: true
paginate: true
size: 16:9
---
<style>
/* =========================================================
   デザイン方針
   ─ フラット・直角・細い罫線。装飾は最小限。
   ─ 3色は「画面・処理・保存」を指すときだけ使う。
     それ以外の分類に流用しない（意味が濁るため）。
        紺青 #17558f  画面
        煉瓦 #b8501e  処理
        深緑 #2c6b4f  保存
     場所を囲む枠（クライアント／サーバー）は黒。
     枠まで青にすると、枠そのものが画面を指しているように見える。
     見えない側／サーバー側の下地は #f2f1ed で統一。
   ─ 対比が目的の箇所は色ではなく強弱で表す。
   ========================================================= */
:root {
  --ink:   #1c2126;
  --sub:   #5c6570;
  --line:  #cdcac1;
  --paper: #ffffff;
  --view:  #17558f;
  --logic: #b8501e;
  --store: #2c6b4f;
}
section {
  /* 閲覧環境がダークモードでも配色が反転しないよう固定する */
  color-scheme: light;
  font-family: "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic UI", "Meiryo", sans-serif;
  background: var(--paper);
  color: var(--ink);
  /* 本文 40px は下限。これを守るために1枚の文字数を削る */
  padding: 40px 56px;
  font-size: 40px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  /* 内容のかたまりを縦の中央に置き、余白を上下に分けて配る。
     note ありのページは図を 420、note なしのページは 510〜560 にすると
     見出しの位置がほぼ同じところに来る。図を作るときはこの目安に合わせる。
     図の外側の余白は、見出しの margin-bottom と note の margin-top で
     どちらも 24px にそろえてある */
  justify-content: center;
}
/* 内容が高さを超えたとき、要素が押し潰されて文字が重なるのを防ぐ */
section > * { flex-shrink: 0; }
/* default テーマは見出しに独自の色を当てる。3色は画面・処理・保存の
   ためだけに使うと決めているので、見出しは黒に固定して意味を持たせない */
section h1 { font-size: 60px; font-weight: 700; margin: 0 0 26px; letter-spacing: -.01em; color: var(--ink); }
section h2 {
  font-size: 50px; font-weight: 700; margin: 0 0 24px; color: var(--ink);
  padding-bottom: 14px; border-bottom: 2px solid var(--line);
}
section h3 { font-size: 40px; font-weight: 700; margin: 0 0 12px; color: var(--sub); }
/* リンクも色を持たせない。3色は画面・処理・保存専用 */
section a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
section ul, section ol { margin: 0; }
/* 画像は <p> に包まれる。default テーマの p には下マージンが付くので、
   図と note のあいだに余分な空きができる。ここで消しておく */
section > p { margin: 0; }
section li { margin-bottom: 16px; }
section li::marker { color: var(--sub); }
strong { font-weight: 700; }
.view  { color: var(--view); }
.logic { color: var(--logic); }
.store { color: var(--store); }
/* 見出しを置かず1文だけを見せるページ。左端に寄せる理由がないので中央に */
.big  { font-size: 62px; font-weight: 700; line-height: 1.45; text-align: center; }
/* 補足でも 40px を下回らせない。小さくできないなら文を削る */
.sub  { color: var(--sub); font-size: 40px; }
.note {
  border-top: 2px solid var(--ink);
  margin-top: 24px; padding-top: 14px;
  font-size: 40px; line-height: 1.5; color: #414851;
}
/* 定義や結論を1行で見せる。囲みは使わない。
   見出しには下線が、note には上線が入るので、そのあいだに枠を置くと
   1枚に線が3本並んで、どれが本文なのか分からなくなる。

   中央寄せにはしない。見出しのあるページで使うクラスなので、
   本文だけ中央に置くと見出し・note と左端がそろわない。
   （.big は中央寄せでよい。あちらは見出しのないページ用） */
.lead { font-size: 54px; font-weight: 700; line-height: 1.45; }
/* 章の結論。罫線で囲って他のスライドと見分けがつくようにする。
   note を置かないページ（2枚目の目標）でだけ使う。
   note と併用すると線が3本になる */
.point {
  border: 3px solid var(--ink);
  padding: 30px 32px;
  font-size: 54px; font-weight: 700; line-height: 1.45;
}
/* ---------- 横並び ---------- */
.cols { display: flex; gap: 22px; align-items: stretch; margin: 6px 0; }
.col  { flex: 1; min-width: 0; }
.box {
  border: 2px solid var(--line);
  padding: 24px 22px;
  font-size: 40px;
  line-height: 1.5;
}
.box .label { font-size: 44px; font-weight: 700; display: block; margin-bottom: 10px; }
.box.b-view  { border-color: var(--view); }
.box.b-view  .label { color: var(--view); }
.box.b-logic { border-color: var(--logic); }
.box.b-logic .label { color: var(--logic); }
.box.b-store { border-color: var(--store); }
.box.b-store .label { color: var(--store); }
/* 脇役は色を使わず、グレーで沈める */
.box.mute { border-color: var(--line); background: #f2f1ed; }
.box.mute .label { color: var(--sub); }
/* ---------- 第1章の締めで、見せた4枚をもう一度並べる ---------- */
.recap4 { display: flex; gap: 18px; margin-top: 44px; }
.recap4 .item { flex: 1; min-width: 0; }
.recap4 img { display: block; width: 100%; height: auto; margin: 0;
  border: 1px solid var(--line); background: #ffffff; }
/* ここだけ 40px 下限を外している。4枚並べると1枚あたり255pxしかなく、
   「ネットショップ」が40pxでは入らない。読ませる文ではなく、
   一度見たものの名前を思い出すためのラベルなので 34px */
.recap4 .cap { font-size: 34px; text-align: center; color: var(--sub); margin-top: 10px; }
/* ---------- 表 ----------
   default テーマは section table に display:block / width:max-content /
   偶数行の縞模様 を当てている。放置すると
     ・表が内容なりの幅で止まり width:100% が効かない
     ・table-layout:fixed が働かず列幅を制御できない
     ・意図しないグレーの縞が入る
   ため、ここで明示的に打ち消す */
.tablewrap { width: 100%; }
section table {
  display: table;
  font-size: 40px; border-collapse: collapse;
  width: 100%; table-layout: fixed; margin: 0;
}
section table tr,
section table tr:nth-child(2n) { background-color: transparent; border-top: none; }
section th, section td {
  border: 1px solid var(--line); padding: .35em .5em;
  text-align: left; overflow-wrap: break-word;
}
section th { background: #f2f1ed; font-weight: 700; }
section tbody th { background: #f7f6f3; font-weight: 400; }
.c-view  { color: var(--view);  font-weight: 700; }
.c-logic { color: var(--logic); font-weight: 700; }
.c-store { color: var(--store); font-weight: 700; }
/* ---------- タイトル・章扉 ---------- */
section.title { border-top: 10px solid var(--ink); justify-content: center; }
section.title h1 { font-size: 60px; margin-bottom: 20px; }
section.chapter { justify-content: center; }
section.chapter h1 { font-size: 54px; margin: 0; }
section.chapter .sub { margin-top: 22px; }
/* CHAPTER 2 のような記号ラベルは読ませる文ではないので 40px 制約の対象外 */
section.chapter .num {
  color: var(--sub); font-size: 28px; font-weight: 700;
  letter-spacing: .24em; margin-bottom: 16px;
  font-family: ui-monospace, "SF Mono", monospace;
}
/* ---------- 画像 ---------- */
section.pic { padding: 36px; justify-content: center; align-items: center; }
section.pic h3 { color: var(--ink); font-size: 40px; margin: 0 0 20px; text-align: center; }
/* 透過PNGが暗い環境で潰れないよう下地を白にする。図は本文幅の中央に置く */
img { background: #ffffff; display: block; margin: 0 auto; max-width: 100%; }
/* Marp は本文の絵文字を <img class="emoji"> に置き換える。
   上の img 指定が効くと block になって単独の行に落ちるので、ここで戻す。
   （図の中の絵文字は SVG の <text> なので、この影響を受けない） */
img.emoji {
  display: inline; margin: 0; background: none;
  height: 1em; width: auto; vertical-align: -0.15em;
}
section.pic img { max-height: 470px; border: 1px solid var(--line); }
section.title footer, section.chapter footer { display: none; }
section::after { color: var(--sub); font-size: 16px; }
</style>

<!-- _class: title -->

# Webアプリケーション概論

<span class="sub">jig.jp インターン 初日</span>

---

## この1時間の目標

<div class="point">
2週間でつくる<strong>Webアプリケーション</strong>が<br>
どんなものなのか、<strong>イメージをつかむ！</strong>
</div>

---

## わからないときは、授業スレへ

![](imgs/fig-thread.svg)

---

## 今日は3本立て

1. Webアプリケーションとは**何か**
2. どんな**仕組み**で動いているのか
3. 作るために**必要なもの**

---

<!-- _class: chapter -->

<div class="num">CHAPTER 1</div>

# Webアプリケーションとは何か

---

<div class="big">
Webアプリケーションとは<br>ブラウザの中で動くアプリケーション
</div>

<div class="note">
<strong>ブラウザ</strong>＝ Chrome、Safari、Edge など
</div>

---
<div class="big">
スマホの中に入ってる<br><strong>アプリ</strong>とのちがいは？
</div>

---

## ちがい① どうやって手元に届くか

![](imgs/fig-native-vs-web.svg)

<div class="note">
<strong>サーバー</strong>＝ 頼まれたものを渡してくれるコンピュータ
</div>

---
<div class="big">
<strong>Webサイト</strong>とのちがいは？
</div>

---

## ちがい② 読むだけか、操作できるか

![](imgs/fig-site-vs-app.svg)

---
<div class="big">
どんなものがある？
</div>

---

<!-- _class: pic -->

### 動画配信

![height:470](imgs/youtube.png)

---

<!-- _class: pic -->

### ネットショップ

![height:470](imgs/amazon.png)

---

<!-- _class: pic -->

### 地図

![height:470](imgs/google-map.png)

---

<!-- _class: pic -->

### ゲーム

![height:470](imgs/game.png)

---
<div class="big">
これ、ぜんぶ<br><strong>Webアプリケーション</strong>
</div>

<div class="recap4">
<div class="item"><img src="imgs/youtube.png"><div class="cap">動画配信</div></div>
<div class="item"><img src="imgs/amazon.png"><div class="cap">ネットショップ</div></div>
<div class="item"><img src="imgs/google-map.png"><div class="cap">地図</div></div>
<div class="item"><img src="imgs/game.png"><div class="cap">ゲーム</div></div>
</div>

---

<!-- _class: chapter -->

<div class="num">CHAPTER 2</div>

# どんな仕組みで動いているのか

---

## Webアプリケーションには、3つの役割がある

![](imgs/fig-three-parts.svg)

---
## この3つ、実は2つに分けられる

![](imgs/fig-three-parts-grouped.svg)

---

## Webアプリケーションの仕組み

![](imgs/fig-two-places.svg)

---
## YouTube だと

![](imgs/fig-youtube-inside.svg)

---

## YouTube で、コメントを送ったとき

![](imgs/fig-youtube-scene.svg)

---

## こう動く

![](imgs/fig-comment-flow.svg)

<div class="note">
保存されることで、<strong>ほかの人にも共有できる</strong>。
</div>

---

## もしも、、、

![](imgs/fig-if-not-split.svg)

---
<div class="big">
だから、2つに分けてある
</div>

![](imgs/fig-split.svg)

---

## 3層クライアントサーバーシステム

![](imgs/fig-3tier.svg)

---

<!-- _class: chapter -->

<div class="num">CHAPTER 3</div>

# 作るために必要なもの

---
## 今回使う言語は、主にこの3つ！

![](imgs/fig-three-languages.svg)

<div class="note">
<strong>JavaScript</strong> は、画面側でもサーバー側でも使います。
</div>

---
## 書いたものを動かすのは

![](imgs/fig-runtime.svg)

<div class="note">
<strong>Deno</strong> は、サーバー側で JavaScript を動かすものです。
</div>

---

## 今回つかう技術

![](imgs/fig-js-both.svg)

<div class="note">
画面は <strong>ブラウザ</strong>、サーバー側は <strong>Deno</strong> が動かします。
</div>

---

## <span class="c-view">画面</span> は、この3つでつくる

![](imgs/fig-html-css-js.svg)

---

## <span class="c-store">保存</span> は、Deno KV に

![](imgs/fig-data-kv.svg)

<div class="note">
<strong>Deno KV</strong> は Deno に入っている<strong>データベース</strong>です。
</div>

---

## まとめ

![](imgs/fig-summary.svg)

---

<!-- _class: title -->
<!-- _paginate: false -->

# 質疑応答

<span class="sub">授業スレに来ているものから見てみます！<br>メンターが空いたタイミングで適宜返信していくので、<br>授業後に書いてもらっても大丈夫です◎</span>

---

## 参考

- [ウェブのしくみ（MDN）](https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)
- [ウェブアプリケーションとは?（AWS）](https://aws.amazon.com/jp/what-is/web-application/)
- [Web三層構造の図解](https://kitsune.blog/web-system-structure)

---
## インターンのあとで

![](imgs/fig-other-stacks.svg)

