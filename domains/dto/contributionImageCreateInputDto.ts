//投稿画像情報テーブル登録データの型定義
type ContributionImageCreateInputDto = {
  contributionId: number;
  imageName1: string;
  imageName2?: string | null;
  imageName3?: string | null;
  imageName4?: string | null;
  imageName5?: string | null;
};

export type { ContributionImageCreateInputDto };
