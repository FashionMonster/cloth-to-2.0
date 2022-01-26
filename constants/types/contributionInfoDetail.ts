//取得した投稿データ詳細の型定義
type ContributionInfoDetail = {
  contributionId: number;
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
  imageName: string[];
  imageUrl: string[]; //imageNameからdownloadURLを取得した際に使用
};

export type { ContributionInfoDetail };
