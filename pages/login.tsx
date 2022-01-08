import { useContext, useRef, useState } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { AuthContext } from 'interfaces/ui/components/organisms/authProvider';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { Footer } from 'interfaces/ui/components/organisms/footer';
import { InputLabel } from 'interfaces/ui/components/atoms/others/inputLabel';
import { InputEmail } from 'interfaces/ui/components/atoms/textBoxes/inputEmail';
import { InputPassword } from 'interfaces/ui/components/atoms/textBoxes/inputPassword';
import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
import { ModalWindow } from 'interfaces/ui/components/molecules/others/modalWindow';
import { Loading } from 'interfaces/ui/components/atoms/others/loading';
import { Error } from 'interfaces/ui/components/organisms/error';
import { login } from 'common/utils/login';
import { getUserInfo } from 'common/utils/getUserInfo';
import { isExistValue } from 'common/utils/isExistValue';
import { getFbAuthErrorMsg } from 'common/utils/getFbAuthErrorMsg';
import type { AuthContextType } from 'constants/types/authContextType';
import type { UserFormData } from 'constants/types/userFormData';
import type { LoginUserInfo } from 'constants/types/loginUserInfo';
import { useMutation } from 'react-query';
import { BACK_PAGE_TYPE } from 'constants/backPageType';

//ログイン画面
const Login: React.VFC = () => {
  const { handleSubmit, register, errors } = useForm<UserFormData>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalMessage = useRef<string>('');
  const authContext: any = useContext<AuthContextType | undefined>(AuthContext);

  const submitLogin = (data: UserFormData) => {
    mutation.mutate(data);
  };

  const mutation: any = useMutation(async (formData: UserFormData) => {
    //Firebaseのログイン認証
    await login(formData.userId, formData.password).catch((error) => {
      //エラーメッセージをセット
      modalMessage.current = getFbAuthErrorMsg(error.code);

      //モーダルを開く
      setIsModalOpen(true);

      return;
    });

    //ユーザー情報を取得
    const res: LoginUserInfo = await getUserInfo(formData.userId).catch((error) => {
      //mutation.isErrorが検知
      throw error;
    });

    //コンテキストにユーザー情報をセット
    authContext.setLoginUserInfo({
      userId: res.userId,
      userName: res.userName,
      groupId: res.groupId,
    });

    //グループ紐付け完了済の場合は検索画面へ遷移
    if (isExistValue(res.groupId)) {
      Router.push('/search');
      //グループ紐付け未完了の場合は紐付け画面へ遷移
    } else {
      Router.push('/linkUserToGroup');
    }
  });

  //ローディング画面を表示
  if (mutation.isFetching || mutation.isLoading) return <Loading />;

  //エラーが発生した場合
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
              <SubmitBtn value='ログイン' width={24} />
            </div>
          </form>
        </Main>
        <Footer isNeedScroll={false} />
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
