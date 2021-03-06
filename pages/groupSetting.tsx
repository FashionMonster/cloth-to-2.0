import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { Navigation } from 'interfaces/ui/components/organisms/navigation';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { InputLabel } from 'interfaces/ui/components/atoms/others/inputLabel';
import { InputEmail } from 'interfaces/ui/components/atoms/inputBoxes/inputEmail';
import { InputPassword } from 'interfaces/ui/components/atoms/inputBoxes/inputPassword';
import { InputText } from 'interfaces/ui/components/atoms/inputBoxes/inputText';
import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
import { Loading } from 'interfaces/ui/components/atoms/others/loading';
import { ModalWindow } from 'interfaces/ui/components/molecules/others/modalWindow';
import { Error } from 'interfaces/ui/components/organisms/error';
import { RESULT_MSG } from 'constants/resultMsg';
import { DB_ERROR } from 'constants/dbErrorInfo';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import type { CreateGroupAccountFormType } from 'constants/types/form/createGroupAccountFormType';

//グループアカウント登録画面
const GroupSetting: React.VFC = () => {
  const { handleSubmit, register, errors } = useForm<CreateGroupAccountFormType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalMessage = useRef<string>('');

  //フォーム送信時
  const submitCreateGroupAccount = async (createGroupAccountForm: CreateGroupAccountFormType) => {
    mutation.mutate(createGroupAccountForm);
  };

  //グループアカウント登録処理
  const mutation: any = useMutation(
    async (formData: CreateGroupAccountFormType) =>
      await axios
        .post('./api/group/createGroup', formData)
        .then(() => {
          setIsModalOpen(true);
          modalMessage.current = RESULT_MSG.OK.FIN_CREATE_GROUP;
        })
        .catch((error: any) => {
          //DB登録で一意制約エラーが発生した場合
          if (error.response.data.errorInfo.code === DB_ERROR.UNIQUE_CONSTRAINT.CODE) {
            //失敗メッセージのモーダル表示設定
            setIsModalOpen(true);
            modalMessage.current = error.response.data.errorInfo.message;
          } else {
            //mutation.isErrorが検知
            throw error;
          }
        })
  );

  //ローディング画面を表示
  if (mutation.isFetching || mutation.isLoading) return <Loading />;

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
          グループアカウントを登録します。
          <br />
          下記の項目を入力して登録して下さい。
        </FunctionExplain>
        {/* メイン(コンテンツ) */}
        <Main>
          <form
            onSubmit={handleSubmit(submitCreateGroupAccount)}
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
              isDisabled={false}
              register={register({ required: true, maxLength: 20 })}
              errors={errors.groupName}
              componentName='groupSetting'
            />

            <InputLabel for='groupId'>メールアドレス（ID）</InputLabel>
            <InputEmail
              name='groupId'
              id='groupId'
              defaultValue=''
              placeholder='fashion@example.com'
              register={register({
                required: true,
                pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$/,
                maxLength: 255,
              })}
              errors={errors.groupId}
            />

            <InputLabel for='groupPass'>パスワード</InputLabel>
            <InputPassword
              name='groupPass'
              id='groupPass'
              register={register({
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              errors={errors.groupPass}
            />
            <div className='col-start-2 col-end-3 flex justify-center'>
              <SubmitBtn value='グループ作成' componentName='groupSetting' />
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
