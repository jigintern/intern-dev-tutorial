# Claude Code 学習資料

## 0. 事前準備

### 0-1. Visual Studio Code をインストールする

Claude Code は **Visual Studio Code（VS Code）の拡張機能**として利用するのがおすすめです。  
エディタが無い場合は、以下URLから VS Code をインストールしてください。  
既に使い慣れたエディタがある場合はそちらでも構いませんが、本資料は VS Code を前提に進めます。

- [Visual Studio Code Installation](https://code.visualstudio.com/)

### 0-2. Claude Code 拡張機能をインストールする

VS Code を開き、以下の手順で拡張機能をインストールします。  
**この拡張機能をメインに使って学習を進めます。**

1. 拡張機能ビューを開く（Mac: `Cmd+Shift+X` / Windows・Linux: `Ctrl+Shift+X`）
2. 検索欄に「**Claude Code**」と入力する
3. 「Claude Code」（発行元: Anthropic）の「**インストール**」をクリックする
4. インストール後に「Get started with Claude Code」という画面が開くことがあります。左のアクティビティバーに Spark アイコン（✱）が表示されていればインストール完了です

> Topic: インストール後に表示されない場合は、コマンドパレット（Mac: `Cmd+Shift+P` / Windows・Linux: `Ctrl+Shift+P`）から `Developer: Reload Window` を実行してください。

### 0-3. ログインについて

Claude Code を初めて開くと、ログイン方法の選択画面が表示されます。  
「**Claude.ai Subscription**」を選び、ブラウザで **Anthropic アカウントにサインイン**してください（コマンドラインの場合は `/login`）。  

## 1. 目次

1. [導入編 (15min)](./docs.md#1-導入編)
    - 1-1. [Claude Code とは何か？](./docs.md#1-1-claude-code-とは何か)
    - 1-2. [Claude Code で何ができるのか？](./docs.md#1-2-claude-code-で何ができるのか)
    - 1-3. [安全の仕組み（権限承認）](./docs.md#1-3-安全の仕組み権限承認)

2. [Claude Code を触ってみよう (50min)](./docs.md#2-claude-code-を触ってみよう)
    - 2-1. [Claude パネルを開こう](./docs.md#2-1-claude-パネルを開こう)
    - 2-2. [プロンプトを送ってみよう](./docs.md#2-2-プロンプトを送ってみよう)
    - 2-3. [変更を依頼して差分を確認・承認しよう](./docs.md#2-3-変更を依頼して差分を確認承認しよう)
    - 2-4. [ファイルや行を参照させよう](./docs.md#2-4-ファイルや行を参照させよう)
    - 2-5. [コマンドを使おう](./docs.md#2-5-コマンドを使おう)
    - 2-6. [過去の会話を再開しよう](./docs.md#2-6-過去の会話を再開しよう)
    - 2-7. [CLAUDE.md でルールを覚えさせよう](./docs.md#2-7-claudemd-でルールを覚えさせよう)
    - 2-8. [モデルと Effort について](./docs.md#2-8-モデルと-effort-について)

3. [うまく使うコツ・困ったとき](./docs.md#3-うまく使うコツ困ったとき)

## 2. URL

- テキスト: [資料](./docs.md)

## 3. 参考リンク（公式ドキュメント）

- [概要](https://code.claude.com/docs/ja/overview)
- [VS Code で使う](https://code.claude.com/docs/ja/vs-code)
- [ベストプラクティス](https://code.claude.com/docs/ja/best-practices)
