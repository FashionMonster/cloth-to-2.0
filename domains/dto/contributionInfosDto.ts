//投稿データ取得の型定義DTO
type ContributionInfosDto = {
  contributionId: number;
  materialName: string;
  imageUrl1: string | null;
}[];

export type { ContributionInfosDto };
