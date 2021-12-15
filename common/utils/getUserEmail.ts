import { firebase } from './firebase';

//メールアドレス(ID)取得
const getUserEmail = (): string | null => {
  let email: string | null = null;
  firebase.auth().onAuthStateChanged((user: any) => {
    if (user !== null) {
      email = user.email;
    }
  });

  return email;
};

export { getUserEmail };
