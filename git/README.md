# Git / Github 学習資料

## 0. 事前準備
### 0-1. Git をインストールする

本資料では、**Git** を利用します。以下を参考にインストールしてください。  
既にインストール済みの場合はスキップして構いません（ターミナルで `git -v` を実行して、バージョンが表示されれば導入済みです）。

- macOS: ターミナルで `xcode-select --install` を実行
- Windows: [Git for Windows](https://gitforwindows.org/) をインストール

### 0-2. Visual Studio Code をインストールする

本資料では、**Visual Studio Code**（VSCode）の Git 機能を利用して開発を進めます。  
以下 URL からインストールしてください。

- [Visual Studio Code Installation](https://code.visualstudio.com/)

### 0-3. Git の初期設定をする

コミットの記録に使われる名前とメールアドレスを設定します。  
未設定のままだとコミットできないため、ターミナルで以下を実行してください。

```sh
git config --global user.name "自分の名前"
git config --global user.email "自分のメールアドレス"
```

### 0-4. Github アカウントを準備する

[Github](https://github.com/) のアカウントを作成しておいてください。  
VSCode から Github へのサインインは、本編（2-5. push）の中で行います。

## 1. 目次

1. [導入編 (10min)](./docs.md#1-導入編)
    - 1-1. [Gitとは何か？](./docs.md#1-1-gitとは何か)
    - 1-2. [Githubとは何か？](./docs.md#1-2-githubとは何か)
    - 1-3. [VSCodeのGit機能とは何か？](./docs.md#1-3-vscodeのgit機能とは何か)

2. [VSCodeのGit機能を触ってみよう (50min)](./docs.md#2-vscodeのgit機能を触ってみよう)
    - 2-1. [clone: Githubリポジトリを丸ごとダウンロードしよう](./docs.md#2-1-clone-githubリポジトリを丸ごとダウンロードしよう)
    - 2-2. [branch: 作業を枝分かれさせよう](./docs.md#2-2-branch-作業を枝分かれさせよう)
    - 2-3. [commit: 作業前と後の**差分を記録**しよう](./docs.md#2-3-commit-作業前と後の差分を記録しよう)
    - 2-4. [log: 作業の履歴を確認しよう](./docs.md#2-4-log-作業の履歴を確認しよう)
    - 2-5. [push: 作業の成果をGithubにアップロードして共有しよう](./docs.md#2-5-push-作業の成果をgithubにアップロードして共有しよう)
    - 2-6. [Pull Request: 枝分かれした成果を結合しよう](./docs.md#2-6-pull-request-枝分かれした成果を結合しよう)
    - 2-7. [fetch / pull: Githubリポジトリの変更部分をダウンロードしよう](./docs.md#2-7-fetch--pull-githubリポジトリの変更部分をダウンロードしよう)


## 2. URL

- テキスト: [資料](./docs.md)
- スライド: [プレゼンテーション表示](https://jigintern.github.io/intern-dev-tutorial/git/git-vscode-slide.html)， [一覧表示](https://jigintern.github.io/intern-dev-tutorial/git/git-vscode-slide.pdf)
