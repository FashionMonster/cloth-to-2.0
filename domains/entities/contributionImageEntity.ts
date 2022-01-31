//投稿画像テーブルデータの型定義
type ContributionImageEntity = {
  readonly imageName1: string;
  readonly imageName2: string | null;
  readonly imageName3: string | null;
  readonly imageName4: string | null;
  readonly imageName5: string | null;
};

export type { ContributionImageEntity };
