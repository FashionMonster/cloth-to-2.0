import Router from 'next/router';
import { firebase } from 'common/utils/frontend/firebase';
import { AuthContextType } from 'constants/types/authContextType';

//ログアウト
const logout = async (contextVal: AuthContextType): Promise<void> => {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      //コンテキストバリューを初期化する
      contextVal.setLoginUserInfo({
        userId: '',
        userName: '',
        groupId: '',
      });

      //ログアウト後TOP画面に遷移
      Router.push('/');
    });
};

export { logout };
