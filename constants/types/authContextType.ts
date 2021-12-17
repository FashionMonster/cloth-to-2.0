import type { LoginUserInfo } from 'constants/types/loginUserInfo';

//認証コンテキストの型定義
type AuthContextType = {
  loginUserInfo: LoginUserInfo;
  setLoginUserInfo: React.Dispatch<
    React.SetStateAction<{ userId: string; userName: string; groupId: string }>
  >;
};

export type { AuthContextType };
