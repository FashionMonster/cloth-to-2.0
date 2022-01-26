//投稿画像テーブルデータの型定義
type ContributionImageEntity = {
  readonly imageUrl1: string;
  readonly imageUrl2: string | null;
  readonly imageUrl3: string | null;
  readonly imageUrl4: string | null;
  readonly imageUrl5: string | null;
};

export type { ContributionImageEntity };
