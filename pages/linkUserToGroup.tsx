import axios, { AxiosResponse } from 'axios';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
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
import { loginUserState } from 'common/utils/frontend/loginUserState';
import { logout } from 'common/utils/frontend/logout';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import { RESULT_MSG } from 'constants/resultMsg';
import type { GetAllGroupInfoResType } from 'constants/types/response/getAllGroupInfoResType';
import type { LinkUserToGroupFormType } from 'constants/types/form/linkUserToGroupFormType';

//ユーザー情報グループ紐付け画面
const LinkUserToGroup: React.VFC = () => {
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);
  const { handleSubmit, register, errors } = useForm<LinkUserToGroupFormType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);
  const previousModalIsOpen = usePreviousValue(isModalOpen);
  const modalMessage = useRef<string>('');
  const queryClient = useQueryClient();

  //初期表示時、グループ情報全件取得
  const query: UseQueryResult<GetAllGroupInfoResType | null, any> = useQuery(
    'allGroupInfo',
    async (): Promise<GetAllGroupInfoResType> => {
      const res: AxiosResponse<{ allGroupInfo: GetAllGroupInfoResType }> = await axios
        .get('./api/group/getAllGroupInfo')
        .catch((error) => {
          //query.isErrorが検知
          throw error;
        });

      return res.data.allGroupInfo;
    },
    { refetchOnMount: 'always' } //登録されたグループアカウントをすぐ反映するため
  );

  //フォーム送信時
  const submitLinkUserToGroup = async (linkUserToGroupForm: LinkUserToGroupFormType) => {
    mutation.mutate(linkUserToGroupForm);
  };

  //グループ紐付け処理
  const mutation: any = useMutation(async (formData: LinkUserToGroupFormType) => {
    //リクエストデータを生成
    const param = {
      groupId: formData.groupId,
      groupPass: formData.groupPass,
      userId: loginUserInfo.userId,
    };

    await axios
      .put('./api/user/linkUserToGroup', param)
      .then(() => {
        //成功メッセージのモーダル表示設定
        setIsModalOpen(true);
        setIsUpdateSuccess(true);
        modalMessage.current = RESULT_MSG.OK.FIN_LINK_USER_TO_GROUP;
      })
      .catch((error: any) => {
        //グループのパスワードが誤りの場合
        if (error.response.data.errorInfo.code === 'WRONG_PASSWORD') {
          //失敗メッセージのモーダル表示設定
          setIsModalOpen(true);
          modalMessage.current = error.response.data.errorInfo.message;
        } else {
          //mutation.isErrorが検知
          throw error;
        }
      });
  });

  //更新完了メッセージが開いた状態から閉じる時
  if (previousModalIsOpen && !isModalOpen && isUpdateSuccess) {
    //更新情報でログインしてもらうため、ログアウトする
    logout(setLoginUserInfo, queryClient);
  }

  //データフェッチ中、ローディング画像を表示
  if (query.isFetching || query.isLoading || mutation.isFetching || mutation.isLoading)
    return <Loading />;

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
            onSubmit={handleSubmit(submitLinkUserToGroup)}
            className='grid grid-cols-2 gap-8'
            noValidate={true}
          >
            <label htmlFor='groupId'>グループ名</label>
            <SelectGroupName
              name='groupId'
              id='groupId'
              defaultValue=''
              width='200 sm:w-40'
              register={register({ required: true })}
              errors={errors.groupId}
              allGroupInfo={query.data as GetAllGroupInfoResType}
              selectedGroupId={loginUserInfo.groupId}
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
              errors={errors.groupPass}
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
