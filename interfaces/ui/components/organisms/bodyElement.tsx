import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isExistValue } from 'common/utils/isExistValue';
import { useRecoilState } from 'recoil';
import { loginUserState } from 'common/utils/frontend/loginUserState';

//引数の型定義
type Props = {
  isLogined: boolean;
  children: React.ReactNode;
};

//ボディーコンポーネント
const Body: React.VFC<Props> = (props) => {
  const router = useRouter();
  const [loginUserInfo] = useRecoilState(loginUserState);

  //リロード、URL直叩き時
  useEffect(() => {
    //ログインが必要な画面の場合
    if (
      router.asPath !== '/' &&
      router.asPath !== '/signup' &&
      router.asPath !== '/login' &&
      !isExistValue(loginUserInfo.userId)
    ) {
      //ログイン画面へ遷移
      router.push('/login');
    }

    //ログインが必要な画面の場合
    if (
      router.asPath !== '/' &&
      router.asPath !== '/signup' &&
      router.asPath !== '/login' &&
      router.asPath !== '/groupSetting' &&
      isExistValue(loginUserInfo.userId) &&
      !isExistValue(loginUserInfo.groupId)
    ) {
      //ログイン画面へ遷移
      router.push('/linkUserToGroup');
    }
  }, []);

  //ログインが必要な画面の場合
  if (
    router.asPath !== '/' &&
    router.asPath !== '/signup' &&
    router.asPath !== '/login' &&
    !isExistValue(loginUserInfo.userId)
  ) {
    //ログイン画面に遷移前、空画面を表示する　※これがない場合、一瞬画面が見えてしまうため
    return <></>;
  }

  //ログインの有無で適用するスタイルを切替え
  const gridLayout = props.isLogined ? 'grid-rows-loginedBody' : 'grid-rows-body';

  return (
    <body className={`relative grid ${gridLayout} gap-8 min-h-screen sm:grid-rows-sm_body`}>
      {props.children}
    </body>
  );
};

export { Body };
