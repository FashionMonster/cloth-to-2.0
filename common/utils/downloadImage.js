import { fb } from "./firebase";

const downloadImage = (fileName) => {
  var storageRef = fb.storage().ref();

  return new Promise(function (resolve, reject) {
    storageRef
      .child(fileName)
      .getDownloadURL()
      .then(function (url) {
        // const test = new Error();
        // test.code = "storage/unauthorized";
        // throw test;
        resolve(url);
      })
      .catch(function (error) {
        switch (error.code) {
          case "storage/object-not-found":
            reject("ファイルが存在しません。投稿して下さい");
            break;
          case "storage/unauthorized":
            reject("未認証のユーザーです。ログインしてください");
            break;
          case "storage/unknown":
            reject("予期しないエラーが発生しました");
            break;
          default:
        }
      });
  });
};

export { downloadImage };
