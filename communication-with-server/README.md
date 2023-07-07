# サーバとの通信

# サーバー通信のメソッド
サーバーとクライアントが通信を行うためにはhttpを利用するが、このhttpには様々なメソッドが定義されている。
- GET
- POST
- PUT
- DELETE
- HEAD
- CONNECT
- OPTION
- TRACE
- PATCH

上記のように様々なメソッドがあるが、基本的に使用されるメソッドは`GET`と`POST`の2つである。
## GETとは
サーバからデータを取得する際に使用する。URLにクエリを含めることもできる。  
GETメソッドは冪等であるとされ、クライアント側からは安全であるとされる。  
URLにクエリを含めるため、他人に見られて困る内容(個人情報等)はGETで送信してはいけない。  
## POSTとは
サーバのデータを更新する時に使用する。データ自体はbodyに含めて通信を行う。  
冪等ではなく、クライアントからは安全でないとされる。  
クエリをbodyに含めるため、セキュリティ的に安全であるように見えるが、通信を傍受されたときに簡単に内容を読み取ることができるため安全ではない。  
個人情報などセンシティブな情報を送信する場合は、通信を暗号化する必要がある(httpsなど)。  
なお、このbodyに含めた情報のことをペイロードと言う。  

> ### TIPS:冪等とは
> 何度実行しても、1度しか実行していないときと同じ状態になることを指す。  
> 例えば、ON/OFFの切り替えスイッチは、偶数回押したときと奇数回押したときで状態が変わってしまうため冪等ではない。  
> しかし 、ONとOFFのスイッチがそれぞれ別であればONを何度押してもONの状態になるし、OFFを何度押してもOFFの状態となる。  
> これを冪等である、冪等性があるという。  

## 実際にやってみる
実際にGETとPOSTを使用した通信を見てみます
- まず新しいタブを開いて開発者ツールを開く
- `Network`タブを開く
- google検索で`Github`と検索し、トップページにアクセス
- `search...`の項目を確認(メソッドがGETで、Request URLの中に`github`の文字列が含まれていることを確認)
- githubのページにアクセスし、ログインを行う。
- ログイン完了後、一番上の`session`の項目を確認。(メソッドがPOSTで、Request URLにはパスワード等が入っていないこと、payloadタブを開くとパスワードが入っていることを確認)

# httpの中身
サーバとの通信を行うための規格であるhttpのリクエストの構成は主に以下の4つである。
- メソッド(GET、POSTなど)
- パス(ホスト以下の部分)
- プロトコルバージョン (HTTP 1.1など)
- リクエストヘッダ (詳細は後ほど)

また、POSTなら追加でbodyを持つ。

レスポンスの構成は主に以下の4つである。
- プロトコルバージョン
- ステータスコード (200など)
- ステータスメッセージ (OKなど)
- レスポンスヘッダ(詳細は後ほど)
- レスポンスボディ(GETメソッドでリクエストしたときにhtmlなどがここに入る)

なお、レスポンスのボディは省略可能。(POSTの場合は不要なことがある)

## リクエスト(or レスポンス)ヘッダ
ここに追加の情報を載せることで主に通信を行う。
主なリクエストのヘッダを以下に示す。
- user-agent 
- cookie
- host
- accept
- accept-language
- accept-encoding

また、主なレスポンスヘッダを以下に示す。
- content-type
- Content-Encoding
- set-cookie
- connection
- server

## 実際に見てみる
GETの中身を確認
- 開発者ツールを開いたブラウザのタブを開く
- ログインした状態の `github.com`を開く(リロードする)
- Nameのカラムにgithub.comと書いてある行をクリック
- リクエストヘッダやレスポンスヘッダ、レスポンスボディなどを確認する

POSTの中身を確認
- 開発者ツールを開いたブラウザのタブを用意
- githubにログイン(ログイン中の場合はサインアウトして再度サインイン)
- NameのカラムがSessionになっているものをクリック
- ヘッダやペイロードを確認

# CORSとは
Cross-Origin Resource Sharingの略。  
オリジンを跨いでデータの送受信を行える。  
CSRFやXSSはオリジンを跨ぐアクセスをブロックすることで対応できるため、異なるオリジン間ではデータを送受信できないようにブラウザが制限するようになった。  
しかし、この対応ではHTMLやJavaScriptを取ってくるオリジンとAPIアクセスをするオリジンが異なるときに不都合が出るため、CORSが考案された。  
CORSは安全だと認められたオリジン間のみ、跨いでデータの送受信を行うことができる。  
CORSを使用するにはサーバ、クライアントでそれぞれヘッダを付与する必要がある。  
また、CORSには単純リクエストとプリフライトリクエストの2種類がある。

> ### TIPS : オリジンとは
> オリジンとは、スキーム(プロトコル)、ホスト(ドメイン)、ポート、この3つによって構成されるものである。  
> `http://localhost:8000/hoge/fuga`のようなURLがあったとき、`http`をスキーム、`localhost`をホスト、`8000`をポートと呼ぶ。  
> 上記の3つのみで構成されるため、ポート以降のパスはオリジンには含まない(`/hoge`など)

## 単純リクエスト
CORSプリフライトを発生させないリクエストを単純リクエストと呼ぶ。
以下の条件を満たすと単純リクエストとなる。
- 特定のhttpメソッドで通信を行う
    - GET
    - HEAD
    - POST
- 特定のヘッダのみが付与されている
    - Accept
    - Accept-Language
    - Content-Language
    - Content-Type
    - Range
- Content-Typeに指定できるもの
    -  application/x-www-form-urlencoded
    - multipart/form-data
    -  text/plain
-  XMLHttpRequest オブジェクトを使用してリクエストを行う場合は、XMLHttpRequest.upload プロパティから返されるオブジェクトにイベントリスナーが登録されていないこと。すなわち、`XMLHttpRequest`インスタンスを `xhr` とした場合、どのコードも `xhr.upload.addEventListener()` が呼び出してアップロードを監視するためのイベントリスナーを追加していないこと。
- リクエストに ReadableStreamオブジェクトが使用されていないこと

単純リクエストの場合はリクエストヘッダに `origin`を付与することでCORSが使用できる。  
このとき、レスポンスには`Access-Control-Allow-Origin`のヘッダが付与され(サーバー側はこのヘッダを付与する必要がある)、このヘッダの内容とオリジンが一致するとき、レスポンスを受け取る。

## 実際に見てみる
1. `deno run server.js`を実行
1. 別のターミナルで`deno run client.js`を実行
1. ブラウザで`http://localhost:8000`にアクセスして開発者ツールを開く
1. `try cors`ボタンを押して NewworkタブやConsoleに出力されたデータを確認する。
1. `try cors (simple request)`ボタンを押して、NewworkタブやConsoleに出力されたデータを確認する。

### 軽く解説
サーバは`3000`番のポートで動作するように設定されており、クライアントは`8000`番で動作するようになっている。  
ポート番号が異なるためCORSを用いてアクセスする必要がある。  
`try cors`ボタンは`/cors`を、`try cors (simple request)`は`/cors-additional-header`のエンドポイントを叩くようになっている。  
`/cors-additional-header`はヘッダーに`Access-Control-Allow-Origin:*`を付与してレスポンスを返しているが、`/cors`は何も付与していない。  
従って`try cors`ボタンはエラーを吐くが、`try cors (simple request)`ボタンは正常にレスポンスを受け取ることができ、メッセージを描画することができる。  

## プリフライトリクエスト
単純リクエストに当てはまらないオリジン間のリクエストを行うときに用いられる。  
通常のリクエストの前に `OPTION`メソッドを用いてプリフライトリクエストを送信し、そのレスポンスが安全だったときに通常のリクエストを行う。  
プリフライトリクエストの場合、クライアント側のヘッダには `origin`に加えて `Access-Control-Request-Method`と`Access-Control-Request-Headers`を付与する必要がある。  
サーバ側のレスポンスヘッダには `Access-Control-Allow-Origin`、`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers`、`Access-Control-Max-Age`を付与する必要がある。  
これらのヘッダの結果により、安全性が確保できた場合、単純リクエストと同様のヘッダで通信を行う。  

## 実際に見てみる
1. `deno run server.js`を実行
1. 別のターミナルで`deno run client.js`を実行
1. ブラウザで`http://localhost:8000`にアクセスして開発者ツールを開く
1. `try cors (prefright request)`ボタンを押して NewworkタブやConsoleに出力されたデータを確認する。

### 軽く解説
`try cors (prefright request)`ボタンはPOSTメソッドで、bodyにJSON形式のデータを持ってリクエストを行う。  
そのため、`Content-Type: application/json`のヘッダを持つ必要があるが、これはCORSの単純リクエストとしては許可されていない。  
そこで、プリリフライトリクエストを送り、このレスポンスに必要な情報があるか確認している。  

# 参考文献
- [httpの概要](https://developer.mozilla.org/ja/docs/Web/HTTP/Overview)
- [httpメソッドについて](https://developer.mozilla.org/ja/docs/Web/HTTP/Methods)
- [GETとPOSTの違いについて](https://qiita.com/kanataxa/items/522efb74421255f0e0a1)
- [CORSについて](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS)
- [CORSを絶対に理解する](https://zenn.dev/syo_yamamoto/articles/445ce152f05b02)
