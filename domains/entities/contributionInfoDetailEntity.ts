import { ContributionImageEntity } from 'domains/entities/ContributionImageEntity';
//投稿情報テーブル詳細取得の型定義
type ContributionInfoDetailEntity = {
  readonly contributionId: number;
  readonly materialName: string;
  readonly category: string;
  readonly composition1: string | null;
  readonly compositionRatio1: number | null;
  readonly composition2: string | null;
  readonly compositionRatio2: number | null;
  readonly composition3: string | null;
  readonly compositionRatio3: number | null;
  readonly fabricStructure: string | null;
  readonly color: string | null;
  readonly pattern: string | null;
  readonly processing: string | null;
  readonly unitPrice: number | null;
  readonly supplier: string | null;
  readonly comment: string | null;
  readonly relationContributionImage: ContributionImageEntity | null;
};

export type { ContributionInfoDetailEntity };
