---
marp: true
theme: uncover
size: 16:9
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

  /* 結論の枠のあとに続く一言は、枠から少し離す */
  section.point h2 + p + p {
    margin-top: 0.8em;
  }

  /* 見出しのなかで、いちばん言いたい一語だけを大きくする */
  section h2 .big {
    color: var(--color-highlight-heading);
    display: block;
    font-size: 1.5em;
    margin-top: 0.15em;
  }

  /* 説明や図をいっしょに置くスライドは、文字を小さくして1枚に収める */
  section.small ul,
  section.small ol {
    font-size: 0.7em;
  }

  section.small h2 {
    font-size: 1.5em;
  }

  section.small p {
    font-size: 0.72em;
  }

  /* 説明の1行目は、そのページで扱う項目名として目立たせる */
  section.small p strong {
    color: var(--color-highlight-heading);
  }

  /* 図が横に3つ並ぶスライドは、箇条書きも図の列に合わせて横に並べる */
  section.cols3 ol {
    display: grid;
    font-size: 0.56em;
    gap: 0 0.6em;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 auto 0.4em;
    width: 1000px;
  }

  /* 図のパネルと中心をそろえたいので、番号ごと列の中央に置く */
  section.cols3 ol > li {
    margin-bottom: 0;
    padding-left: 0;
    text-align: center;
  }

  section.cols3 ol > li::before {
    display: inline-block;
    margin-right: 0.5em;
    position: static;
    vertical-align: middle;
  }

  /* 説明の行は左ぞろえのほうが読みやすい */
  section.small li {
    margin-bottom: 0.7em;
    text-align: left;
  }

  section.small li strong {
    color: var(--color-highlight-heading);
  }

  /* 見出しのなかで、キーワードだけ色を変える */
  section h2 .key {
    color: var(--color-highlight-heading);
  }
---

<!-- _paginate: false -->

# 使いやすいUIデザイン

---

## この時間のゴール

1. **UIの役割を理解する**
2. **良いUIをつくるポイントを知る**

---

<!-- _class: small -->

## ハンズオン①　まずは自由に描こう

**お題：「アイスコーヒー（500円）を注文する画面」**<br>四角と文字だけでOK。いま思いつくままに描いてみましょう。

![height:300px](./imgs/fig-handson-1.svg)

---

<!-- _class: small -->

## UIとは<br>「ユーザーとサービスをつなぐ<span class="key">接点</span>」

![height:310px](./imgs/fig-interface.svg)

---

## 良いUI と 悪いUI の違い

- **悪いUI：「どこを押せばいいかわからない…」**
- **良いUI：「見た瞬間にすぐ操作できる！」**

---

<!-- _class: small -->

## よくある「悪いUI」の失敗パターン

**ボタンの位置がわからない**<br>「注文する」など重要なボタンが<br>小さかったり、目立つボタンとすり替わっていると見つけられない。

![height:355px](./imgs/fig-bad-button.svg)

---

<!-- _class: small -->

## よくある「悪いUI」の失敗パターン

**文字が小さく読みにくい**<br>フォントが極端に小さい、または背景色と同化していて読めない。

![height:340px](./imgs/fig-bad-text.svg)

---

<!-- _class: small -->

## よくある「悪いUI」の失敗パターン

**要素の詰め込みすぎ**<br>説明文やリンクを画面いっぱいに詰め込むと、どこが大事なのか分からなくなる

![height:350px](./imgs/fig-bad-crowded.svg)

---

<!-- _class: small -->

## 同じ注文画面でも、こんなに変わる

![height:345px](./imgs/fig-cafe-compare.svg)

---

<!-- _class: small -->

## 良いUIをつくるポイント

- 画面の見た目や要素の並び順を整えること
- 使いたい機能を、迷わずすぐ使えるようにする
- ユーザーに「どう操作すればいいか」を考えさせない

![height:265px](./imgs/fig-ui-design.svg)

---

<!-- _class: small -->

## 良いUIをつくるポイント①<span class="big">配置</span>

**いちばん押してほしいボタンを、大きく・目立つ場所に。**<br>「どこを押すの？」と探す時間をなくします。

![height:255px](./imgs/fig-point-layout.svg)

---

<!-- _class: small -->

## 良いUIをつくるポイント②<span class="big">文字</span>

**商品名と値段は、離れて見ても読める大きさに。**<br>背景と文字の色にメリハリをつけると、ぐっと読みやすくなります。

![height:255px](./imgs/fig-point-text.svg)

---

<!-- _class: small -->

## 良いUIをつくるポイント③<span class="big">並び順</span>

**関係のあるものは近づけて、ひとかたまりに。**<br>詰め込みすぎず、まわりに余白をとると迷わなくなります。

![height:255px](./imgs/fig-point-order.svg)

---

<!-- _class: small -->

## 配置・文字・並び順を意識すると、こうなる

![height:340px](./imgs/fig-cafe-answer.svg)

---

## 定番のレイアウトは<span class="big">どんどん真似していい</span>

---

<!-- _class: small -->

## なぜ定番の形を真似していいのか？

- 「戻る」や「メニュー」は、どのアプリもだいたい同じ場所にある
- 使い慣れた形なら、説明しなくても迷わず操作できる
- 独自の配置よりも、みんなが知っている形がいちばん親切

![height:300px](./imgs/fig-layouts.svg)

---

<!-- _class: small -->

## UI改善の第一歩は「ユーザー目線」

**初めて使う人の気持ちになる**

![height:350px](./imgs/fig-first-time.svg)

---

<!-- _class: small -->

## UI改善の第一歩は「ユーザー目線」

**チームメンバーに触ってもらう**

![height:355px](./imgs/fig-team-test.svg)

---

<!-- _class: small cols3 -->

## デザイン知識がなくてもできる3つの工夫

1. 余白をしっかり取る
2. 読みやすい色と文字
3. 視線の流れに合わせる

![width:1000px](./imgs/fig-three-tips.svg)

---

<!-- _class: small -->

## ハンズオン②<br>最初よりも意識して描いてみよう

**お題：「映画のチケットを予約する画面」**<br>配置・文字・並び順を意識して、新しいページに描いてみましょう。

![height:300px](./imgs/fig-handson-2.svg)

---

<!-- _class: point -->

## まとめ：迷わせないアプリを作ろう

UIデザインで一番重要なのは、<br>高度なテクニックではなく<br>「使う人への思いやり」です。

まずはチームの仲間と画面を見せ合いながら、<br>楽しく開発を進めていきましょう！
