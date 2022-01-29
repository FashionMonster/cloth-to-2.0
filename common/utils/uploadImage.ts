import Compressor from 'compressorjs';
import { nanoid } from 'nanoid';
import { firebase } from './firebase';
import { isExistValue } from './isExistValue';
import type { ReadImageType } from 'constants/types/readImageType';

//画像アップロード
const uploadImage = (imgFiles: ReadImageType[]): string[] => {
  let idList: string[] = [];

  for (const file of imgFiles) {
    //空データの場合
    if (!isExistValue(file.imgFileBlob)) {
      continue;
    } else {
      //乱数を生成
      const id = nanoid();
      idList.push(id);

      //画像をリサイズ
      const payload = {
        quality: 0.6,
        maxWidth: 480,
        maxHeight: 480,
        mimeType: 'image/jpeg',
        success(blob: Blob) {
          //Firebase Storageに画像をアップロード
          let storageRef = firebase.storage().ref(id);
          storageRef.put(blob);
        },
        error(error: any) {
          throw error;
        },
      };

      new Compressor(file.imgFileBlob, payload);
    }
  }

  return idList;
};

export { uploadImage };
