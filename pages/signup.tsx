import React, { useRef, useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { Loading } from 'interfaces/ui/components/atoms/others/loading';
import { Error } from 'interfaces/ui/components/organisms/error';
import { InputLabel } from 'interfaces/ui/components/atoms/others/inputLabel';
import { InputText } from 'interfaces/ui/components/atoms/textBoxes/inputText';
import { InputEmail } from 'interfaces/ui/components/atoms/textBoxes/inputEmail';
import { InputPassword } from 'interfaces/ui/components/atoms/textBoxes/inputPassword';
import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
import { ModalWindow } from 'interfaces/ui/components/molecules/others/modalWindow';
import { signup } from 'common/utils/frontend/signup';
import { getFbAuthErrorMsg } from 'common/utils/frontend/getFbAuthErrorMsg';
import { usePreviousValue } from 'common/customHooks/usePreviousValue';
import { RESULT_MSG } from 'constants/resultMsg';
import { DB_ERROR } from 'constants/dbErrorInfo';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import type { SignupFormType } from 'constants/types/form/signupFormType';

//ユーザー登録画面
const Signup: React.VFC = () => {
  const { handleSubmit, register, errors } = useForm<SignupFormType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState<boolean>(false);
  const modalMessage = useRef<string>('');
  const previousIsModalOpen = usePreviousValue(isModalOpen);

  //フォーム送信時
  const submitCreateUser = (signupForm: SignupFormType) => {
    mutation.mutate(signupForm);
  };

  //ユーザー新規登録処理
  const mutation: any = useMutation(async (formData: SignupFormType): Promise<void> => {
    //パスワードを除いたオブジェクトを生成
    const { password, ...postFormData } = formData;

    //DBにユーザー登録
    const result = await axios.post('./api/user/signup', postFormData).catch((error: any) => {
      //DB登録で一意制約エラーが発生した場合
      if ((error.response.data.errorInfo.code = DB_ERROR.UNIQUE_CONSTRAINT.CODE)) {
        //失敗メッセージのモーダル表示設定
        setIsModalOpen(true);
        modalMessage.current = error.response.data.errorInfo.message;
        return error.response.data.errorInfo.code;
      } else {
        //mutation.isErrorが検知
        throw error;
      }
    });

    //エラーメッセージがセットされている場合
    if (result === DB_ERROR.UNIQUE_CONSTRAINT.CODE) {
      return;
    }

    //Firebaseにユーザー登録
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
          throw error;
        });
      //モーダルを開く
      setIsModalOpen(true);
      //Firebaseで発生したエラーメッセージをセット
      modalMessage.current = getFbAuthErrorMsg(error.code);
    }
  });

  //ローディング画面を表示
  if (mutation.isFetching || mutation.isLoading) return <Loading />;

  //エラー発生時
  if (mutation.isError) {
    return (
      <Error
        backType={BACK_PAGE_TYPE.RELOAD}
        errorMsg={mutation.error.response.data.errorInfo.message}
        isLogined={false}
      />
    );
  }

  //登録完了メッセージが開いた状態から閉じる時
  if (previousIsModalOpen && !isModalOpen && isCreateSuccess) {
    Router.push('/login');
  }

  return (
    <>
      <Body isLogined={false}>
        <Header isLogined={false} />
        {/* 画面説明 */}
        <FunctionExplain>
          サービス利用にはユーザー登録が必要です。
          <br />
          下記の項目を入力してください。
        </FunctionExplain>
        {/* メイン(コンテンツ) */}
        <Main>
          <form
            onSubmit={handleSubmit(submitCreateUser)}
            className='grid grid-cols-2 gap-8 '
            noValidate={true}
          >
            <InputLabel for='userName'>ユーザー名</InputLabel>
            <InputText
              name='userName'
              id='userName'
              placeholder='田中太郎'
              isDisabled={false}
              defaultValue=''
              register={register({ required: true, maxLength: 20 })}
              errors={errors.userName}
              width='200 sm:w-40'
              maxLength='20'
            />

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
              <SubmitBtn value='登録' width={'20 sm:w-40'} />
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

export default Signup;
