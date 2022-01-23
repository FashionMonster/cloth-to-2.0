//投稿データ取得の型定義
type ContributionInfosEntity = {
  readonly contributionId: number;
  readonly materialName: string;
  readonly relationContributionImage: { imageUrl1: string } | null;
}[];

export type { ContributionInfosEntity };
