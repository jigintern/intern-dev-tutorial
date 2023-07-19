# ChatGPT API ハンズオン

ここでは、Deno で ChatGPT の API を利用する方法を紹介します。

## 1. 🔧 準備編

### 1-1. 🧐 ChatGPT とは？

OpenAI が開発した人工知能チャットボットです。

2023年7月現在、公式ページから、GPT 3.5 が無料で使用できますが、  
今回は OpenAI API を使用して ChatGPT を使用します。

### 1-2. ✏️ OpenAIのアカウントを作成しよう

API や ChatGPT の利用にはアカウント登録が必要になります。  
登録済みの人はそのアカウントを使用してください。

ます、[OpenAI](https://openai.com) に移動します。

<img src="./imgs/01_openai_top.png" width="600px">

右上から、Sign Up を選択して、新規登録画面へ移動しましょう。

<img src="./imgs/02_signup.png" width="600px">

アカウント登録済みの人は Log in からログイン画面へ移動します。

<img src="./imgs/03_login.png" width="600px">

ここからは、各自でアカウントの登録をお願いします🙏  
完了時に以下のような画面になっていればOKです。

<img src="./imgs/04_openai_select_platform.png" width="600px">

今回は API を使用するので、API を選択します。  
ChatGPT を使用したい場合は、ここで ChatGPT を選択してください。

<img src="./imgs/05_openai_platform_top.png" width="600px">

### 1-3. ⚙️ API クレジットと API キーの確認

続いて、API クレジットとAPI キーを確認していきます。

自分のプログラムから、API を呼び出すには API キーが必要になります。  
また、クレジットを消費します(クレジットがない場合は課金する必要があります)。

画面右上の自分のアイコンと Personal と書いてある部分をクリック、出てきたメニューから Manage Account を選択します。

<img src="./imgs/06_account_menu.png" height="600px">

画面が移動したら、左側メニューから Usage を選択してください。

Usage では自分がどれくらい API を使用したかが確認できます。  
下図のように、Free trial usage というのがあるかと思いますが、こちらが無料で使用できるクレジットになります。  
この図では $5.00 が無料枠として付与されています。

この部分では、Used が使用済みクレジット、 Expired が期限切れのクレジットを示しています。

つまり、この図の状態だと無料枠が残っていないので、使用したい場合は課金する必要があるということになります。

<img src="./imgs/07_free_trial_usage.png" width="600px">

---

続いて、API キーの確認をしていきます。  
今度は、左のメニューから、API Keysを選択します。  

<img src="./imgs/08_api_key_top.png" width="600px">

ここでは、発行したAPI キーのリストを確認することができます。
Secret Key という名前のキーがデフォルトで発行されているはずです。

ここでは、インターン用に新しく1つキーを発行していきます。  
「+ Create new secret key」を選択します。

<img src="./imgs/09_key_name.png" width="600px">

名前は各自におまかせしますが、「jigintern」のように何に使っているかわかりやすい命名にしておくのをオススメします。

名前を入力したら、Create secret key を押します。

<img src="./imgs/10_new_secret_key.png" width="600px">

このようにAPI キーが発行されればOKです。  

**ここで出てきたAPIキーは Done を選択すると、この後は見れなくなります。**

なので、発行したキーはどこかに保管しておいてください。

(上の英語の説明でも、 you won't be able to view it again としっかり説明されています)

ちなみに、万が一わからなくなった場合は、そのキーを削除して、新しくキーを作ってしまえばOKです。

2個以上ある場合は、ゴミ箱アイコンを押せば消せます。

<img src="./imgs/11_key_list.png" width="600px">

## 2. 💪 実践編

それでは、準備はできたので、実際に API を使用してみます。

とはいえ、実際の API 仕様を確認してイチから実装するのも厳しいので、こちらのfetchChat / fetchConversation を使用します。

[aichat](https://github.com/code4fukui/ai_chat)

### 2-1. 😎 サンプルを元に動かすところまでやってみよう

ということで、この README.md と同じ階層にある、sample フォルダに移動します。中には Deno と fetchChat を利用したサンプルコードが入っています。



