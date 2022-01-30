import Router from 'next/router';
import type { SetterOrUpdater } from 'recoil';
import { QueryClient } from 'react-query';
import { firebase } from 'common/utils/frontend/firebase';

//ログアウト
const logout = async (
  setLoginUserInfo: SetterOrUpdater<any>,
  queryClient: QueryClient
): Promise<void> => {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      //ログインユーザー情報を初期化する
      setLoginUserInfo({
        userId: '',
        userName: '',
        groupId: '',
      });

      //react-queryで保持したキャッシュをクリアする
      queryClient.clear();

      //ログアウト後TOP画面に遷移
      Router.push('/');
    });
};

export { logout };
