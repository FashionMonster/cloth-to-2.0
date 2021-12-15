import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { checkLogin } from 'common/utils/checkLogin';
import { getUserInfo } from 'common/utils/getUserInfo';
import type { PropsChildlen } from 'constants/types/propsChildlen';
import type { AuthContextType } from 'constants/types/authContextType';
import type { LoginUserInfo } from 'constants/types/loginUserInfo';

//コンテキストの初期化
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.VFC<PropsChildlen> = (props) => {
  const router = useRouter();
  const [loginUserInfo, setLoginUserInfo] = useState({
    userId: '',
    userName: '',
    groupId: '',
  });

  // //リロード、URL直叩き時
  // useEffect(() => {
  //   //ログインが必要な画面の場合
  //   if (router.asPath !== '/' && router.asPath !== '/signup' && router.asPath !== '/login') {
  //     //ログインチェック
  //     checkLogin().then((isLogin) => {
  //       if (isLogin) {
  //         //ログインユーザー情報を取得
  //         getUserInfo().then((res) => {
  //           setUserInfo({
  //             userId: res.userId,
  //             userName: res.userName,
  //             groupId: res.groupId,
  //           });
  //         });
  //       } else {
  //         //ログイン画面へ遷移
  //         Router.push('/login');
  //       }
  //     });
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ loginUserInfo, setLoginUserInfo }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
