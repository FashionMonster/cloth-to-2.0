import { firebase } from './firebase';

const downloadImage = (fileId: string): Promise<string> => {
  let storageRef = firebase.storage().ref();

  return new Promise((resolve, reject) => {
    storageRef
      .child(fileId)
      .getDownloadURL()
      .then((url: string) => {
        // const test = new Error();
        // test.code = "storage/unauthorized";
        // throw test;
        resolve(url);
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            reject('ファイルが存在しません。投稿して下さい');
            break;
          case 'storage/unauthorized':
            reject('未認証のユーザーです。ログインしてください');
            break;
          case 'storage/unknown':
            reject('予期しないエラーが発生しました');
            break;
          default:
        }
      });
  });
};

export { downloadImage };

// import { firebase } from './firebase';

// const downloadImage = (fileId: string): Promise<string> => {
//   return firebase
//     .storage()
//     .ref()
//     .child(fileId)
//     .getDownloadURL()
//     .then((url: string) => {
//       // const test = new Error();
//       // test.code = "storage/unauthorized";
//       // throw test;
//       console.log('取得URL：' + url);
//       return url;
//     })
//     .catch((error) => {
//       switch (error.code) {
//         case 'storage/object-not-found':
//           return 'ファイルが存在しません。投稿して下さい';
//         case 'storage/unauthorized':
//           return '未認証のユーザーです。ログインしてください';
//         case 'storage/unknown':
//           return '予期しないエラーが発生しました';
//         default:
//           return '予期しないエラーが発生しました';
//       }
//     });
// };

// export { downloadImage };
