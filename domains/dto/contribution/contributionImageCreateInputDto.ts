//投稿画像情報テーブル登録データの型定義
type ContributionImageCreateInputDto = {
  contributionId: number;
  imageUrl1: string;
  imageUrl2?: string | null;
  imageUrl3?: string | null;
  imageUrl4?: string | null;
  imageUrl5?: string | null;
};

export type { ContributionImageCreateInputDto };