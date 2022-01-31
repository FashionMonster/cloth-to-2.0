//投稿データ登録・更新フォームの型定義
type ContributeFormType = {
  isInit: boolean;
  userId: string;
  groupId: string;
  materialName: string;
  category: string;
  composition1?: string;
  compositionRatio1?: number;
  composition2?: string;
  compositionRatio2?: number;
  composition3?: string;
  compositionRatio3?: number;
  fabricStructure?: string;
  color?: string;
  pattern?: string;
  processing?: string;
  unitPrice?: number;
  supplier?: string;
  comment?: string;
  imageName: string[];
  imageFiles?: FileList; //フォーム内のnameなので一時的に必要
};

export type { ContributeFormType };
