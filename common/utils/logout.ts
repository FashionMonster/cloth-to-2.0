import Router from 'next/router';
import { firebase } from 'common/utils/firebase';

//ログアウト
const logout = async () => {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      //ログアウト後画面遷移
      Router.push('/login');
    });
};

export { logout };
