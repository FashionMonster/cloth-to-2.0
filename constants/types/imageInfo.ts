//取得した画像情報データの型定義
type ImageInfo = {
  imgFileBlob: File;
  imgFileUrl: string | ArrayBuffer | null;
  fileName: string;
};

export type { ImageInfo };
