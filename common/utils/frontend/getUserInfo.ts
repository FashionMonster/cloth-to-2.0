import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type { LoginResType } from 'constants/types/response/loginResType';

//ユーザー情報取得
const getUserInfo = async (userIdParam: string): Promise<LoginResType> => {
  const baseUrl: AxiosInstance = axios.create({
    baseURL: window.location.protocol + '//' + window.location.host,
  });

  //ユーザーID(メールアドレス)に紐付く情報を取得
  const res: AxiosResponse<{ userInfo: LoginResType }> = await baseUrl
    .get('./api/user/getUserInfo', {
      params: {
        userId: userIdParam,
      },
    })
    .catch((error: any) => {
      throw error;
    });

  return res.data.userInfo;
};

export { getUserInfo };
