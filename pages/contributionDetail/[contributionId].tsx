import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { useQuery, UseQueryResult } from 'react-query';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { Navigation } from 'interfaces/ui/components/organisms/navigation';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { Loading } from 'interfaces/ui/components/atoms/others/loading';
import { Error } from 'interfaces/ui/components/organisms/error';
import { ImageDisplay } from 'interfaces/ui/components/molecules/others/imageDisplay';
import { ContributeForm } from 'interfaces/ui/components/molecules/contributePage/contributeForm';
import { BackBtn } from 'interfaces/ui/components/atoms/buttons/backBtn';
import { loginUserState } from 'common/utils/frontend/loginUserState';
import { isExistValue } from 'common/utils/isExistValue';
import { fetchContributionDetail } from 'common/utils/frontend/getContributionDetail/fetchContributionDetail';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import type { ContributionInfoDetail } from 'constants/types/contributionInfoDetail';

const ContributionId: React.VFC = () => {
  const [loginUserInfo] = useRecoilState(loginUserState);
  const router = useRouter();
  const { register, errors, getValues, setError, clearErrors } = useForm();

  //初期表示時、対象データ取得処理
  const query: UseQueryResult<ContributionInfoDetail, any> = useQuery(
    ['contributionDetail', router.asPath],
    () => fetchContributionDetail()
  );

  //データフェッチ中、ローディング画像を表示
  if (query.isFetching || query.isLoading) return <Loading />;

  //エラー発生時
  if (query.isError)
    return (
      <Error
        backType={BACK_PAGE_TYPE.BROWSER}
        errorMsg={query.error.response.data.errorInfo.message}
        isLogined={true}
      />
    );

  return (
    <Body isLogined={true}>
      <div id='headerWrapper'>
        <Header isLogined={true} />
        <div className='sm:hidden'>
          <Navigation />
        </div>
      </div>
      {/* 画面説明 */}
      <FunctionExplain>
        投稿の詳細を確認できます。
        <br />
        新しいものづくりのヒントになるかもしれません
      </FunctionExplain>
      {/* メイン(コンテンツ) */}
      <Main>
        <div className='grid grid-cols-contributeFormWrapper gap-16 sm:grid-cols-1'>
          {/* ファイル選択(画面左) */}
          <div className='grid grid-rows-fileUpload gap-6 sm:grid-rows-sm_fileUpload'>
            <ImageDisplay
              imgFileUrl={(query.data as ContributionInfoDetail).imageUrl[0]}
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
                        isExistValue((query.data as ContributionInfoDetail).imageUrl[i])
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
          </div>
          {/* フォーム(画面右) */}
          <div className='grid grid-cols-contributeForm gap-6 sm:grid-cols-sm_contributeForm'>
            <ContributeForm
              isDisabled={true}
              register={register}
              errors={errors}
              getValues={getValues}
              setError={setError}
              clearErrors={clearErrors}
              data={query.data}
            />
            <div className='flex justify-around col-start-2 sm:col-start-1'>
              <BackBtn backType={BACK_PAGE_TYPE.BROWSER} />
              <div className='py-1 text-purple-700 underline'>
                投稿者：{(query.data as ContributionInfoDetail).contributer}
              </div>
            </div>
          </div>
          <div />
        </div>
      </Main>
    </Body>
  );
};

export default ContributionId;
