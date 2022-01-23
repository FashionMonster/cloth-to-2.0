//投稿データ取得の型定義DTO
type ContributionInfoDto = {
  contributionId: number;
  materialName: string;
  imageUrl1: string | null;
};

export type { ContributionInfoDto };
