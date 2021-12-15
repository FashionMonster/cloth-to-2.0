import { useContext, useRef, useState } from 'react';
import Router from 'next/router';
import { AuthContext } from 'interfaces/ui/components/organisms/authProvider';
import { login } from 'common/utils/login';
import { getFbAuthErrorMsg } from 'common/utils/getFbAuthErrorMsg';
import { getUserInfo } from 'common/utils/getUserInfo';
import type { AuthContextType } from 'constants/types/authContextType';
import type { LoginUserInfo } from 'constants/types/loginUserInfo';
import type { UserFormData } from 'constants/types/userFormData';
import type { SubmitHandler } from 'node_modules/react-hook-form/dist/types/form';

//返却値の型定義
type ReturnVal = {
  isModalOpen: boolean;
  modalMessage: { current: string };
  submit: SubmitHandler<UserFormData>;
};

const useLogin = (): ReturnVal => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalMessage = useRef<string>('');
  //any型は要修正
  const { setLoginUserInfo }: any = useContext<AuthContextType | undefined>(AuthContext);

  //入力情報を元にログイン処理
  const submit = async (data: UserFormData) => {
    //Firebaseのログイン認証
    try {
      await login(data.userId, data.password);
    } catch (error: any) {
      //エラーメッセージをセット
      modalMessage.current = getFbAuthErrorMsg(error.code);

      //モーダルを開く
      setIsModalOpen(true);

      return;
    }

    //Firebase, DBからユーザー情報を取得
    try {
      //ユーザー情報を取得
      const res: LoginUserInfo = await getUserInfo(data.userId);

      //コンテキストにユーザー情報をセット
      setLoginUserInfo({
        userId: res.userId,
        userName: res.userName,
        groupId: res.groupId,
      });

      //グループ紐付け完了済の方はログイン後、検索画面へ遷移
      if (res.groupId !== '' && res.groupId !== null) {
        Router.push('/search');
        //グループ紐付け未完了の場合
      } else {
        Router.push('/linkUserToGroup');
      }
    } catch (error: any) {
      throw error;
    }
  };

  return { isModalOpen, modalMessage, submit };
};

export { useLogin };
