import axios from 'axios';
import { isExistValue } from 'common/utils/isExistValue';
import type { LoginUserInfo } from 'constants/types/loginUserInfo';

//ユーザー情報取得
const getUserInfo = async (paramUserId: string): Promise<LoginUserInfo> => {
  const baseUrl = axios.create({
    baseURL: window.location.protocol + '//' + window.location.host,
  });

  //ユーザーID(メールアドレス)に紐付く情報を取得
  const userAccount: any = await baseUrl
    .get('./api/user/getUserInfo', {
      params: {
        userId: paramUserId,
      },
    })
    .catch((error) => {
      throw error;
    });

  //Firebaseの認証処理を通過しているので、データがある前提でセット
  const userInfo: LoginUserInfo = {
    userId: paramUserId,
    userName: userAccount.data.userName,
    groupId: userAccount.data.groupId,
  };

  return userInfo;
};

export { getUserInfo };
