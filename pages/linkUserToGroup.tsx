import axios from 'axios';
import Router from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { AuthContext } from 'interfaces/ui/components/organisms/authProvider';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { Navigation } from 'interfaces/ui/components/organisms/navigation';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { SelectGroupName } from 'interfaces/ui/components/atoms/selectBoxes/selectGroupName';
import { InputPassword } from 'interfaces/ui/components/atoms/textBoxes/inputPassword';
import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
import { Loading } from 'interfaces/ui/components/atoms/others/loading';
import { ModalWindow } from 'interfaces/ui/components/molecules/others/modalWindow';
import { Error } from 'interfaces/ui/components/organisms/error';
import { usePreviousValue } from 'common/customHooks/usePreviousValue';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import { RESULT_MSG } from 'constants/resultMsg';
import type { GroupInfo } from 'constants/types/groupInfo';
import type { LinkUserToGroupInfo } from 'constants/types/linkUserToGroupInfo';

const LinkUserToGroup: React.VFC = () => {
  const { handleSubmit, register, errors } = useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const previousModalIsOpen = usePreviousValue(isModalOpen);
  const modalMessage = useRef('');
  const value = useContext(AuthContext);

  //初期表示(データ取得)時
  const query: any = useQuery(
    'allGroupInfo',
    async (): Promise<GroupInfo[]> => {
      const res = await axios.get('./api/group/getAllGroupInfo').catch((error) => {
        //query.isErrorが検知
        throw error;
      });

      return res.data;
    },
    { refetchOnMount: 'always' } //登録されたグループアカウントをすぐ反映するため
  );

  //フォーム送信時
  const linkUserToGroup: any = async (data: LinkUserToGroupInfo) => {
    data.userId = value!.loginUserInfo.userId;
    mutation.mutate(data);
  };

  //グループ紐付け処理
  const mutation: any = useMutation((formData: LinkUserToGroupInfo) =>
    axios
      .put('./api/user/linkUserToGroup', formData)
      .then((res) => {
        //成功メッセージのモーダル表示設定
        setIsModalOpen(true);
        setIsUpdateSuccess(true);
        modalMessage.current = RESULT_MSG.OK.FIN_LINK_USER_TO_GROUP;
      })
      .catch((error) => {
        //グループのパスワードが誤りの場合
        if ((error.response.data.errorInfo.code = 'WRONG_PASSWORD')) {
          //失敗メッセージのモーダル表示設定
          setIsModalOpen(true);
          modalMessage.current = error.response.data.errorInfo.message;
        } else {
          //mutation.isErrorが検知
          throw error;
        }
      })
  );

  //更新完了メッセージが開いた状態から閉じる時
  if (previousModalIsOpen && !isModalOpen && isUpdateSuccess) {
    Router.push('/login');
  }

  //データフェッチ中、ローディング画像を表示
  if (query.isFetching || query.isLoading || mutation.isFetching || mutation.isLoading)
    return <Loading />;

  //ログインしていない場合に、画面が見えないようにする
  //TODO: 応急処置なので、対応予定
  // if (value?.loginUserInfo.userId === '') {
  //   return <></>;
  // }

  //初期表示(データ取得)でエラー発生時
  if (query.error)
    return (
      <Error
        backType={BACK_PAGE_TYPE.RELOAD}
        errorMsg={query.error.response.data.errorInfo.message}
        isLogined={true}
      />
    );

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
          自身がどのグループに所属するか選択します。
          <br />
          下記の項目を入力して登録・更新して下さい。
        </FunctionExplain>
        {/* メイン(コンテンツ) */}
        <Main>
          <form
            onSubmit={handleSubmit(linkUserToGroup)}
            className='grid grid-cols-2 gap-8'
            noValidate={true}
          >
            <label htmlFor='groupId'>グループ名</label>
            <SelectGroupName
              name='groupId'
              id='groupId'
              defaultValue=''
              placeholder=''
              width='200 sm:w-40'
              register={register({ required: true })}
              errors={errors.groupId}
              allGroupInfo={query.data.allGroupInfo}
            />

            <label htmlFor='groupPass'>パスワード</label>
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
              <SubmitBtn value='登録/更新' width={'28 sm:w-40'} />
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

export default LinkUserToGroup;
