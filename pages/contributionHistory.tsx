import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import ReactPaginate from 'react-paginate';
import { useQuery, UseQueryResult } from 'react-query';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { Navigation } from 'interfaces/ui/components/organisms/navigation';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { Error } from 'interfaces/ui/components/organisms/error';
import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
import { ArrowIcon } from 'interfaces/ui/components/atoms/icon/arrowIcon';
import { SelectSearchCategory } from 'interfaces/ui/components/atoms/selectBoxes/selectSearchCategory';
import { SearchInput } from 'interfaces/ui/components/molecules/searchPage/searchInput';
import { SearchResult } from 'interfaces/ui/components/molecules/searchPage/searchResult';
import { loginUserState } from 'common/utils/frontend/loginUserState';
import { isExistValue } from 'common/utils/isExistValue';
import { getNumberPerOneDisplay } from 'common/utils/frontend/getNumberPerOneDisplay';
import { changePageNum } from 'common/utils/frontend/changePageNum';
import { fetchContributions } from 'common/utils/frontend/getContributions/fetchContributions';
import { createQueryParam } from 'common/utils/frontend/getContributions/createQueryParam';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import { DISPLAY_DATA_NUM } from 'constants/dispalyDataNum';
import type { SearchFormType } from 'constants/types/form/searchFormType';
import type { SearchResType } from 'constants/types/response/searchResType';

const Search: React.VFC = () => {
  const router: NextRouter = useRouter();
  const [loginUserInfo] = useRecoilState(loginUserState);
  const { handleSubmit, register, errors, clearErrors } = useForm();
  const [category, setCategory] = useState('1');

  //初期表示時、検索処理
  const query: UseQueryResult<({ src: string } & SearchResType)[] | null, any> = useQuery(
    ['contributionHistoryPath', router.asPath],
    () => fetchContributions('./api/contribution/search', router, loginUserInfo)
  );

  //フォーム送信時
  const submitSearch = (searchForm: SearchFormType) => {
    //クエリパラメータをセットして、再描画
    router.push({
      pathname: '/contributionHistory',
      query: createQueryParam(searchForm),
    });
  };

  //初期表示(データ取得)でエラー発生時
  if (query.error)
    return (
      <Error
        backType={BACK_PAGE_TYPE.RELOAD}
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
        あなたの投稿内容を検索、編集できます。
        <br />
        最新の情報を共有しましょう。
      </FunctionExplain>
      {/* メイン(コンテンツ) */}
      <Main isContentPositionCenter={false}>
        <form
          onSubmit={handleSubmit(submitSearch)}
          className='w-496 h-16 mx-auto grid grid-cols-searchForm gap-4 sm:w-352 sm:grid-cols-1 sm:grid-rows-3 sm:mb-10 sm:h-auto'
          noValidate={true}
        >
          <SelectSearchCategory
            onChange={(e: any) => {
              setCategory(e.target.value);
              clearErrors();
            }}
            register={register()}
          />
          <SearchInput category={category} register={register} errors={errors} />
          <SubmitBtn value='検索' width='20' query={query} />
        </form>
        {isExistValue(query.data) && (
          //PCは１行に５件、スマホは１行に２件表示する
          <div
            className={`grid grid-cols-${
              DISPLAY_DATA_NUM.ONE_ROW
            } grid-rows-${getNumberPerOneDisplay(
              query.data!.length,
              DISPLAY_DATA_NUM.ONE_ROW
            )} gap-5 sm:grid-cols-${
              DISPLAY_DATA_NUM.SM_ONE_ROW
            } sm:grid-rows-${getNumberPerOneDisplay(
              query.data!.length,
              DISPLAY_DATA_NUM.SM_ONE_ROW
            )} sm:gap-3 sm:w-352 sm:mx-auto`}
          >
            {query.data!.map((item: { src: string } & SearchResType) => (
              <div key={item.imageName1}>
                <SearchResult
                  path='edit'
                  contributionId={item.contributionId}
                  materialName={item.materialName}
                  src={item.src}
                />
              </div>
            ))}
          </div>
        )}
        <div className='my-8'>
          {/* ページネーション */}
          <ReactPaginate
            previousLabel={(() => {
              //初期表示 又は 検索取得件数が0件の場合
              if ((router.query.page as unknown as number) === 0 || !isExistValue(query.data)) {
                return <></>;
              } else {
                return <ArrowIcon icon='<' pathName='/search' router={router} />;
              }
            })()}
            nextLabel={(() => {
              //初期表示 又は 検索取得件数が0件の場合
              if ((router.query.page as unknown as number) === 0 || !isExistValue(query.data)) {
                return <></>;
              } else {
                return <ArrowIcon icon='>' pathName='/search' router={router} />;
              }
            })()}
            marginPagesDisplayed={1}
            pageRangeDisplayed={4}
            breakLabel={'...'}
            breakClassName={'break'}
            initialPage={(router.query.page as unknown as number) - 1}
            disableInitialCallback={true}
            pageCount={
              isExistValue(query.data)
                ? getNumberPerOneDisplay(query.data!.length, DISPLAY_DATA_NUM.ONE_PAGE)
                : 0
            }
            onPageChange={(e: { selected: number }) => {
              changePageNum(e.selected + 1, '/search', router);
            }}
            containerClassName={'flex w-full justify-center'}
            pageClassName={
              'w-7 h-7 bg-purple-200 mx-2 text-center rounded-3xl font-semibold hover:bg-purple-600 hover:text-white'
            }
            pageLinkClassName={'inline-block w-7 h-7 text-center rounded-3xl font-semibold'}
            activeClassName={'w-7 h-7 bg-purple-400 font-semibold'}
            activeLinkClassName={'inline-block w-7 h-7 text-center rounded-3xl font-semibold'}
            disabledClassName={'hidden'}
          />
        </div>
      </Main>
    </Body>
  );
};

export default Search;
