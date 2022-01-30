import { useContext, useRef, useState } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { InputLabel } from 'interfaces/ui/components/atoms/others/inputLabel';
import { InputEmail } from 'interfaces/ui/components/atoms/textBoxes/inputEmail';
import { InputPassword } from 'interfaces/ui/components/atoms/textBoxes/inputPassword';
import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
import { ModalWindow } from 'interfaces/ui/components/molecules/others/modalWindow';
import { Loading } from 'interfaces/ui/components/atoms/others/loading';
import { Error } from 'interfaces/ui/components/organisms/error';
import { login } from 'common/utils/frontend/login';
import { getUserInfo } from 'common/utils/frontend/getUserInfo';
import { isExistValue } from 'common/utils/isExistValue';
import { getFbAuthErrorMsg } from 'common/utils/frontend/getFbAuthErrorMsg';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import type { LoginFormType } from 'constants/types/form/loginFormType';
import { LoginResType } from 'constants/types/response/loginResType';
import { loginUserState } from 'common/utils/frontend/loginUserState';
import { useRecoilState } from 'recoil';

//ログイン画面
const Login: React.VFC = () => {
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);
  const { handleSubmit, register, errors } = useForm<LoginFormType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalMessage = useRef<string>('');

  //フォーム送信時
  const submitLogin = (loginForm: LoginFormType) => {
    mutation.mutate(loginForm);
  };

  //ログイン処理
  const mutation: any = useMutation(
    async (formData: LoginFormType) => {
      //Firebaseのログイン認証
      const result: null | string = await login(formData.userId, formData.password).catch(
        (error) => {
          //エラーメッセージをセット
          modalMessage.current = getFbAuthErrorMsg(error.code);

          //モーダルを開く
          setIsModalOpen(true);

          return error.code;
        }
      );

      //エラーメッセージがセットされている場合
      if (isExistValue(result)) {
        return;
      }

      //ユーザー情報を取得
      const res: LoginResType = await getUserInfo(formData.userId).catch((error) => {
        //mutation.isErrorが検知
        throw error;
      });

      //コンテキストにユーザー情報をセット
      setLoginUserInfo({
        userId: res.userId,
        userName: res.userName,
        groupId: isExistValue(res.groupId) ? (res.groupId as string) : '',
      });

      return res;
    },
    {
      //ログイン後の画面遷移
      onSuccess: (res: LoginResType | undefined) => {
        //ログイン処理に失敗した場合
        if (!isExistValue(res)) {
          return;
          //グループ紐付け完了済の場合
        } else if (isExistValue(res!.groupId)) {
          Router.push('/search');
          //グループ紐付け未完了の場合
        } else {
          Router.push('/linkUserToGroup');
        }
      },
    }
  );

  //ローディング画面を表示
  if (mutation.isFetching || mutation.isLoading) return <Loading />;

  //エラー発生時
  if (mutation.isError) {
    return (
      <Error
        backType={BACK_PAGE_TYPE.RELOAD}
        errorMsg={mutation.error.response.data.errorMessage}
        isLogined={false}
      />
    );
  }

  return (
    <>
      <Body isLogined={false}>
        <Header isLogined={false} />
        {/* 画面説明 */}
        <FunctionExplain>
          サービス利用にはログインが必要です。
          <br />
          下記の項目を入力してください。
        </FunctionExplain>
        {/* メイン(コンテンツ) */}
        <Main>
          <form
            onSubmit={handleSubmit(submitLogin)}
            className='grid grid-cols-2 gap-8'
            noValidate={true}
          >
            <InputLabel for='userId'>メールアドレス（ID）</InputLabel>
            <InputEmail
              name='userId'
              id='userId'
              defaultValue=''
              placeholder='fashion@example.com'
              width='200 sm:w-40'
              register={register({
                required: true,
                pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$/,
                maxLength: 255,
              })}
              errors={errors.userId}
            />

            <InputLabel for='password'>パスワード</InputLabel>
            <InputPassword
              name='password'
              id='password'
              width='200 sm:w-40'
              register={register({
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              errors={errors.password}
            />
            <div className='col-start-2 col-end-3 flex justify-center'>
              <SubmitBtn value='ログイン' width={'24 sm:w-40'} />
            </div>
          </form>
        </Main>
      </Body>
      <ModalWindow
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        message={modalMessage.current}
      />
    </>
  );
};
export default Login;
