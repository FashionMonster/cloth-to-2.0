import { fb } from './firebase';

//ログインチェック
const checkLogin = (): Promise<boolean> => {
  return new Promise((resolve) => {
    fb.auth().onAuthStateChanged((user: string) => {
      if (user !== null) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export { checkLogin };
