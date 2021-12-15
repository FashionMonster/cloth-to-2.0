import React, { useRef, useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { Footer } from 'interfaces/ui/components/organisms/footer';
import { Loading } from 'interfaces/ui/components/atoms/others/loading';
import { Error } from 'interfaces/ui/components/organisms/error';
import { InputText } from 'interfaces/ui/components/atoms/textboxes/inputText';
import { InputEmail } from 'interfaces/ui/components/atoms/textboxes/inputEmail';
import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
import { InputPassword } from 'interfaces/ui/components/atoms/textboxes/inputPassword';
import { ModalWindow } from 'interfaces/ui/components/molecules/others/modalWindow';
import { signup } from 'common/utils/signup';
import { getFbAuthErrorMsg } from 'common/utils/getFbAuthErrorMsg';
import { usePreviousValue } from 'common/customHooks/usePreviousValue';
import { RESULT_MSG } from 'constants/resultMsg';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import type { UserFormData } from 'constants/types/userFormData';

//ユーザー登録画面
const Signup: React.VFC = () => {
  const { handleSubmit, register, errors } = useForm<UserFormData>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState<boolean>(false);
  const modalMessage = useRef<string>('');
  const previousIsModalOpen = usePreviousValue(isModalOpen);

  //ユーザー新規登録イベント
  const submitCreateUser = (data: UserFormData) => {
    mutation.mutate(data);
  };

  const mutation: any = useMutation(async (formData: UserFormData) => {
    //パスワードを除いたオブジェクトを生成
    const { password, ...postFormData } = formData;

    //DBにユーザー登録
    await axios.post('./api/user/signup', postFormData).catch((error) => {
      //mutation.isErrorが検知
      throw error;
    });

    //firebaseにユーザー登録
    try {
      await signup(formData.userId, formData.password);
      //成功メッセージ表示設定
      setIsCreateSuccess(true);
      setIsModalOpen(true);
      modalMessage.current = RESULT_MSG.OK.FIN_CREATE_USER;
    } catch (error: any) {
      //DBに登録したユーザーを削除
      await axios
        .delete('./api/user/delete', { data: { userId: formData.userId } })
        .catch((error) => {
          //mutation.isErrorが検知
          console.log(error);
          throw error;
        });
      //モーダルを開く
      setIsModalOpen(true);
      //firebaseで発生したエラーメッセージをセット
      modalMessage.current = getFbAuthErrorMsg(error.code);
    }
  });

  //ローディング画面を表示
  if (mutation.isFetching || mutation.isLoading) return <Loading />;

  //エラーが発生した場合
  if (mutation.isError) {
    return (
      //エラー画面を表示
      <Error
        backType={BACK_PAGE_TYPE.RELOAD}
        errorMsg={mutation.error.response.data.errorMessage}
      />
    );
  }

  //登録完了メッセージが開いた状態から閉じる時
  if (previousIsModalOpen && !isModalOpen && isCreateSuccess) {
    Router.push('/login');
  }

  return (
    <>
      <Body>
        <Header isLogined={false} />
        {/* 画面説明 */}
        <FunctionExplain>
          サービス利用にはユーザー登録が必要です。
          <br />
          下記の項目を入力してください。
        </FunctionExplain>
        {/* メイン(コンテンツ) */}
        <Main width='432'>
          <form
            onSubmit={handleSubmit(submitCreateUser)}
            className='grid grid-cols-2 gap-8'
            noValidate={true}
          >
            <label htmlFor='userName' className='w-200'>
              ユーザー名
            </label>
            <InputText
              name='userName'
              id='userName'
              placeholder=''
              isDisabled={false}
              defaultValue=''
              register={register({ required: true, maxLength: 20 })}
              errors={errors.userName}
              width='200'
              maxLength='20'
            />

            <label htmlFor='userId' className='w-200'>
              メールアドレス（ID）
            </label>
            <InputEmail
              name='userId'
              id='userId'
              defaultValue=''
              placeholder=''
              register={register({
                required: true,
                pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$/,
                maxLength: 255,
              })}
              errors={errors.userId}
              width='200'
            />

            <label htmlFor='password' className='w-200'>
              パスワード
            </label>
            <InputPassword
              name='password'
              id='password'
              register={register({
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              errors={errors.password}
              width='200'
            />
            <div className='col-start-2 col-end-3 flex justify-center'>
              <SubmitBtn value='登録' width={20} />
            </div>
          </form>
        </Main>
        <Footer />
      </Body>
      <ModalWindow
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        message={modalMessage.current}
      />
    </>
  );
};

export default Signup;
