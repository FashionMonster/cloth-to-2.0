import axios from 'axios';
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
import { RESULT_MSG } from 'constants/resultMsg';
import { DB_ERROR } from 'constants/dbErrorInfo';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import type { GroupFormData } from 'constants/types/groupFormData';

const GroupSetting: React.VFC = () => {
  const { handleSubmit, register, errors } = useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalMessage = useRef('');
  const value = useContext(AuthContext);

  //フォーム送信時
  const createGroupAccount = async (data: GroupFormData) => {
    mutation.mutate(data);
  };

  //グループアカウント登録処理
  const mutation: any = useMutation(
    async (formData: GroupFormData) =>
      await axios
        .post('./api/group/createGroup', formData)
        .then((res) => {
          setIsModalOpen(true);
          modalMessage.current = RESULT_MSG.OK.FIN_CREATE_GROUP;
        })
        .catch((error) => {
          //DB登録で一意制約エラーが発生した場合
          if ((error.response.data.errorInfo.code = DB_ERROR.UNIQUE_CONSTRAINT.CODE)) {
            //失敗メッセージのモーダル表示設定
            setIsModalOpen(true);
            modalMessage.current = error.response.data.errorInfo.message;
          } else {
            //mutation.isErrorが検知
            throw error;
          }
        })
  );

  //データフェッチ中、ローディング画像を表示
  if (mutation.isFetching || mutation.isLoading) return <Loading />;

  //ログインしていない場合に、画面が見えないようにする
  //TODO: 応急処置なので、対応予定
  // if (value?.loginUserInfo.userId === '') {
  //   return <></>;
  // }

  //エラー発生時
  if (mutation.isError)
    return (
      <Error
        backType={BACK_PAGE_TYPE.RELOAD}
        errorMsg={mutation.error.response.data.errorInfo.message}
        isLogined={true}
      />
    );

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
          グループ情報を登録します。
          <br />
          下記の項目を入力して登録して下さい。
        </FunctionExplain>
        {/* メイン(コンテンツ) */}
        <Main>
          <form
            onSubmit={handleSubmit(createGroupAccount)}
            className='grid grid-cols-2 gap-8'
            noValidate={true}
          >
            <InputLabel for='groupName'>グループ名</InputLabel>
            <InputText
              name='groupName'
              id='groupName'
              defaultValue=''
              maxLength='20'
              placeholder='株式会社○○○'
              width='200 sm:w-40'
              isDisabled={false}
              register={register({ required: true, maxLength: 20 })}
              errors={errors.groupName}
            />

            <InputLabel for='groupId'>メールアドレス（ID）</InputLabel>
            <InputEmail
              name='groupId'
              id='groupId'
              defaultValue=''
              placeholder='fashion@example.com'
              width='200 sm:w-40'
              register={register({
                required: true,
                pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$/,
                maxLength: 255,
              })}
              errors={errors.email}
            />

            <InputLabel for='groupPass'>パスワード</InputLabel>
            <InputPassword
              name='groupPass'
              id='groupPass'
              width='200 sm:w-40'
              register={register({
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              errors={errors.password}
            />
            <div className='col-start-2 col-end-3 flex justify-center'>
              <SubmitBtn value='グループアカウント登録' width={'200 sm:w-40'} />
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

export default GroupSetting;
