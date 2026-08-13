---
marp: true
theme: jig
paginate: true
size: 16:9
---

<!--
============================================================================
  JavaScript を始めよう（勉強会スライド）
  ビルド: pnpm exec marp 2026/javascript-start/slide.md --html -o 2026/javascript-start/slide.html --allow-local-files
============================================================================
-->

<!-- _class: lead -->

# JavaScript を始めよう

---

## 今回のゴール

JavaScript（JS）の基本文法を、**まず説明で理解し、その場で動かして**身につけます。
変数から始めて、条件・繰り返し・関数・オブジェクト・非同期処理、最後は DOM 操作まで触ります。

- 値を変数に入れ、計算・比較・条件分岐ができる
- 繰り返しでまとめて処理し、関数で再利用できる
- オブジェクト／クラスでデータを整理し、非同期処理の考え方がわかる
- ページの要素をクリックで動かせる（DOM 操作）

---

## 今回の流れ

| 章 | テーマ | 学ぶこと |
| --- | --- | --- |
| 1 | JS を動かす & 読みやすく書く | `console.log`・変数/定数・コメント/命名 |
| 2 | 値を扱う | 算術・文字列・論理・比較 |
| 3 | 流れを制御する | if・三項演算子・配列・for・forEach |
| 4 | まとめて再利用する | 関数・オブジェクト・クラス |
| 5 | 一歩進んだ話 | 非同期処理・ブラウザ API |
| 6 | 動きをつける | DOM 操作・クリックイベント・アニメーション |

---

## 進め方

各トピックは **「説明」→「やってみよう」** の 2 枚組で進みます。

- **説明** … 仕組みと使いどころを、コードと図で理解する
- **やってみよう** … その場のコード欄で **▶ 実行**。書き換えて出力を見る

<span class="tag-write">記述</span> は自分で書く／書き換える課題、<span class="tag-verify">確認</span> は出力を見て動作を確かめる合図です。

<div class="note">

「やってみよう」のコード欄は **▶ 実行** で右側に `console.log(...)` の出力が下の黒い欄に出ます。
コード欄・出力欄は端をドラッグして大きさを変えられます。

</div>

---

<!-- _class: lead -->

# Chapter 1 JS を動かす & 読みやすく書く

console.log ・ 変数と定数 ・ コメント ・ JSDoc ・ 命名 ・ 字下げ

---

<!-- _class: tight -->

## 1-1. この章のゴール

まず JS を動かし、他人（未来の自分）が読めるコードの書き方を押さえます。

- `console.log` で値を出力できる
- **変数 `let`** と **定数 `const`** を使い分けられる
- コメント・命名・インデントで**読みやすく**書ける

---

<!-- _class: tight -->

## 1-2. Hello, World!

プログラムの結果を確かめる基本が、**コンソールへの出力**です。
`console.log(値)` を使うと、`( )` の中に渡した値がコンソールに表示されます。
書いた処理が思ったとおりに動いているかを確認する（デバッグする）ときに、最もよく使う道具です。

<div class="syntax">

**console.log の形**

```js
// カンマ区切りで複数まとめて出力できる
console.log(値1, 値2, ...);
```

文字（文字列）は `'...'` か `"..."` で囲みます。
</div>

---

<!-- _class: tight -->

## 1-2. やってみよう

新しい言語の第一歩は挨拶から。**▶ 実行**して、コンソールに文字が出るのを確かめましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
console.log('Hello, World!');
```

</div>

<span class="tag-verify">確認</span> 下の黒い欄に `Hello, World!` と出れば成功です。文字を書き換えて再実行してみましょう。

---

<!-- _class: tight -->

## 1-3. 変数と定数

値に名前をつけて保存する箱が**変数**です。`let` で宣言し、`=` で値を割り当てます。あとから
別の値に**入れ替え（再代入）**できます。

一方、**定数**は入れ替えできない箱。`const` で宣言し、再代入しようとするとエラーになります。

<div class="syntax">

```js
// 後で入れ替えできる
let 変数名 = 初期値;
// 入れ替え不可
const 定数名 = 値;
```

</div>

<div class="note">

**使い分け** まず `const` で書き、「後で変わる」ものだけ `let` に。古い `var` は使いません。
</div>

---

<!-- _class: tight -->

## 1-3. やってみよう

`let` は入れ替えでき、`const` はできない——**▶ 実行**して違いを確かめましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
let count = 0;
// let は入れ替えできる
count = count + 1;
console.log('count:', count);

const name = 'じぐ太郎';
console.log('name:', name);
// const は入れ替え不可。次の行のコメントを外すとエラーになる
// name = '別の名前';
```

</div>

<span class="tag-write">記述</span> 最後のコメント行（`// name = ...`）の `//` を外して再実行し、どんなエラーが出るか見てみましょう。

---

<!-- _class: tight -->

## 1-4. コメント

**コメント**はコードに書いても実行されない文です。処理の意図を残したり、一時的にコードを
無効化（デバッグ）するのに使います。

- `//` … その行の末尾までコメント
- `/** */` … **JSDoc**。関数などの説明を書く特別な形（次のスライド）

<div class="note">

**コメントはできるだけ残そう。** コードは書く時間より読まれる時間が長いもの。とくに「**なぜ**そうするか」を書くと、未来の自分やチームへの手紙になります（「何をしているか」はコード自身が語ります）。
</div>

---

<!-- _class: tight -->

## 1-4. やってみよう

コメントの行だけ実行されないことを、**▶ 実行**して確かめましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
console.log('この行は動く');
// console.log('この行はコメントなので動かない');
/* 複数行を
   まとめてコメントにもできる */
console.log('最後の行も動く');
```

</div>

---

<!-- _class: tight -->

## 1-5. JSDoc（関数の説明を書く）

`/** ... */` で書くコメントを **JSDoc** と呼び、おもに**関数の説明**に使います。`@param`（引数）・`@returns`（戻り値）などのタグを書くと、多くのエディタが**入力補完やヒント**を出してくれます。

<div class="syntax">

```js
/**
 * 2 つの数を足す
 * @param {number} a - 1 つ目の数
 * @param {number} b - 2 つ目の数
 * @returns {number} 合計
 */
function add(a, b) {
  return a + b;
}
```

</div>

<div class="aside">

関数は Chapter 4 で学びます。ここでは「こう書くと関数に説明を残せる」とだけ掴めば十分です。
</div>

---

<!-- _class: tight -->

## 1-6. 読みやすい名前

コードは**書く時間より読まれる時間の方が長い**もの。「この名前だけ見て意味が分かるか？」を基準に、中身が伝わる名前を付けます（変数は名詞、関数は動詞から）。

<div class="split side-wide">
<div class="split-main">

| 良い例 | 悪い例 |
| --- | --- |
| `let count = 0;` | `let a = 0;` |
| `function solveQuadratic()` | `function solve()` |
| `const isActive = true;` | `const flag = true;` |

</div>
<div class="split-side">

**よく使う接頭辞**

- `is` / `has` / `can` … 真偽（`isActive` `hasError`）
- `get` / `set` … 取得・設定（`getUser`）
- `handle` / `on` … イベント処理（`handleClick`）
- 複数形 … 配列（`users` `items`）

</div>
</div>

---

<!-- _class: tight -->

## 1-7. インデント（字下げ）

**インデント**は行頭の字下げのこと。`{ }` で囲まれたブロックの中を 1 段下げます。

JS はインデントが無くても動きますが、**処理のかたまり**が読み取りやすくなり、ミスにも気づきやすくなります。

<div class="syntax">

```js
function myFunc() {
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    // ブロックの中はさらに 1 段深く
    sum += i;
  }
  return sum;
}
```

</div>

---

<!-- _class: tight -->

## 1 章のまとめ

<div class="note">

**チェックポイント**

- `console.log` で値を出力できる
- `const` を基本に、変わるものだけ `let` を使える
- コメント・わかりやすい名前・インデントで読みやすく書ける
</div>

次は、数値や文字列など **いろいろな値を扱う** 方法へ進みます。

---

<!-- _class: lead break -->

# 休憩 5 分

<div class="timer-box" data-seconds="300">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

---

<!-- _class: lead -->

# Chapter 2 値を扱う

算術演算と Math ・ 文字列 ・ 論理演算と比較

---

<!-- _class: tight -->

## 2-1. この章のゴール

数値・文字列・真偽（true/false）といった**値**を、計算したり比べたりします。

- 四則演算と `Math` で計算できる
- 文字列を組み立て・加工できる
- 論理演算と比較で「条件のもと」を作れる

---

<!-- _class: tight -->

## 2-2. 算術演算

四則演算はほぼ数式どおり。割り算の**余り**は `%`（剰余）で求めます。

| 演算 | 記述 | 結果 |
| --- | --- | --- |
| 加法 | `1 + 2` | `3` |
| 減法 | `5 - 3` | `2` |
| 乗法 | `2 * 4` | `8` |
| 除法 | `10 / 4` | `2.5` |
| 剰余（余り） | `10 % 3` | `1` |

計算と代入をまとめる**代入演算子**や、1 ずつ増減する**インクリメント／デクリメント**もよく使います。

| 記述 | 意味 |
| --- | --- |
| `v += 2` | `v = v + 2` と同じ（`-=` `*=` `/=` も同様） |
| `x++` / `x--` | `x` を 1 増やす／減らす |

---

<!-- _class: tight -->

## 2-2. Math で高度な計算

絶対値・最大最小・べき乗・円周率・三角関数などは、組み込みオブジェクト **`Math`** から呼び出します。

| 用途 | 記述 | 結果 |
| --- | --- | --- |
| 絶対値 | `Math.abs(-3)` | `3` |
| 最大 / 最小 | `Math.max(3, 9, 1)` / `Math.min(3, 9, 1)` | `9` / `1` |
| 切り捨て | `Math.floor(3.7)` | `3` |
| 四捨五入 | `Math.round(3.5)` | `4` |
| べき乗 | `2 ** 10`（`Math.pow(2, 10)`） | `1024` |
| 円周率 | `Math.PI` | `3.141...` |
| 三角関数 | `Math.sin(x)` / `Math.cos(x)` / `Math.tan(x)` | （x はラジアン） |

<div class="aside">

ここにあるのは一例です。ほかにもたくさんの関数があるので、必要になったら MDN の `Math` を調べましょう。
</div>

---

<!-- _class: tight -->

## 2-2. やってみよう

四則・余り・`+=`・`Math` を **▶ 実行**して確かめましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
// 和 差 積 商 余り
console.log(1 + 2, 5 - 3, 4 * 2, 10 / 4, 10 % 3);
let v = 1;
// v = v + 5 と同じ
v += 5;
console.log('v =', v);
console.log('max/min:', Math.max(3, 9, 1), Math.min(3, 9, 1));
console.log('floor/round:', Math.floor(3.7), Math.round(3.5));
console.log('2の10乗:', 2 ** 10);
```

</div>

---

<!-- _class: tight -->

## 2-3. 文字列（よく使う操作）

文字列（`String`）には便利な操作がたくさんあります。`'jig.jp'` を例に見てみましょう。

| 操作 | 記述 | 結果 |
| --- | --- | --- |
| 長さ | `'jig.jp'.length` | `6` |
| 大文字化 | `'jig.jp'.toUpperCase()` | `'JIG.JP'` |
| 一部を取り出す | `'jig.jp'.slice(0, 3)` | `'jig'` |
| 1 文字取り出す | `'jig.jp'.charAt(1)` | `'i'` |
| 分割（配列に） | `'jig.jp'.split('.')` | `['jig', 'jp']` |
| 置き換え | `'jig.jp'.replace('jp', 'com')` | `'jig.com'` |
| 位置を探す | `'jig.jp'.indexOf('jp')` | `4` |

---

<!-- _class: tight -->

## 2-3. 連結とテンプレートリテラル

文字列をつなぐ・組み立てる方法です。

| 記述 | 結果・意味 |
| --- | --- |
| `'jig' + '.' + 'jp'` | `'jig.jp'`（`+` で連結） |
| `str += '!'` | `str` の末尾に追記（加算代入） |

**テンプレートリテラル**（バッククオート `` ` `` で囲む）なら、`${ }` の中に変数や式を埋め込めます。

<div class="syntax">

```js
const name = 'じぐ太郎';
// こんにちは、じぐ太郎 さん
console.log(`こんにちは、${name} さん`);
```

</div>

---

<!-- _class: tight -->

## 2-3. やってみよう

長さ・切り出し・分割・埋め込みを **▶ 実行**して確かめましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
const s = 'jig.jp';
// 6
console.log('長さ:', s.length);
console.log('大文字:', s.toUpperCase());
// jig
console.log('切り出し:', s.slice(0, 3));
// ['jig','jp']
console.log('分割:', s.split('.'));
// テンプレートリテラル
console.log(`こんにちは、${s} さん`);
```

</div>

---

<!-- _class: tight -->

## 2-4. 論理演算

複数の条件を組み合わせて、`true` / `false`（真偽値）を作る道具です。

| 演算 | 記述 | 例 → 結果 |
| --- | --- | --- |
| AND（かつ） | `a && b` | `true && false` → `false` |
| OR（または） | `a \|\| b` | `true \|\| false` → `true` |
| NOT（否定） | `!a` | `!true` → `false` |

<div class="aside">

`&&` は**両方が true** のときだけ true、`||` は**どちらかが true** なら true になります。
</div>

---

<!-- _class: tight -->

## 2-4. 比較演算子

2 つの値を比べて `true` / `false` を返します。等しいかの判定は、**型まで見る `===`（厳密等価）** を使います。

| 演算 | 記述 | 例 → 結果 |
| --- | --- | --- |
| 厳密等価 | `a === b` | `20 === 20` → `true` |
| 厳密不等価 | `a !== b` | `1 !== 2` → `true` |
| より大きい / 以上 | `a > b` / `a >= b` | `5 >= 5` → `true` |
| より小さい / 以下 | `a < b` / `a <= b` | `3 < 3` → `false` |

<div class="note">

`===` は**値と型の両方**を見ます。`'5' === 5` は `false`。型変換される `==` は予想外の挙動の元なので使いません（付録）。
</div>

---

<!-- _class: tight -->

## 2-4. やってみよう

論理演算と厳密等価を **▶ 実行**して確かめましょう。型が違う比較にも注目。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
console.log(true && false, true || false, !true);
const age = 20;
// true
console.log('18以上?', age >= 18);
// true
console.log('厳密等価:', age === 20);
// false（型が違う）
console.log("'5' === 5 :", '5' === 5);
```

</div>

---

<!-- _class: tight -->

## 2 章のまとめ

<div class="note">

**チェックポイント**

- 四則演算・`%`・`+=`・`Math` で計算できる
- 文字列の長さ・切り出し・分割、テンプレートリテラルが使える
- `&&`/`||`/`!` と `===` で条件を組み立てられる
</div>

次は、条件分岐と繰り返しで **処理の流れを制御** します。

---

<!-- _class: lead break -->

# 休憩 5 分

<div class="timer-box" data-seconds="300">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

---

<!-- _class: lead -->

# Chapter 3 流れを制御する

if で分岐 ・ 三項演算子 ・ 配列 ・ for ・ forEach

---

<!-- _class: tight -->

## 3-1. この章のゴール

「条件で分ける」「繰り返す」で、プログラムの流れを組み立てます。

- `if` / 三項演算子で**分岐**できる
- **配列**にデータを並べられる
- `for` / `forEach` で**繰り返し**処理できる

---

<!-- _class: tight -->

## 3-2. if で分岐する

評価の結果によって処理を分けるのが **if 文**です。`( )` の条件が真なら直後の `{ }` を実行し、
偽なら `else` 側へ。`else if` で条件を足せます。**上から順に**評価されるので条件の順番が大事です。

例として、時刻（`hour`）によって挨拶（おはよう／こんにちは／こんばんは）を変えてみます。

<div class="syntax">

```js
if (条件1) {
  条件1が真のときの処理
} else if (条件2) {
  条件2が真のときの処理
} else {
  どちらも偽のときの処理
}
```

</div>

---

<!-- _class: tight -->

## 3-2. やってみよう

<span class="tag-write">記述</span> `hour`（0〜23）を書き換えて **▶ 実行**し、3 つの挨拶すべてを出してみましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
// 今の時刻（0〜23）
const hour = 14;
if (hour < 12) {
  console.log('おはよう');
} else if (hour < 18) {
  console.log('こんにちは');
} else {
  console.log('こんばんは');
}
```

</div>

---

<!-- _class: tight -->

## 3-3. 三項演算子

条件で**値**を選びたいだけなら、`if` より短く 1 行で書ける**三項演算子**が便利です。

`条件 ? 真のときの値 : 偽のときの値` の形。ただし入れ子にしすぎると読みにくいので、複雑なら `if` に戻します。

<div class="syntax">

```js
const 結果 = 条件 ? 真のときの値 : 偽のときの値;
```

</div>

---

<!-- _class: tight -->

## 3-3. やってみよう

点数で合否を分けます。**▶ 実行**して、`score` を変えて結果が変わるのを確かめましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
const score = 72;
const result = score >= 60 ? '合格' : '不合格';
console.log(result);
```

</div>

---

<!-- _class: tight -->

## 3-4. 配列

複数の値を順番に並べる入れ物が**配列**です。`[ ]` で作り `,` で区切ります。

個々の値へは `配列[番号]` でアクセス。番号（**index**）は **0 から**始まります（先頭が 0 番）。
`.length` で個数、`.push(値)` で末尾に追加できます。

<div class="fig-row">
<svg width="640" height="130" viewBox="0 0 640 130" font-family="ui-sans-serif, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg">
  <text x="20" y="26" font-size="14" fill="#333">const fruits = ['りんご', 'みかん', 'ぶどう'];</text>
  <rect x="70" y="46" width="150" height="46" fill="#e8f0fe" stroke="#3f51b5" stroke-width="1.5"/>
  <text x="145" y="75" font-size="16" text-anchor="middle" fill="#1a237e">'りんご'</text>
  <text x="145" y="112" font-size="14" text-anchor="middle" fill="#e91e63">index 0</text>
  <rect x="220" y="46" width="150" height="46" fill="#e8f0fe" stroke="#3f51b5" stroke-width="1.5"/>
  <text x="295" y="75" font-size="16" text-anchor="middle" fill="#1a237e">'みかん'</text>
  <text x="295" y="112" font-size="14" text-anchor="middle" fill="#e91e63">index 1</text>
  <rect x="370" y="46" width="150" height="46" fill="#e8f0fe" stroke="#3f51b5" stroke-width="1.5"/>
  <text x="445" y="75" font-size="16" text-anchor="middle" fill="#1a237e">'ぶどう'</text>
  <text x="445" y="112" font-size="14" text-anchor="middle" fill="#e91e63">index 2</text>
  <text x="540" y="73" font-size="13" fill="#666">fruits[0]</text>
  <text x="540" y="90" font-size="13" fill="#666">→ 'りんご'</text>
</svg>
</div>

<div class="syntax">

```js
const arr = [10, 20, 30];
// 先頭（10）
arr[0]
// 個数（3）
arr.length
// 末尾に追加
arr.push(40)
```

</div>

---

<!-- _class: tight -->

## 3-4. やってみよう

アクセス・個数・追加を **▶ 実行**して確かめましょう（先頭は `0` 番）。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
const fruits = ['りんご', 'みかん', 'ぶどう'];
// りんご（0番）
console.log('先頭:', fruits[0]);
console.log('個数:', fruits.length);
// 末尾に追加
fruits.push('もも');
console.log(fruits);
```

</div>

---

<!-- _class: tight -->

## 3-5. for で繰り返す

同じ処理を何度も書くのは大変。**for 文**でまとめて繰り返します。

`for (初期化; 続ける条件; 毎回の更新)`。定番は `let i = 0; i < n; i++`（0 から n 回）。
例として **1 から 10 までの合計**を求めます。

<div class="syntax">

```js
for (let i = 0; i < 10; i++) {
  // i = 0,1,...,9 で本体を繰り返す
}
```

</div>

---

<!-- _class: tight -->

## 3-5. やってみよう

**▶ 実行**して 1 から 10 までの合計を求めます。範囲（`i <= 10`）を変えてみましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
let sum = 0;
for (let i = 1; i <= 10; i++) {
  // 1, 2, 3, … を足していく
  sum += i;
}
// 55
console.log('1から10までの合計:', sum);
```

</div>

---

<!-- _class: tight -->

## 3-6. forEach で一つずつ

配列の各要素を順に処理したいときは **`forEach`** が読みやすいです。

各要素を受け取る**関数（コールバック）**を渡すと、要素の数だけ順に呼ばれます。
index を気にせず書けるのが利点です。

<div class="syntax">

```js
配列.forEach((要素) => {
  // 各要素に対する処理
});
```

</div>

---

<!-- _class: tight -->

## 3-6. やってみよう

各要素が偶数か奇数かを **▶ 実行**して判定します。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
const nums = [3, 8, 15, 20];
nums.forEach((n) => {
  console.log(n, n % 2 === 0 ? '偶数' : '奇数');
});
```

</div>

<div class="aside">

`(n) => { ... }` が**コールバック関数**。「関数を値として渡す」書き方で、次章でくわしく扱います。
</div>

---

<!-- _class: tight -->

## 3 章のまとめ

<div class="note">

**チェックポイント**

- `if` / 三項演算子で分岐できる
- 配列に並べ、`length` や `push` を使える（index は 0 始まり）
- `for` / `forEach` で繰り返し処理できる
</div>

次は、処理に名前をつけて **まとめて再利用** します。

---

<!-- _class: lead break -->

# 休憩 5 分

<div class="timer-box" data-seconds="300">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

---

<!-- _class: lead -->

# Chapter 4 まとめて再利用する

関数 ・ 無名・アロー関数 ・ オブジェクト ・ Optional Chaining ・ クラス

---

<!-- _class: tight -->

## 4-1. この章のゴール

処理やデータに「名前」をつけて、まとめたり再利用したりします。

- **関数**で処理をまとめて呼び出せる
- **オブジェクト**で関連するデータをまとめられる
- **クラス**で設計図から実体を作れる

---

<!-- _class: tight -->

## 4-2. 関数

一連の処理に名前をつけ、何度でも呼び出せるのが**関数**です。`function` で定義し、
`( )` の**引数**で値を受け取り、`return` で**返り値**を返します。

実は `console.log()` も関数呼び出しの一種でした。

<div class="syntax">

```js
function 関数名(引数1, 引数2) {
  // 処理
  return 返り値;
}
// 呼び出し
関数名(値1, 値2);
```

</div>

---

<!-- _class: tight -->

## 4-2. やってみよう

足し算する関数を **▶ 実行**。引数を変えて何度でも呼び出せます。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
function add(a, b) {
  return a + b;
}
// 5
console.log(add(2, 3));
// 6
console.log(add(10, -4));
```

</div>

---

<!-- _class: tight -->

## 4-3. 無名関数・アロー関数

名前のない関数（**無名関数**）も書けます。特に短い **アロー関数** `(引数) => 処理` が頻出です。

JS では**関数も「値」**。変数に入れたり、他の関数へ**引数として渡す**（コールバック）ことができます。
`forEach` や `setTimeout` に渡していたのが、まさにこれです。

<div class="syntax">

```js
// アロー関数を変数へ
const square = (x) => x * x;
// 関数を引数として渡す
setTimeout(() => { ... }, 1000);
```

</div>

---

<!-- _class: tight -->

## 4-3. やってみよう

アロー関数と、関数を渡すコールバックを **▶ 実行**して確かめましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
// アロー関数を変数へ
const square = (x) => x * x;
// 25
console.log(square(5));

// 関数を引数として渡す（コールバック）
setTimeout(() => console.log('1秒後に実行'), 1000);
console.log('先に進む');
```

</div>

---

<!-- _class: tight -->

## 4-4. オブジェクト

関連する値を「**キー: 値**」の組（プロパティ）でまとめたのが**オブジェクト**。`{ }` で作ります。

アクセスは `obj.key`（ドット記法）または `obj['key']`（ブラケット記法）。
あとからプロパティを**追加**することもできます。

<div class="fig-row">
<svg width="440" height="132" viewBox="0 0 440 132" font-family="ui-sans-serif, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg">
  <text x="20" y="22" font-size="14" fill="#333">const user = { name: 'じぐ太郎', age: 20 }</text>
  <rect x="20" y="38" width="180" height="30" fill="#3f51b5"/>
  <text x="110" y="59" font-size="14" fill="#fff" text-anchor="middle">キー</text>
  <rect x="200" y="38" width="220" height="30" fill="#5c6bc0"/>
  <text x="310" y="59" font-size="14" fill="#fff" text-anchor="middle">値</text>
  <rect x="20" y="68" width="180" height="30" fill="#eceff1" stroke="#c5cae9"/>
  <text x="34" y="88" font-size="14" fill="#1a237e">name</text>
  <rect x="200" y="68" width="220" height="30" fill="#fff" stroke="#c5cae9"/>
  <text x="214" y="88" font-size="14" fill="#333">'じぐ太郎'</text>
  <rect x="20" y="98" width="180" height="30" fill="#eceff1" stroke="#c5cae9"/>
  <text x="34" y="118" font-size="14" fill="#1a237e">age</text>
  <rect x="200" y="98" width="220" height="30" fill="#fff" stroke="#c5cae9"/>
  <text x="214" y="118" font-size="14" fill="#333">20</text>
</svg>
</div>

<div class="syntax">

```js
const user = { name: 'じぐ太郎', age: 20 };
// アクセス
user.name
user['age']
// 追加
user.hobby = '釣り';
```

</div>

---

<!-- _class: tight -->

## 4-4. やってみよう

アクセスと追加を **▶ 実行**して確かめましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
const user = { name: 'じぐ太郎', age: 20 };
// ドット / ブラケット記法
console.log("user.name: "user.name;
console.log("user[age]: "user['age']);
// 後から追加できる
user.hobby = '釣り';
console.log(user);
```

</div>

---

<!-- _class: tight -->

## 4-5. Optional Chaining（?.）

存在しないプロパティは `undefined`。その**さらに先**をたどると**エラー**になります。

**Optional Chaining `?.`** を使うと、途中が無ければエラーにせず `undefined` を返して安全に止まります。
API の応答や、入力が任意のフォームなど「あるか分からない値」を扱うときに重宝します。

<div class="syntax">

```js
// a が無ければ undefined（.b でエラーにしない）
obj.a?.b
```

</div>

---

<!-- _class: tight -->

## 4-5. やってみよう

`?.` の有無で挙動がどう変わるか、**▶ 実行**して確かめましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
const user = { name: 'じぐ太郎' };
// 名前: じぐ太郎
console.log(`名前: ${user.name}`);
// 住所: undefined（存在しない）
console.log(`住所: ${user.address}`);

// console.log(user.address.city);

// 市区町村: undefined（?. なら安全）
console.log(`市区町村: ${user.address?.city}`);
```

</div>

---

<!-- _class: tight -->

## 4-6. クラス

同じ構造のデータと操作をまとめる**設計図**が**クラス**です。`class` で定義し、`new` で
**実体（インスタンス）**を作ります。

プロパティ（データ）とメソッド（関数）を持ち、メソッド内の `this` はそのインスタンス自身を指します。

<div class="syntax">

```js
class 名前 {
  プロパティ = 初期値;
  メソッド() { /* this.プロパティ で自分を参照 */ }
}
const 実体 = new 名前();
```

</div>

---

<!-- _class: tight -->

## 4-6. やってみよう

カウンターのクラスを **▶ 実行**。`new` で作った実体が状態（count）を持ちます。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
class Counter {
  count = 0;
  increment() { this.count++; }
}
const c = new Counter();
c.increment();
c.increment();
// 2
console.log('count:', c.count);
```

</div>

---

<!-- _class: tight -->

## 4 章のまとめ

<div class="note">

**チェックポイント**

- 関数で処理をまとめ、引数と返り値でやり取りできる
- 関数を値として渡せる（コールバック）
- オブジェクトでデータをまとめ、クラスで設計図から実体を作れる
</div>

いよいよ最後。時間のかかる処理を扱う **非同期** とブラウザ API です。

---

<!-- _class: lead break -->

# 休憩 5 分

<div class="timer-box" data-seconds="300">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

---

<!-- _class: lead -->

# Chapter 5 一歩進んだ話

同期と非同期 ・ setTimeout ・ Promise ・ async / await ・ ブラウザ API

---

<!-- _class: tight -->

## 5-1. この章のゴール

「時間のかかる処理」を上手に扱う**非同期処理**と、ブラウザの便利機能に触れます。

- 同期と非同期の違いがわかる
- `Promise` / `async` / `await` で待つ処理を書ける
- `localStorage` や位置情報などブラウザ API を知る

---

<!-- _class: tight -->

## 5-2. 同期と非同期

サーバーへの問い合わせなど**時間のかかる処理**を待つ間、他を止めないための考え方が非同期です。

<div class="fig-row">
<svg width="720" height="230" viewBox="0 0 720 230" font-family="ui-sans-serif, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="cbarrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#e91e63"/></marker>
  </defs>
  <text x="20" y="34" font-size="16" font-weight="bold" fill="#3f51b5">同期：終わるまで待つ（その間は止まる）</text>
  <rect x="40" y="46" width="90" height="34" rx="4" fill="#a5d6a7"/>
  <text x="85" y="68" font-size="13" text-anchor="middle" fill="#1b5e20">頼む</text>
  <rect x="130" y="46" width="360" height="34" rx="4" fill="#eceff1" stroke="#b0bec5"/>
  <text x="310" y="68" font-size="13" text-anchor="middle" fill="#607d8b">⏳ 返事を待つ（何もできない）</text>
  <rect x="490" y="46" width="150" height="34" rx="4" fill="#90caf9"/>
  <text x="565" y="68" font-size="13" text-anchor="middle" fill="#0d47a1">結果を使う</text>
  <text x="330" y="120" font-size="12" text-anchor="middle" fill="#e91e63">結果はあとで届く（コールバック）</text>
  <path d="M85 158 C 200 128, 460 128, 560 158" stroke="#e91e63" stroke-width="2" fill="none" stroke-dasharray="5 4" marker-end="url(#cbarrow)"/>
  <text x="20" y="150" font-size="16" font-weight="bold" fill="#3f51b5">非同期：頼んだら先に進む</text>
  <rect x="40" y="158" width="90" height="34" rx="4" fill="#a5d6a7"/>
  <text x="85" y="180" font-size="13" text-anchor="middle" fill="#1b5e20">頼む</text>
  <rect x="130" y="158" width="230" height="34" rx="4" fill="#90caf9"/>
  <text x="245" y="180" font-size="13" text-anchor="middle" fill="#0d47a1">先に別の作業を進める</text>
  <rect x="490" y="158" width="150" height="34" rx="4" fill="#ffe0b2" stroke="#fb8c00"/>
  <text x="565" y="180" font-size="13" text-anchor="middle" fill="#e65100">結果を処理</text>
</svg>
</div>

---

<!-- _class: tight -->

## 5-3. setTimeout

`setTimeout(関数, ミリ秒)` は「指定ミリ秒後に、この関数を実行して」と**予約**する仕組みです。

予約したらすぐ次の行に進む（＝非同期）ので、あとに書いた処理が先に動きます。出力の順番に注目。

<div class="syntax">

```js
// 1秒後の実行を予約し、すぐ次へ
setTimeout(() => { ... }, 1000);
```

</div>

---

<!-- _class: tight -->

## 5-3. やってみよう

順番が **A → B → C** になるのを **▶ 実行**して体感しましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
console.log('A: 開始');
setTimeout(() => console.log('C: 1秒後に実行'), 1000);
// 非同期なので C より先に出る
console.log('B: 待たずに次へ');
```

</div>

---

<!-- _class: tight -->

## 5-4. Promise（then / catch）

「あとで結果が返る**約束**」が `Promise`。料理を注文して**番号札**をもらうように、結果は後から届きます。

<div class="split side-wide">
<div class="split-main">

- Promise は **3 つの状態**を持つ
  - **pending**（待機）… まだ結果が出ていない
  - **fulfilled**（成功）… `resolve(値)` が呼ばれた
  - **rejected**（失敗）… `reject(理由)` が呼ばれた
- 受け取る側は **`.then(値 => …)`**（成功）と **`.catch(err => …)`**（失敗）で処理
- `.then()` は新しい Promise を返すので、**`.then().then()` と数珠つなぎ**にできる

</div>
<div class="split-side">
<svg viewBox="0 0 320 200" style="width: 100%; height: auto;" font-family="ui-sans-serif, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="pa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#607d8b"/></marker>
  </defs>
  <rect x="104" y="8" width="112" height="40" rx="8" fill="#eceff1" stroke="#b0bec5"/>
  <text x="160" y="26" font-size="13" text-anchor="middle" fill="#455a64">pending</text>
  <text x="160" y="41" font-size="11" text-anchor="middle" fill="#78909c">待機中</text>
  <line x1="120" y1="48" x2="78" y2="88" stroke="#607d8b" stroke-width="2" marker-end="url(#pa)"/>
  <text x="70" y="74" font-size="11" fill="#2e7d32">resolve(値)</text>
  <line x1="200" y1="48" x2="242" y2="88" stroke="#607d8b" stroke-width="2" marker-end="url(#pa)"/>
  <text x="206" y="74" font-size="11" fill="#c62828">reject(理由)</text>
  <rect x="8" y="92" width="128" height="42" rx="8" fill="#a5d6a7"/>
  <text x="72" y="110" font-size="13" text-anchor="middle" fill="#1b5e20">fulfilled</text>
  <text x="72" y="126" font-size="11" text-anchor="middle" fill="#1b5e20">成功</text>
  <rect x="184" y="92" width="128" height="42" rx="8" fill="#ef9a9a"/>
  <text x="248" y="110" font-size="13" text-anchor="middle" fill="#b71c1c">rejected</text>
  <text x="248" y="126" font-size="11" text-anchor="middle" fill="#b71c1c">失敗</text>
  <line x1="72" y1="134" x2="72" y2="160" stroke="#607d8b" stroke-width="2" marker-end="url(#pa)"/>
  <text x="72" y="178" font-size="12" text-anchor="middle" fill="#455a64">.then(値)</text>
  <line x1="248" y1="134" x2="248" y2="160" stroke="#607d8b" stroke-width="2" marker-end="url(#pa)"/>
  <text x="248" y="178" font-size="12" text-anchor="middle" fill="#455a64">.catch(err)</text>
</svg>
</div>
</div>

---

<!-- _class: tight -->

## 5-4. やってみよう

0.5 秒後に結果が返る `Promise` を `.then()` で受け取ります。**▶ 実行**すると「先に進む」が先に出ることにも注目。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
const wait = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve('完了！'), ms);
});
wait(500).then((msg) => console.log('then:', msg));
console.log('先に進む');
```

</div>

<span class="tag-verify">確認</span> 出力は「先に進む」→「then: 完了！」の順。この処理を次のスライドで `await` に書き直します。

---

<!-- _class: tight -->

## 5-5. async / await

`async` を付けた関数の中では **`await`** が使えます。`await 式` は、その `Promise` が解決するまで
**その行で待って**から次へ進みます。非同期を同期のように読めるのが利点です。

失敗は `try { ... } catch (e) { ... }` で受けます（`then/catch` の `catch` に相当）。

<div class="syntax">

```js
async function f() {
  // 解決を待ってから次へ
  const v = await 何かのPromise;
  // v を使う
}
```

</div>

---

<!-- _class: tight -->

## 5-5. やってみよう

**5-4 と同じ処理を `await` で書き直したもの**。出力は同じで、書き方だけが違います。**▶ 実行**して見比べましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="console">

```js
const wait = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve('完了！'), ms);
});
async function main() {
  const msg = await wait(500);
  console.log('await:', msg);
}
main();
console.log('先に進む');
```

</div>

<span class="tag-verify">確認</span> `.then((msg) => …)` が `const msg = await wait(500)` に変わっただけ。出力は 5-4 と同じです。

---

<!-- _class: tight -->

## 5-6. ブラウザ API

ブラウザ自身が持つ機能（API）も使えます。今日は代表的な 2 つを紹介します。

- **`localStorage`** … キーと値をブラウザに保存（ページを閉じても残る）。値は必ず**文字列**で保存される
- **位置情報（Geolocation）** … ユーザーの許可を得て、現在地の緯度・経度を取得できる

<div class="aside">

`localStorage.setItem('age', 20)` としても、取り出すと文字列 `'20'`。数値に戻すなら `Number(...)` を使います。
</div>

---

<!-- _class: tight -->

## 5-6. 手元で試す

この 2 つは**このスライドの実行環境では動きません**（安全のためストレージ・位置情報を制限）。
手元のブラウザの **Console** に貼って試してみましょう。

```js
// 保存と取り出し（値は必ず「文字列」で保存される）
localStorage.setItem('name', 'じぐ太郎');
console.log(localStorage.getItem('name'));

// 現在地の取得（ユーザーの許可が必要）
navigator.geolocation.getCurrentPosition((pos) => {
  console.log(pos.coords.latitude, pos.coords.longitude);
});
```

---

<!-- _class: tight -->

## 5 章のまとめ

<div class="note">

**チェックポイント**

- 同期と非同期の違いを説明できる
- `Promise`（then/catch）と `async`/`await` で待つ処理を書ける
- `localStorage` など、ブラウザ API の存在を知っている
</div>

---

<!-- _class: lead break -->

# 休憩 5 分

<div class="timer-box" data-seconds="300">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

---

<!-- _class: lead -->

# Chapter 6 動きをつける（DOM 操作）

要素の取得 ・ クリックイベント ・ 表示を変える ・ 見た目を変える ・ アニメーション

---

<!-- _class: tight -->

## 6-1. この章のゴール

これまでの JS を使って、ページ（HTML）をクリックで**動かして**みます。

- ページの要素を**取得**し、クリックを**イベント**として受け取る
- 文字や見た目を**書き換える**
- `transition` で変化を**なめらかに**見せる

---

<!-- _class: tight -->

## 6-2. 要素を取得してイベントを受け取る

ページの要素は `document.querySelector(セレクタ)` で取得します（セレクタは CSS と同じ書き方）。
取得した要素に `addEventListener('click', 関数)` を付けると、クリックのたびにその関数が呼ばれます。

<div class="fig-row">
<svg width="720" height="100" viewBox="0 0 720 100" font-family="ui-sans-serif, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="flowarrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#90a4ae"/></marker>
  </defs>
  <rect x="8" y="30" width="150" height="44" rx="6" fill="#e8f0fe" stroke="#3f51b5"/>
  <text x="83" y="50" font-size="13" text-anchor="middle" fill="#1a237e">① 要素を取得</text>
  <text x="83" y="67" font-size="11" text-anchor="middle" fill="#666">querySelector</text>
  <line x1="160" y1="52" x2="186" y2="52" stroke="#90a4ae" stroke-width="2" marker-end="url(#flowarrow)"/>
  <rect x="188" y="30" width="168" height="44" rx="6" fill="#e8f0fe" stroke="#3f51b5"/>
  <text x="272" y="50" font-size="13" text-anchor="middle" fill="#1a237e">② クリックを購読</text>
  <text x="272" y="67" font-size="11" text-anchor="middle" fill="#666">addEventListener</text>
  <line x1="358" y1="52" x2="384" y2="52" stroke="#90a4ae" stroke-width="2" marker-end="url(#flowarrow)"/>
  <rect x="386" y="30" width="140" height="44" rx="6" fill="#fce4ec" stroke="#e91e63"/>
  <text x="456" y="57" font-size="13" text-anchor="middle" fill="#880e4f">③ クリック！</text>
  <line x1="528" y1="52" x2="554" y2="52" stroke="#90a4ae" stroke-width="2" marker-end="url(#flowarrow)"/>
  <rect x="556" y="30" width="156" height="44" rx="6" fill="#e8f5e9" stroke="#43a047"/>
  <text x="634" y="50" font-size="13" text-anchor="middle" fill="#1b5e20">④ 関数を実行</text>
  <text x="634" y="67" font-size="11" text-anchor="middle" fill="#666">イベントハンドラ</text>
</svg>
</div>

<div class="syntax">

```js
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  // クリックされたときの処理
});
```

</div>

---

<!-- _class: tight -->

## 6-2. やってみよう

ボタンを押すたびにコンソールへ出力します。**▶ 実行**してボタンを押してみましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="dom" data-height="140">

```html
<button id="btn">押してね</button>
<script>
  const btn = document.querySelector('#btn');
  btn.addEventListener('click', () => {
    console.log('クリックされました');
  });
</script>
```

</div>

---

<!-- _class: tight -->

## 6-3. 表示を変える

取得した要素の `textContent` を書き換えると、画面の文字が変わります。

<div class="syntax">

```js
const out = document.querySelector('#out');
out.textContent = '新しい文字';
```

</div>

---

<!-- _class: tight -->

## 6-3. やってみよう

<span class="tag-write">記述</span> 押した回数を表示します。文言や増え方を書き換えて **▶ 実行** してみましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="dom" data-height="150">

```html
<button id="btn">カウント</button>
<p id="out"></p>
<script>
  let count = 0;
  const out = document.querySelector('#out');
  document.querySelector('#btn').addEventListener('click', () => {
    count++;
    out.textContent = count + ' 回押しました';
  });
</script>
```

</div>

---

<!-- _class: tight -->

## 6-4. 見た目を変える

`要素.style.プロパティ` で CSS も書き換えられます（プロパティ名は `backgroundColor` のようにキャメルケース）。

<div class="syntax">

```js
out.style.backgroundColor = '#ffcdd2';
```

</div>

---

<!-- _class: tight -->

## 6-4. やってみよう

押すたびに背景色が切り替わります。**▶ 実行**して試しましょう。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="dom" data-height="160">

```html
<style>
  #out {
    padding: 10px;
    border-radius: 6px;
  }
</style>
<button id="btn">押す</button>
<p id="out">ここが変わる</p>
<script>
  const colors = ['#ffcdd2', '#c8e6c9', '#fff9c4'];
  let n = 0;
  const out = document.querySelector('#out');
  document.querySelector('#btn').addEventListener('click', () => {
    n++;
    out.textContent = n + ' 回';
    out.style.backgroundColor = colors[n % 3];
  });
</script>
```

</div>

---

<!-- _class: tight -->

## 6-5. なめらかに動かす（transition）

CSS の `transition` を付けておくと、`style` で値を変えたとき**なめらかに**変化します。

<div class="syntax">

```css
#box {
  /* すべての変化を 0.3 秒でなめらかに */
  transition: all 0.3s ease;
}
```

</div>

---

<!-- _class: tight -->

## 6-5. やってみよう

ボタンを押すと箱が四隅を移動します。`transition` のおかげでスッと動きます。**▶ 実行**。

<div class="timer-box" data-seconds="120">
  <button class="timer-btn" data-delta="-60">−</button>
  <div class="timer"></div>
  <button class="timer-btn" data-delta="60">＋</button>
</div>

<div class="playground" data-mode="dom" data-height="260">

```html
<style>
  #field {
    position: relative;
    width: 220px;
    height: 220px;
    border: 2px solid #999;
  }
  #box {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    background: #f06292;
    color: #fff;
    display: grid;
    place-content: center;
    transition: all 0.3s ease;
  }
</style>
<button id="btn">動かす</button>
<div id="field"><div id="box">0</div></div>
<script>
  let i = 0;
  const box = document.querySelector('#box');
  document.querySelector('#btn').addEventListener('click', () => {
    i++;
    box.textContent = i % 4;
    box.style.top  = [0, 1].includes(i % 4) ? '0' : '140px';
    box.style.left = [0, 3].includes(i % 4) ? '0' : '140px';
  });
</script>
```

</div>

---

<!-- _class: tight -->

## 6 章のまとめ

<div class="note">

**チェックポイント**

- `querySelector` で要素を取得し、`addEventListener('click', ...)` でクリックを受け取れる
- `textContent` / `style` でページの表示・見た目を書き換えられる
- `transition` で変化をなめらかに見せられる
</div>

HTML（構造）× CSS（見た目）× JavaScript（動き）で、ページが動くようになりました。

---

<!-- _class: lead -->

# 完成 🎉

---

<!-- _class: tight -->

## 学んだことを振り返る

小さな部品が出そろいました。あとはこれらを**組み合わせる**だけで、アプリが作れます。

- **値と変数** … 数値・文字列・真偽を変数／定数に持つ
- **制御** … 条件（if・三項）と繰り返し（for・forEach）
- **まとめる** … 関数・オブジェクト・クラス
- **非同期** … Promise・async/await で「待つ」処理
- **DOM 操作** … 要素を取得し、クリックで表示・見た目を変える

---

<!-- _class: tight -->

## お疲れさまでした

今日触れなかった機能もたくさんあります。作りながら調べて足していきましょう。

- MDN Web Docs（JavaScript）: <https://developer.mozilla.org/ja/docs/Web/JavaScript>
- JS Primer: <https://jsprimer.net/>

<!--
  ↓ 演習タイマーの実装。題材を問わずそのまま使う。触らないでください。
  各スライドに <div class="timer-box" data-seconds="秒数">…</div> を置くと右上にタイマーが出ます。
  クリックで開始/停止、右クリックでリセット、± ボタンで 60 秒単位の増減。
-->
<script>
document.querySelectorAll('.timer-box').forEach(box => {
  const el = box.querySelector('.timer');
  const initial = Number(box.dataset.seconds);
  let remain = initial;
  let id = null;

  const render = () => {
    const r = Math.max(remain, 0);
    const m = String(Math.floor(r / 60)).padStart(2, '0');
    const s = String(r % 60).padStart(2, '0');
    el.textContent = `${m}:${s}`;
    el.classList.toggle('warn', remain <= 60 && remain > 0);
    el.classList.toggle('done', remain <= 0);
  };
  const stop = () => { clearInterval(id); id = null; el.classList.remove('running'); };
  const start = () => {
    if (remain <= 0) return;
    el.classList.add('running');
    id = setInterval(() => {
      remain--;
      render();
      if (remain <= 0) stop();
    }, 1000);
  };

  el.addEventListener('click', () => {
    if (remain <= 0) { el.classList.remove('done'); return; }
    id ? stop() : start();
  });
  el.addEventListener('contextmenu', e => {
    e.preventDefault();
    stop();
    remain = initial;
    render();
  });
  box.querySelectorAll('.timer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      remain = Math.max(0, remain + Number(btn.dataset.delta));
      render();
    });
  });
  render();
});
</script>

<!--
  ↓ コードブロックにコピーボタンを付ける。題材を問わずそのまま使う。触らないでください。
  各 <pre> の右上に「コピー」が出て、コード全文をクリップボードにコピーします（@@ ハイライトの記号は含まれません）。
-->
<script>
document.querySelectorAll('pre').forEach(pre => {
  if (pre.closest('.playground')) return; // playground の pre は非表示（編集欄に置き換える）のでコピー不要
  const code = pre.querySelector('code');
  if (!code) return;
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.type = 'button';
  btn.textContent = 'コピー';
  btn.addEventListener('click', async () => {
    const text = code.textContent;
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    btn.textContent = 'コピーしました';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'コピー';
      btn.classList.remove('copied');
    }, 1200);
  });
  pre.appendChild(btn);
});
</script>

<!--
  ↓ インライン playground（その場で試せるミニ実行環境）。題材を問わずそのまま使う。触らないでください。
  スライド本文に次のように書くと、編集→実行できる小さな実行環境になります（詳細は TEMPLATE_GUIDE.md）:

    <div class="playground" data-mode="console">

    ```js
    console.log("hello");
    ```

    </div>

  data-mode="console"（既定）は console.log の出力を、data-mode="dom" は HTML の描画結果＋console を表示。
  data-height="120" で出力領域の高さ(px)を調整できます。コードは sandbox iframe（allow-scripts のみ）内で実行され、
  さらに CSP で外部通信を遮断しているため、スライド本体にも外部にも影響しません。
-->
<script>
(function () {
  const consoles = {}; // pgId -> 出力先要素

  const SHIM = `(function(){
    function fmt(v){
      if (typeof v === 'string') return v;
      if (v instanceof Error) return v.message;
      try { return JSON.stringify(v); } catch (e) { return String(v); }
    }
    function send(level, args){
      try { parent.postMessage({ __pg: window.__PG_ID, level: level,
        text: Array.prototype.map.call(args, fmt).join(' ') }, '*'); } catch (e) {}
    }
    ['log','info','warn','error'].forEach(function(k){
      var orig = console[k];
      console[k] = function(){ send(k === 'log' ? 'log' : k, arguments); if (orig) try { orig.apply(console, arguments); } catch(e){} };
    });
    window.addEventListener('error', function(e){ send('error', [e.message]); });
    window.addEventListener('unhandledrejection', function(e){
      send('error', ['Unhandled: ' + (e.reason && e.reason.message || e.reason)]); });
  })();`;

  document.querySelectorAll('.playground').forEach((pg, i) => {
    const code = pg.querySelector('code');
    if (!code) return;
    const source = code.textContent.replace(/\n$/, '');
    const mode = pg.dataset.mode === 'dom' ? 'dom' : 'console';
    const height = Number(pg.dataset.height) || (mode === 'dom' ? 160 : 120);
    const pgId = 'pg' + i;

    const bar = document.createElement('div');
    bar.className = 'pg-bar';
    const runBtn = document.createElement('button');
    runBtn.type = 'button'; runBtn.className = 'pg-run'; runBtn.textContent = '▶ 実行';
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button'; resetBtn.className = 'pg-reset'; resetBtn.textContent = '↺ リセット';
    bar.append(runBtn, resetBtn);

    const editor = document.createElement('textarea');
    editor.className = 'pg-editor';
    editor.value = source;
    editor.spellcheck = false;
    editor.rows = Math.min(Math.max(source.split('\n').length + 1, 8), 12);
    // bespoke は TEXTAREA 由来の keydown を既にスライド送りから除外するが、念のため二重に止める
    editor.addEventListener('keydown', e => e.stopPropagation());
    // コードは最初から編集可能。フォーカス前後で見た目・ボタン位置を一切変えない。

    const out = document.createElement('div');
    out.className = 'pg-out';
    out.hidden = true;
    const frame = document.createElement('iframe');
    frame.className = 'pg-frame';
    frame.setAttribute('sandbox', 'allow-scripts'); // 同一オリジン権限を与えない＝スライド本体に触れない
    if (mode === 'console') frame.classList.add('pg-frame-hidden');
    else frame.style.height = height + 'px';
    const con = document.createElement('div');
    con.className = 'pg-console';
    if (mode === 'console') con.style.maxHeight = height + 'px';
    consoles[pgId] = con;
    // 出力（プレビュー）の高さ調整バー。iframe を直接 resize すると iframe が pointer を
    // 奪って掴めないため、専用バーをドラッグして高さを変える（横方向の gutter と対）。
    const vgrip = document.createElement('div');
    vgrip.className = 'pg-vgrip';
    vgrip.title = 'ドラッグで高さを調整';
    out.append(frame, con, vgrip);
    // ドラッグ中の move/up は window で待つ（iframe 上で離しても確実に終了＝掴みっぱなし防止）。
    // Marp はスライドを SVG で拡大縮小表示するため、clientY（画面px）と style.height（スライド内px）の
    // 座標系が違う。pg の rect.width/offsetWidth でスケールを求め、ドラッグ量を割って換算する。
    let vDrag = false, vStartY = 0, vStartH = 0, vScale = 1;
    const vMove = e => {
      if (!vDrag) return;
      e.preventDefault();
      const h = Math.max(60, vStartH + (e.clientY - vStartY) / vScale);
      if (mode === 'dom') frame.style.height = h + 'px';
      else { con.style.height = h + 'px'; con.style.maxHeight = h + 'px'; }
    };
    const vEndDrag = () => {
      if (!vDrag) return;
      vDrag = false; pg.classList.remove('pg-vdragging');
      window.removeEventListener('pointermove', vMove);
      window.removeEventListener('pointerup', vEndDrag);
      window.removeEventListener('pointercancel', vEndDrag);
    };
    vgrip.addEventListener('pointerdown', e => {
      e.preventDefault(); e.stopPropagation();
      const target = (mode === 'dom' ? frame : con);
      vStartY = e.clientY;
      vStartH = parseFloat(target.style.height) || target.offsetHeight; // スライド内px（実寸）
      vScale = (pg.getBoundingClientRect().width / pg.offsetWidth) || 1; // 画面px / スライド内px
      vDrag = true;
      pg.classList.add('pg-vdragging');
      window.addEventListener('pointermove', vMove);
      window.addEventListener('pointerup', vEndDrag);
      window.addEventListener('pointercancel', vEndDrag);
    });

    // 実行前は右カラムにプレースホルダを出す。実行するとここが結果（out）に置き換わる。
    const hint = document.createElement('div');
    hint.className = 'pg-hint';
    hint.textContent = '▶ 実行 すると、ここに結果が出ます';
    // 左（コード）と右（結果）の境目。ドラッグで幅を変えられる。
    const gutter = document.createElement('div');
    gutter.className = 'pg-gutter';
    gutter.title = 'ドラッグで幅を調整';
    pg.append(editor, bar, out, hint, gutter); // 位置は CSS グリッドで固定（editor/bar=左, out/hint=右, gutter=境目）。

    const reset = () => {
      editor.value = source;
      out.hidden = true;
      hint.hidden = false;
      con.textContent = '';
      frame.removeAttribute('srcdoc');
    };
    const run = () => {
      const userCode = editor.value;
      con.textContent = '';
      out.hidden = false;
      hint.hidden = true;
      // CSP で iframe 内からの外部通信（fetch / XHR / WebSocket / 外部 img など）を遮断する。
      // 許可するのは inline script（SHIM とユーザーコード）と inline style（dom モードの描画）だけ。
      // ※ 将来 fetch や外部画像を使うレッスンを作るときは、この content を必要な分だけ緩める。
      const csp = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:";
      const head = '<!doctype html><meta charset="utf-8">'
        + '<meta http-equiv="Content-Security-Policy" content="' + csp + '">'
        + '<script>window.__PG_ID=' + JSON.stringify(pgId) + ';' + SHIM + '<\/script>';
      let srcdoc;
      if (mode === 'dom') {
        srcdoc = head + '<style>body{font-family:sans-serif;margin:8px;font-size:14px}<\/style>' + userCode;
      } else {
        srcdoc = head + '<script>try{\n' + userCode + '\n}catch(e){console.error(e&&e.message?e.message:e);}<\/script>';
      }
      frame.srcdoc = srcdoc;
    };

    runBtn.addEventListener('click', run);
    resetBtn.addEventListener('click', reset);

    // 境目のドラッグで左右カラムの幅を変える（--pg-left を書き換える）。
    let dragging = false;
    gutter.addEventListener('pointerdown', e => {
      e.preventDefault(); e.stopPropagation();
      dragging = true; pg.classList.add('pg-dragging');
      try { gutter.setPointerCapture(e.pointerId); } catch (_) {}
    });
    gutter.addEventListener('pointermove', e => {
      if (!dragging) return;
      e.stopPropagation();
      const rect = pg.getBoundingClientRect();
      const cs = getComputedStyle(pg);
      const inner = rect.width - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
      if (inner <= 0) return;
      let frac = (e.clientX - rect.left - (parseFloat(cs.paddingLeft) || 0)) / inner * 100;
      frac = Math.max(25, Math.min(80, frac)); // どちらのカラムも潰れないようにクランプ
      pg.style.setProperty('--pg-left', frac + '%');
    });
    const endDrag = e => {
      if (!dragging) return;
      dragging = false; pg.classList.remove('pg-dragging');
      try { gutter.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    gutter.addEventListener('pointerup', endDrag);
    gutter.addEventListener('pointercancel', endDrag);
  });

  window.addEventListener('message', e => {
    const d = e.data;
    if (!d || !d.__pg || !consoles[d.__pg]) return;
    const con = consoles[d.__pg];
    const line = document.createElement('div');
    line.className = 'pg-line pg-' + d.level;
    line.textContent = (d.level === 'error' ? '⚠ ' : '') + d.text;
    con.appendChild(line);
    con.scrollTop = con.scrollHeight;
  });
})();
</script>
