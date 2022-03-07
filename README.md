## アプリ開発の動機

#### 目的

アパレル生産関係者(商社営業、メーカー企画など)における、
個々人が持っている情報資産を簡単に共有すること

#### 課題(動機)

前職は繊維商社の営業(生産管理)でした。モノづくりが事業の基盤になっている繊維商社やアパレルメーカーにおいて、
モノづくりの工程には必ず素材選定が必要です。営業担当それぞれが異なる得意先・仕入先・コネクションを持つが
社内で情報の共有が不十分である(=共有はしているが共有の仕方に問題がある)と思っていました。

## アプリの概要

#### 想定する使用対象者

アパレル生産関係者(商社営業、メーカー企画など)

#### システム要件(このアプリで期待できること)

- 素材・資材・製品に関する情報を簡潔にして、より個人・全体で管理しやすくなる
- 会議等による情報共有はハードルが高かったが、Web 上での投稿形式にすることで必要な情報を最小限の時間で取得・公開できる

#### 機能要件（このアプリに必要な機能)

以下、本アプリに実装した機能です

- ユーザー登録機能
- ログイン、ログアウト機能
- ユーザー情報更新機能
- グループアカウント作成機能
- グループとユーザーの紐付け機能(同一グループ内にのみ検索等の機能を制限する)
- 検索機能
- 投稿機能
- 履歴検索機能(自身の投稿履歴を検索する)
- 投稿編集機能

## アプリの詳細

#### サービス名

**Cloth-To**  
close to ～(～に接する又は身近な～)と Cloth(服)を掛け合わせている。  
服のアイデア・情報を持つ人と人やモノとモノ、人とモノを繋ぐ意味があります

#### 技術構成（※１）

| 項目              | 技術                        |
| ----------------- | --------------------------- |
| 言語              | TypeScript                  |
| ライブラリ        | React                       |
| フレームワーク１  | Next.js                     |
| フレームワーク２  | Nest.js                     |
| インフラ系（※２） | docker, AWS(RDS)            |
| データベース      | MySQL                       |
| ORM               | Prisma                      |
| スタイル          | TailwindCSS                 |
| アーキテクチャ    | クリーンアーキテクチャ      |
| UI デザイン       | アトミックデザイン          |
| ソース管理        | Git, Github                 |
| デプロイツール    | Vercel                      |
| エディタ          | Visual Studio Code          |
| タスク進捗管理    | Notion                      |
| その他設定        | Prettier,ESLint,babel etc.. |

_※１ 廣岡が作成したサンプルプロジェクトをベースにしています。_  
https://github.com/FashionMonster/ts-libraries-frameworks-template

_※２ docker は MySQL をローカルで起動するのに使用、AWS(RDS)は本番環境用 DB 作成に使用_

## アプリを実際に使ってみたい方へ

自身でサンプルデータを用意するのが面倒だと思いますので、事前に用意しました。  
以下を実施頂くと検索機能の動作等が確認しやすいです。

#### アプリ URL

https://cloth-to-2.vercel.app/
※1 MacBook Pro と iPhome6,7,8,X 以外は未検証なのでレイアウト崩れが発生するかもしれません  
※2 ブラウザは Google Chrome を推奨します(Chrome 以外は未検証のため)

#### サンプルユーザー

以下のユーザーでログインして、触ることができます。  
※勿論、自身でユーザー登録して使うこともできます  
ID: test@gmail.com  
PW: test12345678

#### 検索画面について

以下の手順で事前に登録しておいたサンプルデータ(20〜30 件)を画面に表示できます  
①「分類」を選択  
②「生地」を選択  
③ 検索ボタンを押下

## 現時点の技術的課題

アプリ開発を通じて、改善が必要な箇所や自身の課題が見えました。
今後修正や学習をしていく予定です。

- パスワードを表示することができない  
  → 目のアイコンを追加して、ユーザーが確認できるよう修正が必要
- 編集画面において、画像を選択しないと更新ができない  
  → 編集時は画像選択をしなくても更新できるよう修正が必要
- 一部、型定義が曖昧(any)なデータが存在する  
  → 型を明示する修正が必要
- インフラ(AWS)の知識が乏しく、VPC(セキュリティ)や設定がまだしっかりできていない  
  → AWS の基本から勉強が必要
- 単体テスト等では、今回は打鍵のみで確認を行なっていた  
  → Jest 等を使用したテストを実施する
