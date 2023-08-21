# そもそもAPIとは

Application Programming Interfaceの略。  

アプリケーションが別のアプリケーションを呼び出しために使用するインターフェース。  

すでに実装されているアプリケーションのAPIの呼び出しを行うことで、無駄な実装をする必要がなくなる。  

また、呼び出し側はAPIの裏側にあるコードの動作を意識せず使用することができる。  

主にAPIという言葉が使用されるのは webアプリケーションにおけるサーバ側の処理の呼び出しであるが、APIはこれに限らずOSとアプリケーションの間や、Javaなどのライブラリでも使用される。

# 実際にAPIを叩いてみる
サンプルコードにボタンを追加し、そのボタンを押したらサーバの`/welcome-message`[エンドポイント](#tips%E3%82%A8%E3%83%B3%E3%83%89%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88)を叩くコードを用意する。  

まずは以下のコードを`/public/index.html`のbodyタグ中に追加し、`message(click me)`と書かれたボタンを用意する。  
 

```html
  <div>
    <h1 id="welcome_message"></h1>
    <button id="welcome_button">message(click me)</button>
  </div>
```

サーバで用意したAPIのエンドポイントを叩くには **fetch API**を使用する。  

使い方はシンプルで`fetch("{叩きたいエンドポイント}")`と書けば好きなAPIのエンドポイントを叩くことができる。  
なお、`fetch`は非同期処理を行うので、通信が終了するまで(データが返ってくるまで)待ちたい場合は`await`をつける必要がある。  
ボタンがクリックされたらAPIを叩き、戻り値を先ほど用意した、`welcome_message`のidを持つh1タグに表示する。  

先ほど追加したコードの下に以下のコードを追加する
```html
  <script type="module">
    document.getElementById("welcome_button").onclick = async () => {
      const response = await fetch("/welcome-message");
      document.getElementById("welcome_message").innerText = await response.text();
    };
  </script>
```

これでクライアントからAPIを叩く実装ができたので、実際に動かしてみる。

まず、 `deno run -A --watch server.js`を実行。  
次に、ブラウザを開いて`localhost:8000`にアクセスし、ボタンを押してみる(ページが開けない場合はターミナルにエラーが出ていないか確認)。  
最後に、ボタンを押して`jigインターンへようこそ！`が表示されていれば成功。

> ### TIPS:エンドポイント
> APIの呼び出し側から見て、APIの接続先を指す。
> 例えば、APIを`http://hoge.com/fuga`と`http://hoge.com/piyo`(それぞれの処理は異なる)で呼び出せる場合、このそれぞれをエンドポイントと呼ぶ。
> なお、APIのオリジン(プロトコルとホストとポート名をまとめたもの、今回の例では`http://hoge.com`にあたる)は基本同一であるため、オリジン以降の`/fuga`や`/piyo`のみでエンドポイントと呼ぶことがある。

# APIを追加してみる

APIの叩き方がわかったところで、今度はサーバー側に手を入れてAPIを追加してみる。

## GETメソッドでAPIを追加し、叩く

まず初めにクエリパラメータなしのGETメソッドのAPIを作成する。  

動作としては`/greeting`のエンドポイントを叩くとHelloが返ってくるAPIを作成する。  
以下のコードを`server.js`に追加する。

```javascript

  if( req.method === "GET" && pathname === "/greeting" ){
    return new Response("Hello!!")
  }
```
`req.method`でクライアントが使用したメソッドを取得することができる。  
アクセス先のパスは`URL`クラスの`pathname`プロパティにあるため、これを確認することで叩かれたエンドポイントを判定することができる。(パスの取得はサンプルプログラムを流用)

これでサーバ側に新たなAPIを生やすことができたので、今度はクライアント側にこれを叩く実装を追加する。  

先ほどのAPIを叩いてみるのコードを参考に実装する。  

以下に一例を載せておく。

<details><summary>クラアントのコード</summary><div>

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <div>
    <h1 id="welcome_message"></h1>
    <button id="welcome_button">message(click me)</button>
  </div>

  <!-- /greetingのAPIを叩く用のボタン -->
  <div>
    <button id="greeting">Hello</button>
  </div>

  Server:<span id="server_response"></span>

  <script type="module">

    document.getElementById("welcome_button").onclick = async () => {
      const response = await fetch("/welcome-message");
      document.getElementById("welcome_message").innerText = await response.text();
    };
    
    // greetingを叩くためのjavascriptの実装
    document.getElementById("greeting").onclick = async () => {
      const response = await fetch("/greeting");
      document.getElementById("server_response").innerText = await response.text();
    };
  </script>
</body>

</html>
```

</div></details>

実装ができたら、実際にブラウザで開いてボタンを押してみる。  
想定したレスポンスがあれば成功。  
もし表示されない場合は開発者ツールを開いてコンソールのタブにエラーが出ていないか確認する。  
コンソールにエンドポイント名の404のエラーがあり、間違いなくそのエンドポイントが実装されている場合は、denoの再起動で直る可能性がある。


## GETメソッドをクエリパラメータ付きで追加し、叩く

次にGETメソッドをクエリパラメータ付きで叩くAPIを実装する。  
先ほど作ったAPIは消さずに追加していく。

仕様としては`/greeting-me`というエンドポイントを作成。  
これにクエリパラメータ`name`をつけて送信すると`Hello, {name}`を返す。  
クライアント側ではテキストボックスとボタンを表示し、ボタンが押されたら入力された値をクエリパラメータとして送信する。

まずサーバ側から実装する。  
クライアントから送られてきたクエリパラメータは以下のように取得できる。  

```javascript
const param = new URL(req.url).searchParams.get("クエリパラメータ名");
```

上記を参考に、リクエストを受け取って使用を満たすようなレスポンスを返す処理を追加する。  
以下に実装の一例を示す。

```javascript
  if( req.method === "GET" && pathname === "/greeting-me" ){
    const param = new URL(req.url).searchParams.get("name");
    return new Response("Hello, " + param);
  }
```

続いてクライアント側を実装する。  
今回は入力した名前をクエリパラメータとして渡すので、入力欄の作成とそれを送信するボタンを作成する。

```html
  <input type="text" id="name">
  <button id="greeting_me"> greeting me </button>
```

入力された内容をクエリパラメータとして、GETリクエストを送るコードを用意する。

```javascript
    // greeting-meを叩くためのjavascriptの実装
    document.getElementById("greeting_me").onclick = async () => {
      const name = document.getElementById("name").value;
      const response = await fetch("/greeting-me?name=" + name);
      document.getElementById("server_response").innerText = await response.text();
    };
```

ここまで実装したら、動作確認を行う。  

作成した入力フォームに適当な名前を入れて、ボタンを押し、レスポンスが表示されるのを確認する。  


## POSTメソッドをペイロードありで叩く

続いて、POSTメソッドを利用して認証のようなものを作る。

エンドポイントは`/auth`とし、ペイロードの中に`pass`というパラメータを持たせる。  
サーバ側であらかじめ決めたパスワードと一致していれば`Authentication Successful!!`を返し、異なっていたら`Authentication Failure`を返す。

まず、サーバの方から実装する。  

POSTメソッドで送信されたパラメータは以下のような実装で取得することができる。

```javascript
    const reqJson = await req.json();
    const pass = reqJson.pass
```

`json()`メソッドでリクエストのbodyに入ってるjson形式のデータを取り出すことができる。  
しかし、これが非同期で行われるため、`await`を利用して一度jsonとして全てのbodyのデータを取り出し、その後必要なパラメータを取り出す流れで行う。  

パラメータが取り出せたら、そのパスワードとハードコーディングしたパスワードを比較して、一致しているかどうかで処理を変える。  

以下にサーバ側のコードの実装の一例を示す。

```javascript
  if( req.method === "POST" && pathname === "/auth" ){
    const reqJson = await req.json();
    const pass = reqJson.pass
    if( pass === "jigjp" ){
      return new Response("Authentication Successful!!")
    }else{
      return new Response("Authentication Failure")
    }
  }
```

次にクライアント側の実装を行う。  

まず、先ほどまでの実装を参考にパスワードの入力欄とAPIを叩くボタンを作成する。  
入力欄はパスワードを扱いたいので `type=password`とする。  

fetch APIでPOSTメソッドを利用する場合、第二引数のオプション指定でメソッドを指定する必要がある。  
また、今回はbodyも送信し、その中身はJSONで送るため、以下のようになる。

```javascript
      const response = await fetch("/auth",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({pass: pass})
      });
```

最後に今までの実装を参考に、レスポンスを表示する。

これでPOSTのAPI実装とクライアントの実装が完了したため、実際に動作確認を行う。



# 終わりに

最後に、ここまでの実装を終えたクライアントのコードをサーバのコードを一例として載せておく。  
もちろんこれと異なっていても、意図した動作を行えるのであれば問題ない。

<details><summary>クラアントのコード</summary><div>

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <div>
    <h1 id="welcome_message"></h1>
    <button id="welcome_button">message(click me)</button>
  </div>

  <!-- /greetingのAPIを叩く用のボタン -->
  <div>
    <button id="greeting">Hello</button>
  </div>

  <!-- /greeting_meのAPIを叩く用のボタン -->
  <div>
    <input type="text" id="name">
    <button id="greeting_me"> greeting me </button>
  </div>

  <!-- /authのAPIを叩く用のボタンと入力欄 -->
  <div>
    <input type="password" id="password">
    <button id="auth">Authentication</button>
  </div>

  Server:<span id="server_response"></span>


  <script type="module">

    document.getElementById("welcome_button").onclick = async () => {
      const response = await fetch("/welcome-message");
      document.getElementById("welcome_message").innerText = await response.text();
    };
    
    // greetingを叩くためのjavascriptの実装
    document.getElementById("greeting").onclick = async () => {
      const response = await fetch("/greeting");
      document.getElementById("server_response").innerText = await response.text();
    };

    // greeting_meを叩くためのjavascriptの実装
    document.getElementById("greeting_me").onclick = async () => {
      const name = document.getElementById("name").value;
      const response = await fetch("/greeting-me?name=" + name);
      document.getElementById("server_response").innerText = await response.text();
    };

    // authを叩くためのjavascriptの実装
    document.getElementById("auth").onclick = async () => {
      const pass = document.getElementById("password").value;
      const response = await fetch("/auth",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({pass: pass})
      });
      document.getElementById("server_response").innerText = await response.text();
    };
  </script>
</body>

</html>
```

</div></details>

<details><summary>サーバーのコード</summary><div>

```javascript
import { serve } from "https://deno.land/std@0.180.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if ( req.method === "GET" && pathname === "/welcome-message" ) {
    return new Response("jigインターンへようこそ！");
  }

  if( req.method === "GET" && pathname === "/greeting" ){
    return new Response("Hello!!")
  }

  if( req.method === "GET" && pathname === "/greeting-me" ){
    const param = new URL(req.url).searchParams.get("name");
    return new Response("Hello, " + param);
  }

  if( req.method === "POST" && pathname === "/auth" ){
    const reqJson = await req.json();
    const pass = reqJson.pass
    if( pass === "jigjp" ){
      return new Response("Authentication Successful!!")
    }else{
      return new Response("Authentication Failure")
    }
  }
  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});

```

</div></details>

