import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
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
import { RESULT_MSG } from 'constants/resultMsg';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import type { ReadImageType } from 'constants/types/readImageType';
import type { ContributeFormType } from 'constants/types/form/contributeFormType';

//投稿画面
const Contribution: React.VFC = () => {
  const [loginUserInfo] = useRecoilState(loginUserState);
  const [imgFile, setImgFile] = useState<ReadImageType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalMessage = useRef<string>('');
  const { handleSubmit, register, errors, getValues, setError, clearErrors } =
    useForm<ContributeFormType>();
  const queryClient: QueryClient = useQueryClient();

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
  const submitInsertContribution = (contributeForm: ContributeFormType) => {
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

  //投稿内容登録処理
  const mutation: any = useMutation(
    (formData: ContributeFormType) => {
      //データが空のプロパティを削除
      (Object.keys(formData) as (keyof ContributeFormType)[]).map((key) => {
        if (!isExistValue(formData[key])) {
          delete formData[key];
        }
      });

      //formのファイルデータを除いたオブジェクトを生成
      const { imageFiles, ...postFormData }: ContributeFormType = formData;

      //FireBase Storageに画像アップロード
      const idList = uploadImage(imgFile);

      //フォーム以外のデータをセット
      postFormData.imageUrl = idList;
      postFormData.userId = loginUserInfo.userId;
      postFormData.groupId = loginUserInfo.groupId;

      const data = axios
        .post('./api/contribution/contribute', postFormData)
        .then(() => {
          setImgFile([]); //初期化
          setIsModalOpen(true);
          modalMessage.current = RESULT_MSG.OK.FIN_CREATE_CONTRIBUTION;
        })
        .catch((error: any) => {
          throw error;
        });

      return data;
    },
    {
      //クエリキーをリセット、キャッシュを削除
      //検索系画面が対象
      onSuccess: () => {
        queryClient.invalidateQueries('searchPath');
        queryClient.invalidateQueries('contributionHistoryPath');
      },
    }
  );

  //データフェッチ中、ローディング画像を表示
  if (mutation.isFetching || mutation.isLoading) return <Loading />;

  //ログインしていない場合に、画面が見えないようにする
  //応急処置なので、対応予定
  // if (value.userInfo.userId === '') {
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
          社内・チームで情報を共有します。
          <br />
          他メンバーの新たなクリエイションに役立てることができます。
        </FunctionExplain>
        {/* メイン(コンテンツ) */}
        <Main>
          <form
            onSubmit={handleSubmit(submitInsertContribution)}
            className='grid grid-cols-contributeFormWrapper gap-16 sm:grid-cols-1'
          >
            {/* ファイル選択(画面左) */}
            <div className='grid grid-rows-fileUpload gap-6 sm:grid-rows-sm_fileUpload'>
              <ImageDisplay
                imgFileUrl={imgFile[0] === undefined ? '' : (imgFile[0].imgFileUrl as string)}
                oneSideLength='484'
                smOneSideLength='352'
              />
              <div className='grid grid-cols-imageSubDisplay gap-3 sm:grid-cols-sm_imageSubDisplay'>
                {(() => {
                  let subImageDisplay = [];
                  for (let i = 1; i <= 4; i++) {
                    subImageDisplay.push(
                      <ImageDisplay
                        imgFileUrl={
                          isExistValue(imgFile[i]) ? (imgFile[i].imgFileUrl as string) : ''
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
              />
              <div className='flex justify-around col-start-2 sm:col-start-1'>
                <SubmitBtn value='投稿する' width={'24'} />
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

export default Contribution;
