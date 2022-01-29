import { firebase } from 'common/utils/frontend/firebase';

//ログインチェック
const checkLogin = (): string | null => {
  let loginedUserEmail = null;
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    if (user !== null) {
      loginedUserEmail = user.email;
    }
  });

  return loginedUserEmail;
};

export { checkLogin };
