import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { checkLogin } from 'common/utils/frontend/checkLogin';
import { getUserInfo } from 'common/utils/frontend/getUserInfo';
import type { AuthContextType } from 'constants/types/authContextType';
import type { LoginUserInfo } from 'constants/types/loginUserInfo';
import { isExistValue } from 'common/utils/isExistValue';

//引数の型定義
type Props = {
  children: React.ReactNode;
};

//コンテキストの初期化
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.VFC<Props> = (props) => {
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
  //         //TOP画面へ遷移
  //         Router.push('/');
  //       }
  //     });
  //   }
  // }, []);

  // //リロード、URL直叩き時
  // useEffect(() => {
  //   //ログインが必要な画面の場合
  //   if (router.asPath !== '/' && router.asPath !== '/signup' && router.asPath !== '/login') {
  //     //ログインチェック

  //     //TODO: 関数名の変更、動作確認
  //     let loginedUserId = checkLogin();

  //     if (isExistValue(loginedUserId)) {
  //       //ログインユーザー情報を取得
  //       getUserInfo(loginedUserId!).then((res) => {
  //         setLoginUserInfo({
  //           userId: res.userId,
  //           userName: res.userName,
  //           groupId: res.groupId,
  //         });
  //       });
  //     } else {
  //       //TOP画面へ遷移
  //       Router.push('/');
  //     }
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ loginUserInfo, setLoginUserInfo }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
