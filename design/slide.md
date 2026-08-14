---
marp: true
theme: uncover
paginate: true
style: |
  /* 見出しは2行になっても、行の長さが揃うようにする */
  section h1,
  section h2 {
    letter-spacing: 1px;
    line-height: 1.25;
    text-wrap: balance;
  }

  section li {
    line-height: 1.5;
  }

  /* 見出しと本文、図のまわりの余白をそろえる */
  section h2 {
    margin: 0 0 0.5em;
  }

  section p:has(img) {
    margin: 0.5em 0 0;
  }

  /* 箇条書きは内容の幅で中央に置き、見出しと中心をそろえる */
  section ul,
  section ol {
    display: table;
    margin: 0 auto 0.3em;
  }

  /* ヘッダーがあるスライドは、上に余白を足して見出しとぶつからないようにする */
  section[data-header] {
    padding-top: 76px;
  }

  /* 箇条書きの点を、見出しと同じアクセントカラーの四角にする */
  section ul {
    list-style: none;
    padding-left: 0;
  }

  section ul > li {
    padding-left: 1.1em;
    position: relative;
  }

  section ul > li::before {
    background: var(--color-highlight-heading);
    border-radius: 3px;
    content: "";
    height: 0.36em;
    left: 0;
    position: absolute;
    top: 0.6em;
    width: 0.36em;
  }

  /* 番号は、丸バッジにして順序を目立たせる */
  section ol {
    counter-reset: item;
    list-style: none;
    padding-left: 0;
  }

  section ol > li {
    counter-increment: item;
    padding-left: 1.9em;
    position: relative;
  }

  section ol > li::before {
    background: var(--color-highlight-heading);
    border-radius: 50%;
    color: var(--color-background);
    content: counter(item);
    font-size: 0.6em;
    font-weight: 700;
    height: 1.65em;
    left: 0;
    letter-spacing: 0;
    line-height: 1.65em;
    position: absolute;
    text-align: center;
    top: 0.45em;
    width: 1.65em;
  }

  /* 目次は行間を広げる */
  section.agenda li {
    margin-bottom: 0.4em;
  }

  /* 章の扉は、見出しを大きくしてアクセントカラーの下線を引く */
  section.chapter h2 {
    font-size: 2.1em;
  }

  section.chapter h2::after {
    background: var(--color-highlight-heading);
    border-radius: 3px;
    content: "";
    display: block;
    height: 6px;
    margin: 0.45em auto 0;
    width: 2.2em;
  }

  /* 小節の扉は、章の扉より1段小さくして親子関係がわかるようにする */
  section.chapter.sub h2 {
    font-size: 1.5em;
  }

  /* 章の結論は、囲み枠にして「あとで戻ってくる場所」にする */
  section.point h2 {
    color: var(--color-header);
    font-size: 1.1em;
  }

  section.point h2 + p {
    background: var(--color-background-code);
    border: 3px solid var(--color-highlight-heading);
    border-radius: 12px;
    display: table;
    font-size: 1.35em;
    font-weight: 700;
    /* 見出しと同じ字間にしないと、中心がわずかにずれて見える */
    letter-spacing: 1px;
    line-height: 1.4;
    margin: 0 auto;
    padding: 0.7em 1em;
    text-wrap: balance;
  }

  /* 手を動かすスライドは、見出しの上にラベルを置いて説明と見分けられるようにする */
  section.exercise h3 {
    background: var(--color-highlight-heading);
    border-radius: 999px;
    color: var(--color-background);
    display: table;
    font-size: 0.6em;
    letter-spacing: 2px;
    margin: 0 auto 0.5em;
    padding: 0.2em 1.1em;
  }

  /* つくるアプリの仕様は、カードに入れて何度でも同じ形で見せる */
  section.spec ul {
    background: var(--color-background-code);
    border-left: 6px solid var(--color-highlight-heading);
    border-radius: 6px;
    display: table;
    font-size: 1.15em;
    padding: 0.6em 1.3em;
  }

  /* 仕様のどこに注目しているかを、色でも示す */
  section.spec li strong {
    color: var(--color-highlight-heading);
  }

  /* 仕様カードの上に置くラベル */
  section.spec h2 + p {
    font-size: 0.8em;
  }

  /* 見出しのなかで、いちばん言いたい一語だけを大きくする */
  section h2 .big {
    color: var(--color-highlight-heading);
    display: block;
    font-size: 1.5em;
    margin-top: 0.15em;
  }

  /* 図を並べる表は、罫線を消してラベルを控えめにする */
  section table > thead > tr > th {
    border-bottom: none;
    color: var(--color-header);
    font-size: 0.7em;
    font-weight: 400;
  }

  /* テキストと図を1行に並べ、余った幅をスライドの左右に均等に配る。
     bg right は図をパネル中央に固定するので、テキストとのあいだだけが空く */
  section.split {
    text-align: left;
  }

  section.split header {
    text-align: center;
  }

  section.split .cols {
    align-items: center;
    display: flex;
    gap: 56px;
    justify-content: center;
    width: 100%;
  }

  /* 行頭を揃えるため、左のテキストは1つの塊にする。
     幅を固定しないと、テキスト量の差で図の位置がスライドごとに動き、
     送ったときにガタつく。入りきらないときは flex が縮めてくれる */
  section.split .txt {
    width: 640px;
  }

  section.split .cols p:has(img) {
    margin: 0;
  }

  section.split h2 {
    font-size: 1.3em;
  }

  section.split ul,
  section.split ol {
    font-size: 0.95em;
    margin-left: 0;
  }

  section.split p {
    font-size: 0.95em;
  }

  /* リンクが多いスライドは、文字を小さくして1行に収める */
  section.small ul {
    font-size: 0.7em;
  }
---

# 使いやすいUIデザイン

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

---

<!-- _class: point -->

## この時間の目標

**チームで作るアプリの画面**を<br>自分で考えられるようになる

---

<!-- _class: agenda -->

## 今日は4本立て

1. UIとは
2. UIを作ってみる
3. UIデザインの流れ
4. ビジュアルデザイン

---

<!-- header: 1. UIとは -->
<!-- _class: chapter -->

## 1. UIとは

---

## 「UI ＝ 見た目」<br>**ではない**

**UI**と聞くと、<br>色や形を思い浮かべがち

---

## UIデザインと<br>ビジュアルデザインは別

![height:330px](./imgs/fig-ui-vs-visual.svg)

---

## **UI** ＝ **User Interface**

ユーザーと**サービス**の<br>**あいだ**にあるもの

![height:280px](./imgs/fig-interface.svg)

---

## その**あいだ**にあるのは、<br>この**2種類**

![height:420px](./imgs/fig-ui.svg)

---

<!-- header: 2. UIを作ってみる -->
<!-- _class: chapter -->

## 2. UIを作ってみる

---

<!-- _class: exercise spec -->

### ハンズオン ①

## 備品貸出アプリを考えてみよう！

学校の備品を借りるアプリ

- 備品の一覧を**見る**
- 備品の**名前と数を見る**
- 備品を**借りる**
- 借りた備品を**返す**

---

<!-- _class: split -->

<div class="cols">
<div class="txt">

## 機能から**直接**UIを作ると<br>使いにくい

</div>

![h:330](./imgs/fig-way-a.svg)

</div>

---

## ボタンを並べると**2タップ必要**

![height:410px](./imgs/fig-tap-a.svg)

---

## 備品を並べると**1タップ**

![height:480px](./imgs/fig-tap-b.svg)

---

## 同じ画面を**何枚も作らずに済む**

![height:470px](./imgs/fig-compare.svg)

---

<!-- _class: point -->

## 主役にした**備品**を<br>**オブジェクト**と呼ぶ

**オブジェクト**を決めてから、<br>画面を作る

LINEならトーク、Amazonなら商品

---

## **備品**を主役にしたから、<br>画面はこの2つになった

![height:360px](./imgs/fig-object-to-screen.svg)

---

<!-- header: 3. UIデザインの流れ -->
<!-- _class: chapter -->

## 3. UIデザインの流れ

![height:340px](./imgs/fig-flow.svg)

---

## **ビュー**はモノが見える場所、<br>**アクション**はモノにできること

![height:340px](./imgs/fig-bridge.svg)

---

<!-- header: 3.1 モノを決める -->
<!-- _class: chapter sub -->

## 3.1 モノを決める

仕様から**オブジェクト**を拾い出す

![height:180px](./imgs/fig-flow-step1.svg)

---

## モノには**情報**があり、<br>**できること**がある

- 持っている情報を**属性**という
- できることが**アクション**

---

## モノを拾い出す手順は3つ

1. 名詞に**線**を引く
2. 同じものを**まとめる**
3. **属性**と**アクション**に分ける

---

## 名詞に線を引くと、<br>**備品**だけが残る

![height:340px](./imgs/fig-extract-demo.svg)

---

<!-- _class: exercise -->

### ハンズオン ②

## 仕様に出てくる**名詞**を<br>書き出してみよう

スケッチブックに、思いつくものを全部（**1分**）

---

<!-- _class: split -->

<div class="cols">
<div class="txt">

## アクションは<br>**つくる・かえる・けす**

英語でCreate・Update・Delete

**見る**はアクションにしない。<br>押した先にあるのは画面だけ

</div>

![h:300](./imgs/fig-way-a.svg)

</div>

---

<!-- _class: split -->

<div class="cols">
<div class="txt">

## 備品は、属性3つと<br>アクション2つを持つ

- 属性は<br>**名前・数・借りているか**
- アクションは<br>**借りる・返す**

**つくる・けす**は、先生の仕事。<br>だから仕様になく、作らない

</div>

![h:440](./imgs/fig-item-object.svg)

</div>

---

<!-- header: 3.2 画面を決める -->
<!-- _class: chapter sub -->

## 3.2 画面を決める

モノが見える場所（**ビュー**）と、<br>その行き来（**ナビゲーション**）

![height:180px](./imgs/fig-flow-step2.svg)

---

## ビューは「**一覧**」と<br>「**詳細**」の2種類

| コレクションビュー（一覧） | シングルビュー（詳細） |
| --- | --- |
| ![height:380px](./imgs/fig-collection.svg) | ![height:380px](./imgs/fig-single.svg) |

---

## アクションは、そのモノが<br>見えている**ビュー**に置く

![height:380px](./imgs/fig-action-place.svg)

---

<!-- _class: split -->

<div class="cols">
<div class="txt">

## ナビゲーションは<br>ビュー同士の行き来

一覧から備品を選ぶと詳細へ。<br>詳細から戻ると一覧へ

オブジェクトが増えたら、<br>まず全部書き出してから削る

</div>

![h:380](./imgs/fig-item-navigation.svg)

</div>

---

<!-- header: 3.3 ならべ方を決める -->
<!-- _class: chapter sub -->

## 3.3 ならべ方を決める

**レイアウト**。色や飾りはつけず、<br>置き場所だけを描く（**ワイヤーフレーム**）

![height:180px](./imgs/fig-flow-step3.svg)

---

## 画面のならべ方には、<br>決まった型がある

| 一覧のならべ方 | 詳細のならべ方 |
| --- | --- |
| ![height:250px](./imgs/fig-layout-list.svg) | ![height:250px](./imgs/fig-layout-single.svg) |

---

<!-- _class: exercise -->

### ハンズオン ③

## 3ステップで、<br>描き直してみよう

1. **モノ**を決める
2. **画面**を決める
3. **ならべ方**を決める

新しいページに。<br>最初の絵は消さないでください

---

<!-- _class: split -->

<div class="cols">
<div class="txt">

## 答え: 備品貸出アプリの<br>レイアウト

- 備品が並ぶ<br>**コレクションビュー**
- 備品1つが見える<br>**シングルビュー**

最初の絵と、<br>見比べてみてください

</div>

![h:420](./imgs/fig-answer.svg)

</div>

---

<!-- header: 4. ビジュアルデザイン -->

## 見た目は、この**4つ**で<br>だいぶよくなる

- **近接**: 関係あるものを近づける
- **整列**: 端をそろえる
- **反復**: 同じものは同じ見た目にする
- **コントラスト**: 差をはっきりつける

---

## 見た目は、発明しない。<span class="big">真似る</span>

似たようなアプリを見て、<br>同じように置けばいい

---

<!-- header: "" -->

## まとめ

![height:440px](./imgs/fig-summary.svg)

---

## 明日から、自分のチームの<br>アプリでやる

仕様を書いたら、**名詞に線を引く**

それだけで、つくる画面が見えてくる

---

<!-- _class: small -->

## 出典・もっと知りたくなったら

- オブジェクト指向UIデザイン（今日の中核） <https://amzn.asia/d/4vxk6h5>
- ノンデザイナーズ・デザインブック（4つの原則） <https://amzn.asia/d/6LvdOd9>
- デジタル庁デザインシステム <https://design.digital.go.jp/>
- MaterialDesignGuidelines（レイアウトの型） <https://m3.material.io/>
- HumanInterfaceGuidelines <https://developer.apple.com/design/human-interface-guidelines>

