---
marp: true
theme: uncover
paginate: true
---

# **VSCode の Git 機能** を

# 利用したチーム開発手法

---

## 1. 導入編

_Git・GitHub・VSCodeのGit機能について知ろう！_

---

<!--
header: 1-1. Gitとは何か？
-->

## 1-1. Gitとは何か？

---

### Gitとは何か？

> Git（ギット）は、プログラムのソースコードなどの変更履歴を記録・追跡するための分散型バージョン管理システムである。  
> 出典: https://ja.wikipedia.org/wiki/Git

---

### 分散型……バージョン管理システム……？

---

### **ゲームのセーブデータ**みたいに

### 今の状態を保存しておくもの

これをリポジトリ、と呼びます

---

### **作業が一段落**したら、今の状態を保存します

履歴が溜まっていきますね
すると……？

![bg right:40%](./imgs/materials/01_git_tree.png)

---

### **いつ、何の機能**を実装したのか分かる

履歴には説明文をつけるので、
分かりやすいです

![bg right:40%](./imgs/materials/01_git_tree.png)

---

### バグが発生した時も、**元に戻せる**

過去のデータに、一瞬で元通り

![bg right:40%](./imgs/materials/01_git_tree.png)

---

### 変なデータ、**必要なし**

- `program.c`
- `program(1).c`
- `program(2).c`
- `program(3)_これが最終版.c`
- `program_提出用.c`

![bg right:40%](./imgs/materials/01_git_tree.png)

---

### その上、**複数人**で作業するための機能も沢山

編集の重複を防いだり、差分を分かりやすくしたり……

![bg right:40%](./imgs/materials/01_git_tree.png)

---

### Gitとは何か？

ソースコードをいい感じに管理するやつ

---

<!--
header: 1-2. GitHubとは何か？
-->

## 1-2. GitHubとは何か？

---

### GitHubとは何か？

> GitHub（ギットハブ）は、ソフトウェア開発のプラットフォームであり、ソースコードをホスティングする。コードのバージョン管理システムにはGitを使用する。  
> 出典: https://ja.wikipedia.org/wiki/GitHub

---

### ソースコードを……ホスティングする……？

---

### つまり？

---

### Gitをオンラインで管理するやつ

Gitのデータをアップロードして共有・バックアップするためのサービスです

[https://github.com/](https://github.com/)

---

### 記録がある程度溜まったら、**アップロード**

PC上のデータが吹っ飛んでも、オンラインに残ります

![bg right:40%](./imgs/materials/02_github.png)

---

### 複数人で、データ**共有**

クラウドでの共有は不要です

![bg right:40%](./imgs/materials/02_github.png)

---

### **他の人**も、閲覧可能

共同開発の場としても、能力をアピールする場としても

![bg right:40%](./imgs/materials/02_github.png)

---

### GitHubとは何か？

Gitをオンラインで管理するやつ

---

<!--
header: 1-3. VSCodeのGit機能とは何か？
-->

## 1-3. VSCodeのGit機能とは何か？

---

### VSCodeのGit機能とは何か？

> Visual Studio Code には統合されたソース管理機能(SCM)があり、Git のサポートが標準で組み込まれています。  
> 出典: https://code.visualstudio.com/docs/sourcecontrol/overview

---

### Gitは、**コマンドライン**で操作するのが一般的

→

![bg right:40%](./imgs/materials/01_git_tree.png)

---

### VSCodeの**ソース管理ビュー**を使えば、**コマンド無し**で操作できます

拡張機能のインストールも不要！
VSCodeを入れればすぐ使えます
（Git本体は事前準備でインストール済み）

---

### 今回はVSCodeのGit機能を使って開発します

お気に入りのGitの操作方法があれば、そちらで進めていただいても問題ありません！

---

<!--
_header: ""
backgroundColor: #222
color: #FFF
-->

## 2. VSCodeのGit機能を触ってみよう

_VSCodeのGit機能を実際に使ってみよう！_

---

<!--
header: 2-1. clone: GitHubリポジトリを丸ごとダウンロードしよう
-->

### 2-1. clone: GitHubリポジトリを丸ごとダウンロードしよう

---

### GitHubからリポジトリをダウンロードしてみましょう

これをclone（クローン）と呼びます

---

### 今回はこちらで事前にリポジトリを作成しました

---

### ブラウザで以下URLを開いてください

Zoomのチャット欄にも記載します

[https://github.com/jigintern/git-tutorial-2026](https://github.com/jigintern/git-tutorial-2026)

---

###### 1. 「<> Code」ボタンをクリックし、表示されたHTTPSのURLをコピーします

![height:460px](./imgs/screen-shots/01_github_code_button.png)

---

###### 2. 「ようこそ」画面の「Git リポジトリのクローン...」をクリックします

![height:460px](./imgs/screen-shots/02_vscode_clone_repository.png)

---

###### ex. コマンドパレットから「Git: クローン」を選んでも、同じ操作ができます

![height:460px](./imgs/screen-shots/03_command_palette_git_clone.png)

---

###### 3. 画面上部の入力欄に、コピーしたURLを貼り付けて、Enterキーを押します

![height:460px](./imgs/screen-shots/04_clone_input_url.png)

---

###### 4. PC上での保存先のフォルダーを選択します

![height:460px](./imgs/screen-shots/05_clone_select_folder.png)

---

###### 5. 「クローンしたリポジトリを開きますか？」という通知が表示されるので、「開く」をクリックします

![height:460px](./imgs/screen-shots/06_open_cloned_repository.png)

---

###### 6. エクスプローラーに、GitHubにアップロードされていたファイルが表示されていることを確認します

![height:460px](./imgs/screen-shots/07_view_cloned_files.png)

---

### ダウンロードできてそうですね

![bg contain brightness:50%](./imgs/screen-shots/07_view_cloned_files.png)

---

<!--
header: 2-2. branch: 作業を枝分かれさせよう
-->

### 2-2. branch: 作業を枝分かれさせよう

---

### 作業を枝分かれさせてみましょう

これをbranch（ブランチ）と呼びます

---

### クラウドサービスで**ファイル共有**すると……

編集が重複したりして、片方の編集内容が消されることも

---

###### 枝分かれすると、複数人で同じファイルを触っても（ちょっと）安心です

![height:400px](./imgs/materials/04_mermaid_branch.svg)

---

### では、ブランチを切ってみましょう

ブランチを作ることを、慣習的に「ブランチを切る」、といいます

---

###### 1. 画面左下のステータスバーに表示されているブランチ名（main）をクリックします

![height:460px](./imgs/screen-shots/08_statusbar_branch.png)

---

###### 2. 表示されるメニューから「+ 新しいブランチの作成... (Create new branch...)」をクリックします

![height:460px](./imgs/screen-shots/09_create_new_branch.png)

---

###### 3. 新規ブランチの名前を入力して、Enterキーを押します。他の参加者と重複しないよう、自分の名前などで設定してください

![height:460px](./imgs/screen-shots/10_branch_name_input.png)

---

###### 4. ステータスバーの表示が、新しいブランチ名に切り替わったことを確認します

![height:460px](./imgs/screen-shots/11_branch_switched.png)

---

### 既にファイルに変更を加えていた場合、その変更は新しいブランチにそのまま持ち越されます

---

<!--
header: 2-3. commit: 作業前と後の**差分を記録**しよう
-->

### 2-3. commit: 作業前と後の**差分を記録**しよう

---

### 作業前と後の**差分を記録**してみましょう

これをcommit（コミット）と呼びます

---

### Gitはファイルの**現在の内容を保存**することを繰り返してログを作ると言いましたが……

実は、全てを保存するわけではありません

---

### 作業を重ねる程に**データが膨大**になってしまいます

これでは、いけませんね。しかし、解決する方法があります

---

###### データの保存時には、作業前と後の**差分を記録**する

![height:400px](./imgs/materials/05_mermaid_commit.svg)

---

### では、コミットしてみましょう

---

###### 1. ファイルを新規作成します。ファイル名が重複しないよう、自分の名前などを半角英数字でつけてください

![height:460px](./imgs/screen-shots/12_create_file.png)

---

###### 2. 作成したファイルに、適当なプログラムを書き込みます

![height:460px](./imgs/screen-shots/13_write_python_code.png)

---

###### 3. ソース管理ビューを開いて、「変更」に作成したファイルと差分が表示されることを確認します

![height:460px](./imgs/screen-shots/14_scm_view_changes.png)

---

###### 4. ファイル名にカーソルを合わせて「+」（変更をステージ）をクリックし、「ステージされた変更」に移動させます

![height:460px](./imgs/screen-shots/15_scm_stage_changes.png)

---

###### 5. 上部の入力欄にコミットメッセージを記載し、「コミット (Commit)」ボタンをクリックします。これで完了です

![height:460px](./imgs/screen-shots/16_scm_commit.png)

---

<!--
header: 2-4. log: 作業の履歴を確認しよう
-->

### 2-4. log: 作業の履歴を確認しよう

---

### 作業の履歴を確認してみましょう

この履歴をlog（ログ）と呼びます

---

###### ソース管理ビューの「グラフ (Graph)」に、コミットの履歴が表示されることを確認します

![height:460px](./imgs/screen-shots/17_source_control_graph.png)

---

### よさそうですね

![bg contain brightness:50%](./imgs/screen-shots/17_source_control_graph.png)

---

<!--
header: 2-5. push: 作業の成果をGitHubにアップロードして共有しよう
-->

### 2-5. push: 作業の成果をGitHubにアップロードして共有しよう

---

### 作業の成果をGitHubにアップロードしてみましょう

これをpush（プッシュ）と呼びます

---

早速、プッシュしてみましょう

---

###### 1. ソース管理ビューの「Branch の発行」をクリックします

![height:460px](./imgs/screen-shots/18_publish_branch.png)

---

###### 2. 初回はGitHubへのサインインを求められるので、「許可 (Allow)」をクリックします

![height:460px](./imgs/screen-shots/19_github_signin_dialog.png)

---

###### 3. ブラウザが開くので、GitHubにログインして「Authorize Visual-Studio-Code」をクリックし、VSCodeに戻ります

![height:460px](./imgs/screen-shots/20_github_authorize_browser.png)

---

###### 4. ブラウザでGitHubを開き、プッシュしたブランチが正しく反映されていることを確認します

![height:460px](./imgs/screen-shots/21_confirm_publish.png)

---

### 2回目以降は「変更の同期 (Sync Changes)」ボタンでプッシュできます

---

<!--
header: 2-6. Pull Request: 枝分かれした成果を結合しよう
-->

### 2-6. Pull Request: 枝分かれした成果を結合しよう

---

### ブランチ機能で枝分かれさせた作業を結合させましょう

これをmerge（マージ）と呼びます

---

### 一応、手元でマージもできますが……

マージする時は、バグ等の防止のため、他の人に確認して貰いたいです

---

### GitHubのPull Request（プルリクエスト）機能を使いましょう！

---

### プルリクエストでマージしましょう

---

###### 1. GitHubで「Pull requests」のタブをクリック

![height:460px](./imgs/screen-shots/22_new_pull_request.png)

---

###### 2. 「New pull request」をクリックします

![height:460px](./imgs/screen-shots/22_new_pull_request.png)

---

###### 3. 新規ブランチの名前、Pull Requestのタイトル、本文を入力します。作業内容が理解しやすい内容にすると良いです

![height:460px](./imgs/screen-shots/23_write_pull_request.png)

---

###### 4. 「Create pull request」をクリックすると、Pull Requestが作成されます

![height:460px](./imgs/screen-shots/23_write_pull_request.png)

---

### 5. 他開発者に、Pull Requestの確認を依頼します

SlackやGitHub上でのコメントなど、適宜チーム内で決定した方法で依頼しましょう

---

###### 6-1. 確認を依頼された人は、Pull Requestの変更内容等を確認して、問題箇所があればコメント等で指摘します

![height:460px](./imgs/screen-shots/24_view_pull_request.png)

---

###### 6-2. 問題箇所が無い場合は、LGTM（Looks Good To Me: 私は良いと思います）等のコメントをつけて確認したことを報告しましょう

![height:460px](./imgs/screen-shots/25_review_lgtm.png)

---

###### 7-1. Pull Requestの作成者は、「Merge pull request」をクリックして、Pull Requestを元のブランチに結合します

![height:460px](./imgs/screen-shots/26_merge_pull_request.png)

---

###### 7-2. Pull Requestが結合され、「Merged」と表示されることを確認します

![height:460px](./imgs/screen-shots/27_merged_pull_request.png)

---

##### 8. mainブランチを確認して、変更内容が正しく取り込まれていることを確認します

GitHubで開いてみましょう

---

<!--
header: 2-7. fetch / pull: GitHubリポジトリの変更部分をダウンロードしよう
-->

### 2-7. fetch / pull: GitHubリポジトリの変更部分をダウンロードしよう

---

### GitHubの更新を、PC上に取り込みましょう

これをfetch（フェッチ） / pull（プル）と呼びます

---

fetch（フェッチ）は、GitHub上のリモートリポジトリの**変更を確認**する操作です。  
pull（プル）は、GitHub上のリモートリポジトリの**変更をダウンロード**する操作です。

---

1. fetchしてGitHubの変更を確認して
2. pullしてその変更を取り込む

---

### というイメージになります

---

### 実際に取り込んでみましょう

---

###### 1. ステータスバーのブランチ名をクリックし、mainブランチに切り替えます

![height:460px](./imgs/screen-shots/28_checkout_main.png)

---

###### 2-1. ソース管理ビュー右上の「...」メニューから、「フェッチ」をクリックします

![height:460px](./imgs/screen-shots/29_fetch_pull_menu.png)

---

###### 2-2. これだけでは変更内容は取り込まれませんが、GitHub上で変更があったことをVSCodeが認識します

![height:460px](./imgs/screen-shots/29_fetch_pull_menu.png)

---

###### 3-1. ステータスバーのブランチ名の横に、「2↓」のように取り込める変更の数が表示されます

![height:460px](./imgs/screen-shots/30_sync_incoming.png)

---

###### 3-2. 同じ「...」メニューから「プル」をクリックします

変更内容が取り込まれ、ファイルが更新されます

![height:460px](./imgs/screen-shots/30_sync_incoming.png)

---

###### 4. 変更内容が取り込まれていることを、ソース管理ビューの「グラフ (Graph)」から確認します

![height:460px](./imgs/screen-shots/31_pull_results.png)

---

<!--
header: ""
-->

## 3. まとめ

_できるようになったことを、振り返ろう_

---

<style scoped>
section {
    font-size: 35px;
    line-height: 80px;
}
</style>

1. clone: GitHubリポジトリを丸ごとダウンロードする
2. branch: 作業を枝分かれさせて、他の開発者との衝突を防止する
3. 通常通りに、プログラムを書く
4. commit: 作業前と後の**差分を記録**する
5. push: 作業の成果をGitHubにアップロードして共有する
6. Pull Request: 枝分かれした成果を結合する
7. review: 他の開発者の作業内容を確認する

---

### これでGit入門は完璧です

お疲れ様でした！

![bg height:550px brightness:30%](./imgs/materials/06_mermaid_all.svg)
