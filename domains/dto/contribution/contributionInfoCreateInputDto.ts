//投稿情報テーブル登録データの型定義
type ContributionInfoCreateInputDto = {
  contributionId?: number;
  groupId: string;
  userId: string;
  materialName: string;
  category: string;
  composition1?: string | null;
  compositionRatio1?: number | null;
  composition2?: string | null;
  compositionRatio2?: number | null;
  composition3?: string | null;
  compositionRatio3?: number | null;
  fabricStructure?: string | null;
  color?: string | null;
  pattern?: string | null;
  processing?: string | null;
  unitPrice?: number | null;
  supplier?: string | null;
  comment?: string | null;
  isDeleted?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type { ContributionInfoCreateInputDto };
