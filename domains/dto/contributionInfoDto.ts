//投稿データ取得の型定義DTO
type ContributionInfoDto = {
  contributionId: number;
  materialName: string;
  imageName1: string | null;
};

export type { ContributionInfoDto };
