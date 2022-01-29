import axios from 'axios';
import Router from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AuthContext } from 'interfaces/ui/components/organisms/authProvider';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { Navigation } from 'interfaces/ui/components/organisms/navigation';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { InputLabel } from 'interfaces/ui/components/atoms/others/inputLabel';
import { InputEmail } from 'interfaces/ui/components/atoms/textBoxes/inputEmail';
import { InputPassword } from 'interfaces/ui/components/atoms/textBoxes/inputPassword';
import { InputText } from 'interfaces/ui/components/atoms/textBoxes/inputText';
import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
import { Loading } from 'interfaces/ui/components/atoms/others/loading';
import { ModalWindow } from 'interfaces/ui/components/molecules/others/modalWindow';
import { Error } from 'interfaces/ui/components/organisms/error';
import { usePreviousValue } from 'common/customHooks/usePreviousValue';
import { updateUserInfo } from 'common/utils/frontend/updateUserInfo';
import { getFbAuthErrorMsg } from 'common/utils/frontend/getFbAuthErrorMsg';
import { RESULT_MSG } from 'constants/resultMsg';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import type { AuthContextType } from 'constants/types/authContextType';
import type { UpdateUserInfoFormType } from 'constants/types/form/updateUserInfoFormType';

//ユーザー情報更新画面
const UserSetting: React.VFC = () => {
  const { handleSubmit, register, errors } = useForm<UpdateUserInfoFormType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);
  const previousModalIsOpen = usePreviousValue(isModalOpen);
  const modalMessage = useRef<string>('');
  const value: AuthContextType | undefined = useContext(AuthContext);

  //フォーム送信時
  const submitUpdateUserInfo = (updateUserInfoForm: UpdateUserInfoFormType) => {
    mutation.mutate(updateUserInfoForm);
  };

  //ユーザー情報更新処理
  const mutation: any = useMutation(async (formData: UpdateUserInfoFormType) => {
    //パスワードを除いたオブジェクトを生成
    const { password, ...postFormData } = formData;

    //DBにユーザー更新
    await axios.put('./api/user/updateUserInfo', postFormData).catch((error: any) => {
      //mutation.isErrorがキャッチする
      throw error;
    });

    try {
      //Firebaseにユーザー更新
      await updateUserInfo(formData.userId, formData.password);
    } catch (error: any) {
      //更新前のデータをセット
      const param = {
        userId: value!.loginUserInfo.userId,
        userName: value!.loginUserInfo.userName,
        previousUserId: formData.userId,
      };

      //DBにユーザー更新(巻き戻し)
      await axios.put('./api/user/updateUserInfo', param).catch((error: any) => {
        //mutation.isErrorがキャッチする
        throw error;
      });

      //モーダルを開く
      setIsModalOpen(true);
      //Firebaseで発生したエラーメッセージをセット
      modalMessage.current = getFbAuthErrorMsg(error.code);
    }

    //成功メッセージ表示設定
    setIsUpdateSuccess(true);
    setIsModalOpen(true);
    modalMessage.current = RESULT_MSG.OK.FIN_UPDATE_USER;

    return formData;
  });

  //データフェッチ中、ローディング画像を表示
  if (mutation.isFetching || mutation.isLoading) return <Loading />;

  //ログインしていない場合に、画面が見えないようにする
  //応急処置なので、対応予定
  // if (value.userInfo.userId === "") {
  //   return <></>;
  // }

  //エラー発生時
  if (mutation.isError) {
    return (
      <Error
        backType={BACK_PAGE_TYPE.RELOAD}
        errorMsg={mutation.error.response.data.errorInfo.message}
        isLogined={true}
      />
    );
  }

  //更新完了メッセージが開いた状態から閉じる時
  if (previousModalIsOpen && !isModalOpen && isUpdateSuccess) {
    Router.push('/login');
  }

  return (
    <>
      <Body isLogined={true}>
        <div id='headerWrapper'>
          <Header isLogined={true} />
          <div className='sm:hidden'>
            <Navigation />
          </div>
        </div>
        {/* 画面説明 */}
        <FunctionExplain>
          ユーザー情報を変更できます。
          <br />
          下記の項目を入力して更新して下さい。
        </FunctionExplain>
        {/* メイン(コンテンツ) */}
        <Main>
          <form onSubmit={handleSubmit(submitUpdateUserInfo)} className='grid grid-cols-2 gap-8'>
            <InputLabel for='userName'>ユーザー名</InputLabel>
            <InputText
              name='userName'
              id='userName'
              defaultValue={value!.loginUserInfo.userName}
              placeholder=''
              register={register({ required: true, maxLength: 20 })}
              errors={errors.userName}
              width='200 sm:w-40'
              maxLength='20'
              isDisabled={false}
            />

            <InputLabel for='groupId'>メールアドレス（ID）</InputLabel>
            <InputEmail
              name='userId'
              id='userId'
              defaultValue={value!.loginUserInfo.userId}
              placeholder=''
              register={register({
                required: true,
                pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$/,
                maxLength: 255,
              })}
              errors={errors.userId}
              width='200 sm:w-40'
            />

            <InputLabel for='groupPass'>パスワード</InputLabel>
            <InputPassword
              name='password'
              id='password'
              register={register({
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              errors={errors.password}
              width='200 sm:w-40'
            />
            <div className='col-start-2 col-end-3 flex justify-center'>
              <SubmitBtn value='ユーザー情報更新' width={'200 sm:w-40'} />
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

export default UserSetting;
