# Github Desktop を利用したチーム開発手法

本項では、GitHub, Inc. が提供するアプリケーション [Github Desktop](https://docs.github.com/ja/desktop) を利用した開発手法について解説します。  
この資料と同一のフォルダ内に、スライドも掲載しており、双方を参照することで学習を進めます。  

基本的にはスライドで解説を進めるので、本項は必要に応じて参照してください。

## 1. 導入編

*Git・Github・Github Desktopについて知ろう！*

### 1-1. Gitとは何か？

> Git（ギット）は、プログラムのソースコードなどの変更履歴を記録・追跡するための分散型バージョン管理システムである。  
> 出典: https://ja.wikipedia.org/wiki/Git

Gitは、プログラムのソースコードを管理するためのツールの一つです。多くの開発現場で採用されており、Gitを活用できることは、それだけで大きなアドバンテージとなります。  

Gitでは一つのアプリケーション開発につき、一つのリポジトリと呼ばれるものを作成します（規模によっては二つ、三つになることもあります）。このPC上で作成するリポジトリを、ローカルリポジトリと言います。  

このリポジトリに変更前と変更後の**差分を記録**することで、作業内容の明文化、バグ発生時の作業内容の巻き戻し等を可能にします。  
また、複数人で開発を行う際の作業の衝突を解決するための機能も備わっています。

> Topic: **差分を記録**することで、「`program.c`, `program(1).c`, `program(2).c`, `program(3)_これが最終版.c`, `program_提出用.c`...」のような形でのバックアップを取る必要が無くなります。

```mermaid
%%{init: { 'theme': 'forest' } }%%

gitGraph
    commit id: "initial commit"
    branch feature/topicA
    checkout feature/topicA
    commit id: "Add: index.htmlの基幹部分を実装"
    commit id: "Update: ログインフォームを実装"
    checkout main
    merge feature/topicA
    commit id: "Merge pull request #1 ..."
    branch feature/topicB
    checkout feature/topicB
    commit id: "..."
```

### 1-2. Githubとは何か？

> GitHub（ギットハブ）は、ソフトウェア開発のプラットフォームであり、ソースコードをホスティングする。コードのバージョン管理システムにはGitを使用する。  
> 出典: https://ja.wikipedia.org/wiki/GitHub

Githubは、Gitのリポジトリをインターネット上で管理するためのサービスです。このリポジトリを、リモートリポジトリと言います。  
リポジトリをアップロードしておくことで、複数人での開発時のソースコードの共有、ソースコードのバックアップ、自身の実績の公開の場として、等の効果を期待できます。  
この資料も、Github上で公開されています。

Githubを活用した開発では、大まかに、以下のような手順で作業が進められます。  
1. clone: Githubリポジトリを丸ごと丸ごとダウンロードする
2. branch: 作業を枝分かれさせて、他の開発者との衝突を防止する
3. 通常通りに、プログラムを書く
4. commit: 作業前と後の**差分を記録**しよう
5. push: 作業の成果をGithubにアップロードして共有する
6. Pull Request: 枝分かれした成果を結合する

### 1-3. Github Desktopとは何か？

> GitHub Desktop では、コマンド ラインや Web ブラウザーではなく GUI を使用して GitHub と対話できます。  
> 出典: https://docs.github.com/ja/desktop

Github DesktopはGit / Githubの機能をGUI（ボタン等でコンピュータに命令を送るもの）で操作するためのアプリケーションです。  
Gitは多くの場合、CUI（文字のみでコンピュータに命令を送るもの）で操作を行いますが、これに慣れるためには時間が必要なため、簡略化のために使用します。  

> Topic: CUIでも操作できると、様々な環境に適応できるのでおすすめです

## 2. Github Desktopを触ってみよう

*Github Desktopを実際に使ってみよう！*

### 2-1. clone: Githubリポジトリを丸ごとダウンロードしよう

```mermaid
%%{init: { 'theme': 'forest' } }%%

gitGraph
    commit id: "initial commit"
```

`clone`（クローン）は、リポジトリを**丸ごと**、PCにダウンロードするための操作です。  
Githubにアップロードされているリポジトリを丸ごと取得し、内部の全ファイルも同時にダウンロードします。  

基本的には、開発の最初に各開発者が一度ずつ行う操作です。  

Github Desktopでは、以下のように操作することで、クローンの操作を行うことができます。  
例として、`git-tutorial-2023`のリポジトリで作業してみましょう。 

<details>
<summary>練習: Github Desktopでクローンしてみよう</summary>

1. 下記URLにアクセスして、「<> Code」のボタンをクリックします
> repository: https://github.com/jigintern/git-tutorial-2023

2. 表示されたウィンドウの「Open with Github Desktop」をクリックして、Github Desktopを開きます
![](./imgs/screen-shots/01_github_open_with_github_desktop.png)

3. 「Local Path」にPC上での保存先を設定し、「Clone」をクリックします
![](./imgs/screen-shots/02_clone_repository_github_desktop.png)

4. リポジトリがクローンできたことを確認します  
以下のような画面になっていれば、問題ありません
![](./imgs/screen-shots/03_confirm_clone_repository.png)

5. 「Open in Visual Studio Code」をクリックして、リポジトリをVisual Studio Codeで開きます  
問題無く、Githubにアップロードされていたファイルが取り込めているようです。
![](./imgs/screen-shots/04_view_with_vscode.png)

</details>


### 2-2. branch: 作業を枝分かれさせよう

```mermaid
%%{init: { 'theme': 'forest' } }%%

gitGraph
    commit id: "initial commit"
    branch feature/topicA
    checkout feature/topicA
    commit id: "..."
```

`branch`（ブランチ）は、リポジトリ内で作業を行う際、他の開発者と作業を**枝分かれ**させる機能です。  
このように、作業を枝分かれさせることを、慣習的に「ブランチを切る」「ブランチを生やす」と言います。

例えば、機能Aを作る開発者と機能Bを作る開発者で、ファイルの編集箇所が重複してしまった場合、片方の変更内容が意図せず削除されてしまう場合があります。  
これを防止するため、機能ごとに編集内容を枝分かれさせ、結合する際に編集箇所の重複を確認・まとめて修正するという手法で作業を進めます。  
また、これによって編集履歴が分かりやすくなり、編集内容の巻き戻し等の際にどこまで巻き戻すのかの目算が立てやすくなる効果も期待できます。  
作業中に致命的なバグが発生した場合に、ブランチを放棄することで、大本のブランチへの被害を回避することも可能です。

一人で作業する場合でも、ブランチを切ることで作業の見通しが良くなる効果が期待できるため、ブランチを切って作業することが推奨されます。

また、作業するブランチを切り替える操作を`checkout`（チェックアウト）と呼びます。

Github Desktopでは、以下のように操作することで、ブランチを切る操作を行うことができます。

<details>
<summary>練習: ブランチを切ってみよう</summary>

1. ブランチ操作用のフォームを開きます

2. 「New Branch」をクリックして、新規ブランチの作成ウィンドウを開きます
![](./imgs/screen-shots/05_branch_form.png)

3. 新規ブランチの名前を入力して、「Create Branch」をクリックします  
ブランチの名前は他の参加者と重複しないよう、自分の名前等で設定してください。
![](./imgs/screen-shots/06_branch_name.png)
既にコードに変更を加えている場合は、以下のような画面が表示されるので、「Bring my changes to ...」を選択してください
![](./imgs/screen-shots/07_branch_bring_changes.png)

4. 新しいブランチができるので、作業に取り掛かることができます。

</details>



### 2-3. commit: 作業前と後の**差分を記録**しよう
```mermaid
%%{init: { 'theme': 'forest' } }%%

gitGraph
    commit id: "initial commit"
    branch feature/topicA
    checkout feature/topicA
    commit id: "Add: index.htmlの基幹部分を実装"
    commit id: "Update: ログインフォームを実装"
```

`commit`（コミット）は、作業前と作業後の**差分を記録**する操作です。  
作業が一段落したタイミングでコミットを行うことで、作業内容の明文化や、バグ発生時の巻き戻し等で役立ちます。  
また、コミットにはコミットメッセージという説明文を付与するため、作業内容を振り返る際の手助けにもなります。

> Topic: リポジトリに `.gitignore` という名前のファイルを追加することで、Git管理下から強制的に除外するファイルを定義することができます。  
> これを使用すれば、Githubにアップしてはいけない情報（テスト用のパスワード、認証情報のハッシュ等）をGit管理下から除外できます。
> ```
> # .gitignore
> .env
> .password
> .DS_Store
> ```

Github Desktopでは、以下のように操作することで、コミットの操作を行うことができます。

<details>
<summary>練習: 作業してコミットしてみよう</summary>

1. Visual Studio Codeを開いて、ファイルを新規作成します  
ファイルの名前は他の参加者と重複しないよう、自分の名前等で半角英数字で設定してください
![](./imgs/screen-shots/08_create_file.png)

2. 作成したファイルに、適当なプログラムを書き込みます
![](./imgs/screen-shots/09_write_python_code.png)

3. Github Desktopを開いて、差分が表示されていること、その差分が正しいことを確認します
![](./imgs/screen-shots/10_view_changes.png)

4. 画面左下、ユーザアイコンの横の入力フォームに、変更内容についての説明文（コミットメッセージ）を記載します

5. 「Commit to ...」をクリックします
これでコミットが完了します
![](./imgs/screen-shots/11_input_commit_message.png)

</details>


### 2-4. log: 作業の履歴を確認しよう

`log`（ログ）は、コミットの履歴を確認する操作です。  
現在作業中のブランチでのコミットの履歴を確認し、作業内容を確認することができます。  
作業を始める前やコミットが正しく完了したか、作業の開始地点が正しいかなどの確認のために用います。

Github Desktopでは、以下のように操作することで、ログを確認することができます。

<details>
<summary>練習: コミットの履歴を確認しよう</summary>

1. 「History」をクリックして、コミットの履歴が表示されることを確認します
![](./imgs/screen-shots/12_view_history.png)

</details>


### 2-5. push: 作業の成果をGithubにアップロードして共有しよう

`push`（プッシュ）は、現在のブランチの作業内容をGithub等にアップロードする操作です。  
他の開発者に作業内容を共有する時、作業が一段落して、ブランチの内容を元のブランチに結合したい時などに行います（後述。ブランチの結合操作は他開発者に確認してもらうのが望ましいため、Github上で行います）。

Github Desktopでは、以下のように操作することで、プッシュの操作を行うことができます。

<details>
<summary>練習: 作業内容をプッシュしてみよう</summary>

1. 「Changes」をクリックして、元の画面に戻ります

2. 「Publish branch」をクリックして、変更内容をプッシュします
![](./imgs/screen-shots/13_publish_branch.png)

3. ブラウザでGithubを開き、プッシュしたブランチが正しく反映されていることを確認します
![](./imgs/screen-shots/14_confirm_publish.png)

</details>


### 2-6. Pull Request: 枝分かれした成果を結合しよう

```mermaid
%%{init: { 'theme': 'forest' } }%%


gitGraph
    commit id: "initial commit"
    branch feature/topicA
    checkout feature/topicA
    commit id: "Add: index.htmlの基幹部分を実装"
    commit id: "Update: ログインフォームを実装"
    checkout main
    merge feature/topicA
    commit id: "Merge pull request #1 ..."
```

`Pull Request`（プルリクエスト）は、Githubの機能の一つで、ブランチ機能で分岐した作業を大本のブランチへと結合するための機能です。  
この結合作業を`merge`（マージ）と呼びます。この操作はローカルでも行うことができますが、ブランチの結合操作は**他開発者に確認してもらうのが望ましい**ため、Github上で行います。

> Topic: `Pull Request`は、Github以外のGit管理用のサービス（GitLab等）では、`Merge Request`（マージリクエスト）と呼ぶこともあります。

ブランチの結合作業は、以下の順序で行います。  
1. 作業ブランチの内容をGithubにアップロード（push: プッシュ）する。
2. 作業ブランチから元のブランチへの結合用の`Pull Request`を作成する。
3. 他開発者（レビュワー）が作業内容を確認して、問題点を指摘する。問題点が無い場合、確認した旨をコメントする。
4. ブランチを結合（merge: マージ）する。

Github上で、以下のように操作することで、Pull Requestの作成〜結合までを行うことができます。  

<details>
<summary>練習: プッシュした新規ブランチを、元のブランチに結合してみよう</summary>

1. Githubで「Pull requests」のタブをクリック

2. 「New pull request」をクリックします
![](./imgs/screen-shots/15_new_pull_request.png)

3. 新規ブランチの名前、Pull Requestのタイトル、本文を入力します  
他の開発者に確認してもらうものなので、作業内容が理解しやすい内容にすると良いです

4. 「Create pull request」をクリックすると、Pull Requestが作成されます
![](./imgs/screen-shots/16_write_pull_request.png)

5. 他開発者に、Pull Requestの確認を依頼します  
SlackやGithub上でのコメントなど、適宜チーム内で決定した方法で依頼しましょう

6. 確認を依頼された人は、Pull Requestの変更内容等を確認して、問題箇所があればコメント等で指摘します  
問題箇所が無い場合は、LGTM（Looks Good To Me: 私は良いと思います）等のコメントをつけて確認したことを報告しましょう
![](./imgs/screen-shots/17_view_pull_request.png)
![](./imgs/screen-shots/18_review_lgtm.png)

7. Pull Requestの作成者は、「Merge pull request」をクリックして、Pull Requestを元のブランチに結合します
![](./imgs/screen-shots/19_merge_pull_request.png)
![](./imgs/screen-shots/20_merged_pull_request.png)

8. `main`ブランチを確認して、変更内容が正しく取り込まれていることを確認します

</details>


### 2-7. fetch / pull: Githubリポジトリの変更部分をダウンロードしよう

`fetch`（フェッチ）は、Github上のリモートリポジトリの**変更を確認**する操作です。  
`pull`（プル）は、Github上のリモートリポジトリの**変更をダウンロード**する操作です。

一見すると違いがありませんが、`fetch`で行うのは変更が行われているかの確認のみで、実際にPC上のファイルの内容が書き換わることはありません。対して、`pull`を行った場合、変更内容がPC上のファイルに反映され、書き換えられます。

Github Desktopでは、以下のように操作することで、これらの操作を行うことができます。

<details>
<summary>練習: fetch / pullで変更後のGithubの内容を取り込もう</summary>

1. `main`ブランチに移動します
![](./imgs/screen-shots/21_checkout_main.png)

2. 画面上部の「Fetch origin」をクリックします  
これだけでは変更内容は取り込まれませんが、Github上で変更があったことをGithub Desktopが認識します  
（Github Desktopの自動更新がONになっている場合、既に変更が取り込まれている場合があります）
![](./imgs/screen-shots/22_fetch_origin.png)

3. 画面上部の「Pull origin」をクリックします  
これで変更内容が取り込まれ、PC上のファイルが更新されます
![](./imgs/screen-shots/23_pull_origin.png)

4. 変更内容が取り込まれていることを、「History」から確認します
![](./imgs/screen-shots/24_results.png)

</details>