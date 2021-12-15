import Compressor from "compressorjs";
import { nanoid } from "nanoid";
import { fb } from "./firebase";

//FireBase Storageに画像アップロード
const uploadImage = (imgFile) => {
  let idList = [];

  for (const file of imgFile) {
    //空データの場合
    if (file.imgFileBlob === null) {
      idList.push(null);
    } else {
      //乱数を生成
      const id = nanoid();
      idList.push(id);

      //画像をリサイズ
      const payload = {
        quality: 0.6,
        maxWidth: 480,
        maxHeight: 480,
        mimeType: "image/jpeg",
        success(blob) {
          let storageRef = fb.storage().ref(id);
          storageRef.put(blob);
        },
        error(err) {
          throw err;
        },
      };

      new Compressor(file.imgFileBlob, payload);
    }
  }

  return idList;
};

export { uploadImage };
