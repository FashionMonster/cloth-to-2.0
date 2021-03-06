import axios, { AxiosResponse } from 'axios';
import { useRef, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { QueryClient, useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { Navigation } from 'interfaces/ui/components/organisms/navigation';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { FileSelectBtn } from 'interfaces/ui/components/atoms/buttons/fileSelectBtn';
import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
import { Loading } from 'interfaces/ui/components/atoms/others/loading';
import { ModalWindow } from 'interfaces/ui/components/molecules/others/modalWindow';
import { Error } from 'interfaces/ui/components/organisms/error';
import { ImageDisplay } from 'interfaces/ui/components/molecules/others/imageDisplay';
import { ContributeForm } from 'interfaces/ui/components/molecules/contributePage/contributeForm';
import { loginUserState } from 'common/utils/frontend/loginUserState';
import { isExistValue } from 'common/utils/isExistValue';
import { isImageExt } from 'common/utils/isImageExt';
import { readFile } from 'common/utils/readFile';
import { uploadImage } from 'common/utils/frontend/uploadImage';
import { fetchContributionDetail } from 'common/utils/frontend/getContributionDetail/fetchContributionDetail';
import { RESULT_MSG } from 'constants/resultMsg';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import type { ContributionInfoDetail } from 'constants/types/contributionInfoDetail';
import type { ReadImageType } from 'constants/types/readImageType';
import type { ContributeFormType } from 'constants/types/form/contributeFormType';
import { usePreviousValue } from 'common/customHooks/usePreviousValue';

//投稿編集画面
const ContributionId: React.VFC = () => {
  const [loginUserInfo] = useRecoilState(loginUserState);
  const [imgFile, setImgFile] = useState<ReadImageType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalMessage = useRef<string>('');
  const previousIsModalOpen = usePreviousValue(isModalOpen);
  const router: NextRouter = useRouter();
  const { handleSubmit, register, errors, getValues, setError, clearErrors } =
    useForm<ContributeFormType>();
  const queryClient: QueryClient = useQueryClient();

  //初期表示時、対象データ取得処理
  //retryを入れる理由：データ更新後のフェッチ時、Firebase Storage上に画像がまだ存在しないことによるエラーが発生する場合がある。
  //データが存在する状態でフェッチできるまでretryしたいため
  const query: UseQueryResult<ContributionInfoDetail, any> = useQuery(
    ['editPath', router.asPath],
    () => fetchContributionDetail(),
    { retry: 10 }
  );

  //ファイル選択時
  const selectFile = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    //ファイルオブジェクトを取得
    const files: FileList | null = e.target.files;

    if (!isExistValue(files)) {
      return;
    }

    let fileList: ReadImageType[] = [];
    for (const file of files as FileList) {
      //ファイルの読込み
      const fileUrl = await readFile(file);

      //ファイルデータのセット
      fileList.push({
        imgFileBlob: file,
        imgFileUrl: fileUrl,
        fileName: file.name,
      });
    }

    setImgFile(fileList);
  };

  //フォーム送信時
  const submitUpdateContribution = (contributeForm: ContributeFormType) => {
    //拡張子チェック
    for (const file of imgFile) {
      if (!isImageExt(file.fileName)) {
        //エラーメッセージをセット
        setIsModalOpen(true);
        modalMessage.current = RESULT_MSG.ERR.WORNG_EXTENSION;
        return;
      }
    }

    mutation.mutate(contributeForm);
  };

  //投稿内容更新処理
  const mutation: any = useMutation(
    async (formData: ContributeFormType) => {
      //データが空のプロパティを削除
      (Object.keys(formData) as (keyof ContributeFormType)[]).map((key) => {
        if (!isExistValue(formData[key])) {
          delete formData[key];
        }
      });

      //formのファイルデータを除いたオブジェクトを生成
      const { imageFiles, ...postFormData }: ContributeFormType & { contributionId?: string } =
        formData;

      //FireBase Storageに画像アップロード
      const idList = uploadImage(imgFile);

      //フォーム以外のデータをセット
      postFormData.imageName = idList;
      postFormData.userId = loginUserInfo.userId;
      postFormData.groupId = loginUserInfo.groupId;
      postFormData.contributionId = router.query.contributionId as string;

      const res = await axios
        .post('../api/contribution/updateContribution', postFormData)
        .then(() => {
          setImgFile([]); //初期化
          setIsModalOpen(true);
          modalMessage.current = RESULT_MSG.OK.FIN_UPDATE_CONTRIBUTION;
        })
        .catch((error: any) => {
          throw error;
        });

      return res;
    },
    {
      //クエリキーをリセット、キャッシュを削除
      //検索系、投稿情報詳細表示系画面が対象
      onSuccess: () => {
        queryClient.invalidateQueries('editPath');
        queryClient.invalidateQueries('searchPath');
        queryClient.invalidateQueries('contributionHistoryPath');
        queryClient.invalidateQueries('contributionDetail');
      },
    }
  );

  //データフェッチ中、ローディング画像を表示
  if (query.isFetching || query.isLoading || mutation.isFetching || mutation.isLoading)
    return <Loading />;

  //初期表示エラー発生時
  if (query.isError)
    return (
      <Error
        backType={BACK_PAGE_TYPE.BROWSER}
        errorMsg={query.error.response.data.errorInfo.message}
        isLogined={true}
      />
    );

  //データ更新エラー発生時
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
          投稿の詳細を確認、編集できます。
          <br />
          最新情報に更新しましょう。
        </FunctionExplain>
        {/* メイン(コンテンツ) */}
        <Main>
          <form
            onSubmit={handleSubmit(submitUpdateContribution)}
            className='grid grid-cols-contributeFormWrapper gap-16 sm:grid-cols-1'
            noValidate={true}
          >
            {/* ファイル選択(画面左) */}
            <div className='grid grid-rows-fileUpload gap-6 sm:grid-rows-sm_fileUpload'>
              <ImageDisplay
                imgFileUrl={
                  isExistValue(imgFile[0])
                    ? (imgFile[0].imgFileUrl as string)
                    : (query.data as ContributionInfoDetail).imageUrl[0]
                }
                oneSideLength='484'
                smOneSideLength='352'
                isMain={true}
              />
              <div className='grid grid-cols-imageSubDisplay gap-3 sm:grid-cols-sm_imageSubDisplay'>
                {(() => {
                  let subImageDisplay = [];
                  for (let i = 1; i <= 4; i++) {
                    subImageDisplay.push(
                      <ImageDisplay
                        imgFileUrl={
                          isExistValue(imgFile[0])
                            ? isExistValue(imgFile[i])
                              ? (imgFile[i].imgFileUrl as string)
                              : ''
                            : isExistValue((query.data as ContributionInfoDetail).imageUrl[i])
                            ? (query.data as ContributionInfoDetail).imageUrl[i]
                            : ''
                        }
                        oneSideLength='112'
                        smOneSideLength='79'
                      />
                    );
                  }
                  return subImageDisplay;
                })()}
              </div>
              <FileSelectBtn
                selectFile={selectFile}
                register={register({ required: true })}
                errors={errors.imageFiles}
              />
            </div>
            {/* フォーム(画面右) */}
            <div className='grid grid-cols-contributeForm gap-6 sm:grid-cols-sm_contributeForm'>
              <ContributeForm
                isDisabled={false}
                register={register}
                errors={errors}
                getValues={getValues}
                setError={setError}
                clearErrors={clearErrors}
                data={query.data}
              />
              <div className='flex justify-around col-start-2 sm:col-start-1'>
                <SubmitBtn value='更新する' componentName='edit' />
              </div>
            </div>
            <div />
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

export default ContributionId;
