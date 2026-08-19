---
marp: true
paginate: true
size: 16:9
---
<style>
/* 3色は「クライアント・サーバー・データ」専用。場所を囲む枠は黒 */
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
  color-scheme: light;
  font-family: "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic UI", "Meiryo", sans-serif;
  background: var(--paper);
  color: var(--ink);
  padding: 40px 56px;
  /* 40px は本文の下限。守れないなら文字数を削る */
  font-size: 40px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
section > * { flex-shrink: 0; }
section h1 { font-size: 60px; font-weight: 700; margin: 0 0 26px; letter-spacing: -.01em; color: var(--ink); }
section h2 {
  font-size: 50px; font-weight: 700; margin: 0 0 24px; color: var(--ink);
  padding-bottom: 14px; border-bottom: 2px solid var(--line);
}
section h3 { font-size: 40px; font-weight: 700; margin: 0 0 12px; color: var(--sub); }
section a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
section ul, section ol { margin: 0; }
section > p { margin: 0; }
section li { margin-bottom: 16px; }
section li::marker { color: var(--sub); }
strong { font-weight: 700; }
.view  { color: var(--view); }
.logic { color: var(--logic); }
.store { color: var(--store); }
.big  { font-size: 62px; font-weight: 700; line-height: 1.45; text-align: center; }
.sub  { color: var(--sub); font-size: 40px; }
.note {
  border-top: 2px solid var(--ink);
  margin-top: 24px; padding-top: 14px;
  font-size: 40px; line-height: 1.5; color: #414851;
}
.lead { font-size: 54px; font-weight: 700; line-height: 1.45; }
.point {
  border: 3px solid var(--ink);
  padding: 30px 32px;
  font-size: 54px; font-weight: 700; line-height: 1.45;
}
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
.box.mute { border-color: var(--line); background: #f2f1ed; }
.box.mute .label { color: var(--sub); }
/* 項目が長い箱を詰めて表示する（40px を守れないときだけ） */
.box.tight { font-size: 30px; line-height: 1.4; padding: 18px 18px; }
.box.tight .label { font-size: 34px; margin-bottom: 8px; }
/* 手順など項目が多いスライド用。40px を守れないときだけ使う */
.small { font-size: 32px; line-height: 1.45; }
.small li { margin-bottom: 10px; }
.small .note { font-size: 32px; }
.small table { font-size: 32px; }
.small th, .small td { padding: .28em .5em; }
.recap4 { display: flex; gap: 18px; margin-top: 44px; }
.recap4 .item { flex: 1; min-width: 0; }
.recap4 img { display: block; width: 100%; height: auto; margin: 0;
  border: 1px solid var(--line); background: #ffffff; }
.recap4 .cap { font-size: 34px; text-align: center; color: var(--sub); margin-top: 10px; }
/* default テーマの table 指定（display:block / max-content / 縞模様）を打ち消す */
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
section.title { border-top: 10px solid var(--ink); justify-content: center; }
section.title h1 { font-size: 60px; margin-bottom: 0; }
section.title h1 + p { margin-top: 20px; }
section.chapter { justify-content: center; }
section.chapter h1 { font-size: 54px; margin: 0; }
section.chapter .sub { margin-top: 22px; }
section.chapter .num {
  color: var(--sub); font-size: 28px; font-weight: 700;
  letter-spacing: .24em; margin-bottom: 16px;
  font-family: ui-monospace, "SF Mono", monospace;
}
section.pic { padding: 36px; justify-content: center; align-items: center; }
section.pic h3 { color: var(--ink); font-size: 40px; margin: 0 0 20px; text-align: center; }
img { background: #ffffff; display: block; margin: 0 auto; max-width: 100%; }
/* Marp は本文の絵文字を <img> に置き換える。上の img 指定で block になるのを戻す */
img.emoji {
  display: inline; margin: 0; background: none;
  height: 1em; width: auto; vertical-align: -0.15em;
}
section.pic img { max-height: 470px; border: 1px solid var(--line); }
section.title footer, section.chapter footer { display: none; }
section::after { color: var(--sub); font-size: 16px; }
</style>

<!-- _class: title -->

# サーバとの通信

<span class="sub">ウェブ実装で必要になる通信の知識</span>

---

## この資料の目標

<div class="point">
Webアプリを支える<strong>サーバとの通信</strong>の<br>
しくみを、<strong>ざっくりつかむ！</strong>
</div>

---

## この資料で扱うこと

1. **HTTP** とは
2. **URL** の構成
3. **HTTPメソッド**（GET / POST）
4. **HTTP** の中身（ヘッダ）
5. **CORS** とは

---

<!-- _class: chapter -->

<div class="num">CHAPTER 1</div>

# HTTPとは

---

<div class="big">
HTTP は、Webでよく使われる<br>通信の<strong>ルール（プロトコル）</strong>
</div>

<div class="note">
<strong>HTTP</strong> ＝ Hypertext Transfer Protocol
</div>

---

## HTTPとは

![](imgs/fig-http-overview.svg)

<div class="note">
もとはブラウザ⇄サーバ間の通信用。<strong>WebAPIの呼び出し</strong>などにも使われる。
</div>

---

## いまの主流は HTTPS

![](imgs/fig-https.svg)

<div class="note">
<strong>HTTPS</strong> は、HTTPの通信を<strong>暗号化</strong>したもの。盗み見や改ざんを防ぐ。
</div>

---

## SSL と TLS

- <strong>SSL</strong>：古い暗号化の規格（いまは使われない）
- <strong>TLS</strong>：SSL の後継。実際に使われているのはこちら
- 慣習で、TLS のことを<strong>「SSL」と呼ぶ</strong>ことも多い

<div class="note">
つまり <strong>HTTPS ＝ HTTP を TLS で暗号化</strong>したもの。<br>
この資料は HTTP を前提に解説。詳しくは <strong>HTTPS / SSL / TLS</strong> で調べてみよう。
</div>

---

## HTTPは「ステートレス」

<div class="lead">
通信は<strong>1回ごとに独立</strong>していて、<br>前回の続きとしては扱われない
</div>

<div class="note">
<strong>ステート</strong>（状態）＋ <strong>レス</strong>（ない）。<br>
サーバーは前の通信を覚えていない。たとえば「ログイン成功」も保持しない。
</div>

---

## でも「セッションレス」ではない

<div class="lead">
通信に<strong>セッション情報</strong>を乗せるので、<br>ログイン状態は保てる
</div>

<div class="note">
だから HTTP は <strong>ステートレスだが、セッションレスではない</strong>。
</div>

---

<!-- _class: chapter -->

<div class="num">CHAPTER 2</div>

# URLの構成

---

<div class="big">
URL は、インターネット上の<br>リソースへの<strong>あて先</strong>
</div>

<div class="note">
<strong>URL</strong> ＝ Uniform Resource Locator
</div>

---

## URL と URI

![](imgs/fig-uri.svg)

<div class="note">
<strong>URI</strong> はリソースを識別する仕組みの総称。<strong>URL はその一種</strong>で、実務ではほぼ URL を使う。
</div>

---

## URLの構成

![](imgs/fig-url-parts.svg)

---

## オリジン

![](imgs/fig-origin.svg)

<div class="note">
スキーム・ドメイン・ポートの3つをまとめて <strong>オリジン</strong> と呼ぶ。
</div>

---

## オーソリティ

![](imgs/fig-authority.svg)

<div class="note">
<code>//</code> の後ろ、パスの前までの部分。ホストの前に<strong>認証用のユーザー情報</strong>を含めることもある。<br>
オリジンとは違い、<strong>スキームを含まず・ユーザー情報を含む</strong>。
</div>

---

<!-- _class: chapter -->

<div class="num">CHAPTER 3</div>

# HTTPメソッド

---

## メソッド ＝ 通信のアクション

<div class="cols">
<div class="col">
<div class="box mute">
<span class="label">仕様上のメソッド</span>
GET / POST / PUT / DELETE / HEAD / CONNECT / OPTION / TRACE / PATCH
</div>
</div>
</div>

<div class="note">
今回は、よく使う <strong class="view">GET</strong> と <strong class="logic">POST</strong> の2つを見る。
</div>

---

## GET と POST

![](imgs/fig-get-post.svg)

---

## <span class="c-view">GET</span> とは

- サーバから**データを取得**する
- クエリパラメータを URL に含められる
- URLは人の目に触れやすい → **個人情報は送らない**

<div class="note">
HTTPメソッドとして<strong>べき等・安全</strong>。<br>
ここでの「安全」は、サーバ側へ<strong>更新を要求しない</strong>という意味。
</div>

---

## <span class="c-logic">POST</span> とは

- サーバの**データを更新**する
- データは **body に含めて**送る（＝ペイロード）
- URLには出ないが、**暗号化はしない**

<div class="note">
HTTPメソッドとして<strong>べき等でなく・安全でない</strong>。<br>
個人情報を扱うなら HTTPS で通信ごと暗号化する。
</div>

---

## TIPS：べき等とは

<div class="lead">
同じリクエストを<strong>何回処理しても</strong>、<br>サーバのデータが<strong>同じ状態</strong>になること
</div>

<div class="note">
ここまでは<strong>メソッドの定義</strong>の話。<br>
GET/POSTを使ったAPIのべき等性・安全性は、<strong>サーバ/クライアントの実装しだい</strong>。
</div>

---

## 実際にやってみる（GET）

<div class="small">

1. 新しいタブで開発者ツールを開く（githubログイン中ならシークレットウィンドウ）
1. `Network` タブを開いて `github.com` にアクセス
1. 一覧の `github.com` の行がメソッド **GET** になっているか確認
1. リロードやロゴのクリックで内容が変わらないことを確認（**べき等**）
1. 検索窓に `jigintern` など入れて検索
1. `search` を探し、**GET** で呼ばれ、Request URL に入力文字列が含まれることを確認
1. 同じ文字列なら何度でも同じ結果になることを確認

</div>

---

<!-- _class: pic -->

### Network タブで確認する

![height:470](imgs/image.png)

---

## 実際にやってみる（POST）

<div class="small">

1. github にログインする
1. 一覧から `session` を探し、**POST** で呼ばれていることを確認
1. URLにはパスワードが入っていないのに、**Payload** タブを開くとパスワードが入っていることを確認

</div>

---

## まとめ（HTTPメソッド）

- <strong class="c-view">GET</strong>：クエリで送る／人に見える情報だけ／べき等な処理に
- <strong class="c-logic">POST</strong>：body で送る／秘密の情報に／更新する処理に（暗号化はしない）

<div class="note">
メソッドは動作や性質が<strong>定義</strong>されているだけ。<br>
定義どおりに動くよう、<strong>サーバ側が実装する</strong>必要がある。
</div>

---

<!-- _class: chapter -->

<div class="num">CHAPTER 4</div>

# HTTPの中身

---

## リクエストとレスポンスの構成

![](imgs/fig-http-message.svg)

---

## 主な<span class="c-view">リクエスト</span>ヘッダ

<div class="small">

| ヘッダ | 役割 |
| --- | --- |
| user-agent | ブラウザ・OS の種類 |
| cookie | サーバから預かった情報（セッションなど） |
| host | 接続先のホスト名 |
| accept | 受け取れるデータ形式 |
| accept-language | 受け取れる言語 |
| accept-encoding | 受け取れる圧縮形式 |

</div>

---

## 主な<span class="c-logic">レスポンス</span>ヘッダ

<div class="small">

| ヘッダ | 役割 |
| --- | --- |
| content-type | 本文のデータ形式 |
| Content-Encoding | 本文の圧縮形式 |
| set-cookie | ブラウザに保存させる情報 |
| connection | 接続の扱い方 |
| server | サーバのソフトウェア名 |

</div>

<div class="note">
ヘッダは基本 <strong>ブラウザが自動で付与</strong>。慣れるまで自作・付与はしなくてよい。
</div>

---

## 実際に見てみる

<div class="small">

**GETの中身**
- ログイン済みの `github.com` を開く（リロード）
- Nameが `github.com` の行をクリック
- リクエスト/レスポンスヘッダ、レスポンスボディを確認

**POSTの中身**
- github にログイン（済みなら一度サインアウト → 再ログイン）
- Nameが `session` の行をクリック
- ヘッダやペイロードを確認

</div>

---

## まとめ（HTTPの中身）

- リクエストもレスポンスも、**本体以外の情報**をたくさん持つ
- **ヘッダ**から通信の情報を得られる
- ヘッダは任意に足せるが、**基本はやらなくてよい**

---

<!-- _class: chapter -->

<div class="num">CHAPTER 5</div>

# CORSとは

---

<div class="big">
CORS は、<strong>オリジンをまたいで</strong><br>データをやり取りするしくみ
</div>

<div class="note">
<strong>CORS</strong> ＝ Cross-Origin Resource Sharing
</div>

---

## 同一オリジンポリシー

![](imgs/fig-same-origin.svg)

<div class="note">
CSRF や XSS といった攻撃を防ぐため、異なるオリジン間の送受信は標準でブロックされる。
</div>

---

## なぜ CORS が必要？

<div class="lead">
HTML/JS を取ってくるオリジンと、<br>叩く<strong>APIのオリジン</strong>が違うことがある
</div>

<div class="note">
そこで、<strong>安全と認められたオリジン間</strong>だけ、またいで通信できるようにしたのが CORS。
</div>

---

## この教材でのしくみ

![](imgs/fig-cors-setup.svg)

<div class="note">
<strong class="c-view">8000</strong> のページから、その JS が <strong class="c-logic">3000</strong> の API を呼ぶ。ポートが違う＝<strong>別オリジン</strong>なので CORS が必要。
</div>

---

## CORSリクエスト

![](imgs/fig-cors.svg)

<div class="note">
リクエストに <code>origin</code>、レスポンスに <code>Access-Control-Allow-Origin</code> を付け、両者が一致すれば受け取れる。
</div>

---

## プリフライトを起こさない条件（単純リクエスト）

<div class="cols">
<div class="col">
<div class="box tight b-view">
<span class="label">メソッド</span>
GET / HEAD / POST
</div>
</div>
<div class="col">
<div class="box tight b-logic">
<span class="label">ヘッダ</span>
Accept / Accept-Language / Content-Language / Content-Type / Range
</div>
</div>
<div class="col">
<div class="box tight b-store">
<span class="label">Content-Type</span>
x-www-form-urlencoded / multipart/form-data / text/plain
</div>
</div>
</div>

<div class="note small">
加えて、アップロード監視のイベントリスナーや <code>ReadableStream</code> を使っていないこと。
</div>

---

## 実際に見てみる（単純リクエスト）

<div class="small">

1. `/transfer-protocol` に移動
1. `deno run server.js` を実行（サーバは **3000番**）
1. 別ターミナルで `deno run client.js` を実行（クライアントは **8000番**）
1. `http://localhost:8000` を開き、開発者ツールを開く
1. `try cors` ボタン → Network / Console を確認（**エラー**）
1. `try cors (simple request)` ボタン → 正常に受け取れることを確認

</div>

<div class="note small">
<code>/cors</code> はヘッダなし、<code>/cors-additional-header</code> は <code>Access-Control-Allow-Origin: *</code> を付けて返している。
</div>

---

## プリフライトリクエスト

![](imgs/fig-preflight.svg)

<div class="note">
条件を満たせない（主にユーザのデータに影響する）通信では、先に <code>OPTION</code> で安全性を確認してから本リクエストを送る。
</div>

---

## 実際に見てみる（プリフライト）

<div class="small">

1. `/transfer-protocol` に移動
1. `deno run server.js` を実行
1. 別ターミナルで `deno run client.js` を実行
1. `http://localhost:8000` を開き、開発者ツールを開く
1. `try cors (prefright request)` ボタン → Network / Console を確認

</div>

<div class="note small">
POST で <code>Content-Type: application/json</code> を持つため単純リクエストにならず、先にプリフライトで必要な許可を確認している。
</div>

---

## まとめ（CORS）

- オリジンをまたぐアクセスを許すなら **CORSの設定**を行う
- 条件を満たせないと **プリフライト**（安全確認の通信）が起きる
- **外部のWebAPI** を呼ぶときは CORS の設定が必要になることがある

---

<!-- _class: chapter -->

<div class="num">FINALE</div>

# 実装で意識すること

---

## まとめ

![](imgs/fig-summary.svg)

---

## 実装のときは

- メソッドは、更新・個人情報なら **POST**、取得だけなら **GET**
- サーバ側は、原則そのメソッドの**仕様を守って**実装する
- ヘッダは基本ノータッチ。**ブラウザ任せ**でよい

<div class="note">
自作サーバは別オリジンから叩かれないので、サーバ側のCORSはあまり気にしなくてよい。<br>
クライアントで外部APIを叩くときは、<code>fetch</code> の <strong>mode を cors</strong> にすればおおむね動く。
</div>

---

<!-- _class: title -->
<!-- _paginate: false -->

# おわりに

<span class="sub">もっと深く知りたい人は、参考文献で自学してみよう ◎</span>

---

## 参考文献

- [HTTPの概要（MDN）](https://developer.mozilla.org/ja/docs/Web/HTTP/Overview)
- [HTTPメソッドについて（MDN）](https://developer.mozilla.org/ja/docs/Web/HTTP/Methods)
- [GETとPOSTの違いについて（Qiita）](https://qiita.com/kanataxa/items/522efb74421255f0e0a1)
- [CORSについて（MDN）](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS)
- [CORSを絶対に理解する（Zenn）](https://zenn.dev/syo_yamamoto/articles/445ce152f05b02)
