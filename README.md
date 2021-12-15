本アプリは以下で作成したサンプルを元に開発しています

Next.js,Nest.js を中心に色々組み込んだサンプルプロジェクト

## 技術構成

| 項目             | 技術                        |
| ---------------- | --------------------------- |
| 言語             | TypeScript                  |
| ライブラリ       | React                       |
| フレームワーク１ | Next.js                     |
| フレームワーク２ | Nest.js                     |
| インフラ         | docker                      |
| データベース     | MySQL                       |
| ORM              | Prisma                      |
| スタイル         | TailwindCSS                 |
| アーキテクチャ   | クリーンアーキテクチャ      |
| UI デザイン      | アトミックデザイン          |
| ソース管理       | Git, Github                 |
| エディタ         | Visual Studio Code          |
| その他設定       | Prettier,ESLint,babel etc.. |

## 始め方

#### 1. ソースのクローン

```bash
git clone https://github.com/FashionMonster/ts-libraries-frameworks-template.git
```

#### 2. パッケージをインストール

```bash
npm install
# or
yarn
```

#### 3. docker の導入(MySQL)　※Docker Desktop をインストールしていることが前提

3.1 イメージの作成

```bash
cd docker-compose.ymlのあるディレクトリ
docker-compose build
```

3.2 コンテナの作成、起動

```bash
docker-compose up -d
```

#### 4. [DB マイグレーションの実行](https://docs.nestjs.com/recipes/prisma#set-up-prisma)

→ prisma/schema.prisma に定義した内容でローカル DB にテーブルが作成されれば OK

```bash
npx prisma migrate dev --name init
```

#### 5. プロジェクトの起動

```bash
npm run dev
# or
yarn dev
```

#### 6. ブラウザで http://localhost:3000 を開く

#### 7. 「Nest 初回リクエスト」ボタンをクリックして、「Hello World!」と表示されれば OK

![image](https://user-images.githubusercontent.com/42830906/144754252-d8f977a2-c252-4d0c-9839-c77337e58780.png)

#### 8. 「Prisma ユーザー作成」、「Prisma ポスト作成」、「Prisma ポスト取得」ボタンでローカル DB にデータの登録、取得ができれば OK

![image](https://user-images.githubusercontent.com/42830906/144859103-7573ee5b-5475-4889-ba9a-6d969beecd39.png)

## 作成過程

#### 1. [Next.js（TypeScript）の雛形プロジェクト作成](https://nextjs.org/docs/basic-features/typescript)

```bash
npx create-next-app@latest --ts
# or
yarn create next-app --typescript
```

#### 2. [Nest.js に必要なパッケージをインストール](https://docs.nestjs.com/)

```bash
npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
# or
yarn add @nestjs/core @nestjs/common rxjs reflect-metadata
```

#### 3. [pages/api 配下に\[...routes\].ts を作成する　※"routes"は別の名前でも問題ない](https://nextjs.org/docs/api-routes/dynamic-api-routes#catch-all-api-routes)

#### 4. \[...routes\].ts に Nest.js アプリケーションインスタンスの生成とミドルウェアを設定

#### 5. [クリーンアーキテクチャに沿ったフォルダ（とそのサブディレクトリ）を作成](https://kkoudev.netlify.app/2020/05/nextjs-architecture-design/)

- interfaces
- usecases
- domains
- infrastructures

#### ６. Nest .js の Controller, Provider, Module ファイルを作成

- interfaces/controllers/app.controller.ts
- usecases/app.service.ts
- domains/usecases/app.module.ts

#### 7. Nest.js の service を DI する箇所でエラーが発生しないように設定

7-1 設定に必要なパッケージをインストールしておく

```bash
npm i --save-dev babel-plugin-transform-typescript-metadata @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-proposal-private-methods @babel/plugin-proposal-private-property-in-object
# or
yarn add --dev babel-plugin-transform-typescript-metadata @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-proposal-private-methods @babel/plugin-proposal-private-property-in-object
```

7-2 .babelrc を作成する

#### 8. tsconfig.json の編集（デコレータの有効化など）

#### 9. ESLint と Prettier の導入

9-1 設定に必要なパッケージをインストール

```bash
npm i --save-dev prettier eslint-config-prettier
# or
yarn add --dev prettier eslint-config-prettier
```

9-2 .prettierrc を作成、eslintrc.json を編集

9-3 [VSCode の拡張機能をインストール](https://qiita.com/genbu-jp/items/a48bcb9df209b71c2de3)

#### 10. [TailwindCSS の導入](https://fwywd.com/tech/next-tailwind)

10-1 設定に必要なパッケージをインストール

```bash
npm install --save-dev tailwindcss@latest postcss@latest autoprefixer@latest
# or
yarn add --dev tailwindcss@latest postcss@latest autoprefixer@latest
```

10-2 設定ファイルの作成

- tailwind.config.js
- postcss.config.js
- globals.css

10-3 TailwindCSS を全ファイルに適用する

10-4 pages/\_app.tsx に以下のコードを追加する

```
import '../globals.css';
```

#### 11. docker の導入(MySQL)　※Docker Desktop をインストールしていることが前提

11-1 docker-compose.yml を作成

11-2 イメージの作成

```bash
cd docker-compose.ymlのあるディレクトリ
docker-compose build
```

11-3 コンテナの作成、起動

```bash
docker-compose up -d
```

11-4 コンテナの停止、削除 （必要な時に使用）

```bash
docker-compose down
```

#### 12. Prisma の導入

12-1 [Prisma Client のセットアップ](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-mysql)

```bash
npm install prisma --save-dev
# or
yarn add --dev prisma
```

```bash
npm install @prisma/client
# or
yarn add @prisma/client
```

```bash
npx prisma init
```

12-2 [.env と prisma/schema.prisma の編集](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-mysql/)
**※ローカル以外の DB 接続を定義する場合、.env は git の管理対象から外すように.gitignore を編集する**

12-3 [データモデルを定義する](https://docs.nestjs.com/recipes/prisma#set-up-prisma)

prisma/schema.prisma
サンプル

```typescript
model User {
  id    Int     @default(autoincrement()) @id
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean? @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

12-4 [DB マイグレーションの実行](https://docs.nestjs.com/recipes/prisma#set-up-prisma)
→ prisma/schema.prisma に定義した内容でローカル DB にテーブルが作成されれば OK **※Docker コンテナ(MySQL)が起動していることが前提**

```bash
npx prisma migrate dev --name init
```

12-5 [DB 接続サービスファイルの作成](https://docs.nestjs.com/recipes/prisma#set-up-prisma)

- usecases/prisma.service.ts

12-6 [サービスファイル（クエリ実行）の作成](https://docs.nestjs.com/recipes/prisma#set-up-prisma)

- usecases/user.service.ts
- usecases/post.service.ts

12-7 [コントローラーファイル（サービス呼出し）の作成](https://docs.nestjs.com/recipes/prisma#set-up-prisma)
参照リンクの「app.controller.ts」をモデル毎に分割しています

- interfaces/controllers/user.controller.ts
- interfaces/controllers/post.controller.ts

12-8 domains/usecases/app.module.ts に 12-5〜12-7 で作成した Controller, Service を追加

```typescript
const CONTROLLER_ARRAY = [AppController, UserController, PostController];
const SERVICE_ARRAY = [PrismaService, AppService, UserService, PostService];

@Module({
  imports: [],
  controllers: CONTROLLER_ARRAY,
  providers: SERVICE_ARRAY,
})
export class AppModule {}
```

12-9 index.tsx にリクエスト処理を追加

- Prisma ユーザー作成
- Prisma ポスト作成
- Prisma ポスト取得

#### 13. 「始め方」の 4 以降を実行

## ディレクトリ構成

記載予定

## デプロイ方法

記載予定
