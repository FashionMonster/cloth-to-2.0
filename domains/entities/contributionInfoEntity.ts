//投稿データ取得の型定義
type ContributionInfoEntity = {
  readonly contributionId: number;
  readonly materialName: string;
  readonly relationContributionImage: { imageName1: string } | null;
};

export type { ContributionInfoEntity };
