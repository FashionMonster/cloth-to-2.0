//読み込み画像データの型定義
type ReadImageType = {
  imgFileBlob: File;
  imgFileUrl: string | ArrayBuffer | null;
  fileName: string;
};

export type { ReadImageType };
