import { firebase } from 'common/utils/frontend/firebase';

const downloadImage = async (fileId: string): Promise<string> => {
  let storageRef = firebase.storage().ref();

  const downloadUrl: string | void = await storageRef
    .child(fileId)
    .getDownloadURL()
    .then((url: string) => {
      return url;
    })
    .catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found':
          throw 'ファイルが存在しません。投稿して下さい';
        case 'storage/unauthorized':
          throw '未認証のユーザーです。ログインしてください';
        case 'storage/unknown':
          throw '予期しないエラーが発生しました';
        default:
          throw '予期しないエラーが発生しました';
      }
    });

  return downloadUrl;
};

export { downloadImage };
