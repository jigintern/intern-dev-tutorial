# サーバとの通信

## この資料で説明したいこと

- HTTP とはなにか
- URL / URI の構成、オリジンやオーソリティ
- HTTPメソッド（GET / POST）と HTTP の中身（ヘッダ）
- CORS のしくみ（同一オリジンポリシー・プリフライト）

## 事前準備

`transfer-protocol` ディレクトリで、CORS の挙動を実際に試せます。

```
deno run server.js
```

別のターミナルで

```
deno run client.js
```

を実行し、ブラウザで `http://localhost:8000` を開いてください（サーバは 3000 番、クライアントは 8000 番で動きます）。

## 資料を読み始める前に

- うまく行かない場合は通し番号と一緒に質問してもらえると対応しやすいです。
- わかっている他の参加者に聞いてみるのもいいでしょう。SlackのDMなどで質問したり、チームのslackチャンネルを活用するのも 👍 です。

それでは [資料本編へ](https://jigintern.github.io/intern-dev-tutorial/transfer-protocol/transfer-protocol-slide.html)

- [PDF資料](https://jigintern.github.io/intern-dev-tutorial/transfer-protocol/transfer-protocol-slide.pdf)
- [テキスト資料](./slide.md)
