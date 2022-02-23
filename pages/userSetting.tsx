import axios from 'axios';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
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
import { loginUserState } from 'common/utils/frontend/loginUserState';
import { updateUserInfo } from 'common/utils/frontend/updateUserInfo';
import { getFbAuthErrorMsg } from 'common/utils/frontend/getFbAuthErrorMsg';
import { logout } from 'common/utils/frontend/logout';
import { RESULT_MSG } from 'constants/resultMsg';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import type { UpdateUserInfoFormType } from 'constants/types/form/updateUserInfoFormType';
import { DB_ERROR } from 'constants/dbErrorInfo';

//ユーザー情報更新画面
const UserSetting: React.VFC = () => {
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);
  const { handleSubmit, register, errors } = useForm<UpdateUserInfoFormType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);
  const previousModalIsOpen = usePreviousValue(isModalOpen);
  const modalMessage = useRef<string>('');
  const queryClient = useQueryClient();

  //フォーム送信時
  const submitUpdateUserInfo = (updateUserInfoForm: UpdateUserInfoFormType) => {
    mutation.mutate(updateUserInfoForm);
  };

  //ユーザー情報更新処理
  const mutation: any = useMutation(
    async (formData: UpdateUserInfoFormType): Promise<UpdateUserInfoFormType> => {
      //リクエストデータを生成
      const param = {
        userId: formData.userId,
        userName: formData.userName,
        previousUserId: loginUserInfo.userId,
      };

      //ユーザー更新
      const result = await axios.put('./api/user/updateUserInfo', param).catch((error: any) => {
        //DB更新時、一意制約エラーが発生した場合
        if (error.response.data.errorInfo.code === DB_ERROR.UNIQUE_CONSTRAINT.CODE) {
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
        return formData;
      }

      try {
        //Firebaseにユーザー更新
        await updateUserInfo(formData.userId, formData.password);
      } catch (error: any) {
        //更新前のデータをセット
        const param = {
          userId: loginUserInfo.userId,
          userName: loginUserInfo.userName,
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

        return formData;
      }

      //成功メッセージ表示設定
      setIsUpdateSuccess(true);
      setIsModalOpen(true);
      modalMessage.current = RESULT_MSG.OK.FIN_UPDATE_USER;

      return formData;
    }
  );

  //データフェッチ中、ローディング画像を表示
  if (mutation.isFetching || mutation.isLoading) return <Loading />;

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
    //更新情報でログインしてもらうため、ログアウトする
    logout(setLoginUserInfo, queryClient);
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
          <form
            onSubmit={handleSubmit(submitUpdateUserInfo)}
            className='grid grid-cols-2 gap-8'
            noValidate={true}
          >
            <InputLabel for='userName'>ユーザー名</InputLabel>
            <InputText
              name='userName'
              id='userName'
              defaultValue={loginUserInfo.userName}
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
              defaultValue={loginUserInfo.userId}
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
