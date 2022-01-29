import { firebase } from 'common/utils/frontend/firebase';

//メールアドレス(ID)取得
const getUserEmail = (): string | null => {
  let email: string | null = null;
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    if (user !== null) {
      email = user.email;
    }
  });

  return email;
};

export { getUserEmail };
