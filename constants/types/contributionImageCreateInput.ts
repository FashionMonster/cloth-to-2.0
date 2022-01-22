//投稿画像情報登録の型定義
type ContributionImageCreateInput = {
  contributionId: number;
  imageUrl1: string;
  imageUrl2?: string | null;
  imageUrl3?: string | null;
  imageUrl4?: string | null;
  imageUrl5?: string | null;
};

export type { ContributionImageCreateInput };
