/* eslint-disable react/jsx-key */
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactPaginate from 'react-paginate';
import { useQuery, UseQueryResult } from 'react-query';
import { AuthContext } from 'interfaces/ui/components/organisms/authProvider';
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
import { isExistValue } from 'common/utils/isExistValue';
import { calculatePageCount } from 'common/utils/calculatePageCount';
import { calculateRowCount } from 'common/utils/calculateRowCount';
import { changePageNum } from 'common/utils/changePageNum';
import { fetchContributions } from 'common/utils/getContributions/fetchContributions';
import { setQueryParam } from 'common/utils/getContributions/setQueryParam';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import { DISPLAY_DATA_NUM } from 'constants/dispalyDataNum';
import type { ContributionInfo } from 'constants/types/contributionInfo';

const Search: React.VFC = () => {
  const router: any = useRouter();
  const value = useContext(AuthContext);
  const { handleSubmit, register, errors, clearErrors } = useForm();
  const [category, setCategory] = useState('1');

  //初期表示時、検索処理
  const query: UseQueryResult<ContributionInfo[] | null, any> = useQuery(
    ['searchPath', router.asPath],
    () => fetchContributions('./api/contribution/search', router, value!.loginUserInfo)
  );

  //フォーム送信時
  const submitGetContributions = (data: any) => {
    //クエリパラメータをセットして、再描画
    router.push({
      pathname: '/search',
      query: setQueryParam(data),
    });
  };

  //ログインしていない場合に、画面が見えないようにする
  //応急処置なので、対応予定
  // if (value.userInfo.userId === '') {
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
        投稿された情報を閲覧、収集できます。
        <br />
        創りたい商品を実現するキッカケになるかもしれません。
      </FunctionExplain>
      {/* メイン(コンテンツ) */}
      <Main isContentPositionCenter={false}>
        <form
          onSubmit={handleSubmit(submitGetContributions)}
          className='w-496 h-16 mx-auto grid grid-cols-searchForm gap-4 sm:w-352 sm:grid-cols-1 sm:grid-rows-3 sm:mb-10 sm:h-auto'
        >
          <SelectSearchCategory
            onChange={(e: any) => {
              setCategory(e.target.value);
              clearErrors();
            }}
            register={register()}
          />
          <SearchInput category={category} register={register} errors={errors} />
          <SubmitBtn value='検索' width='20' />
        </form>
        {isExistValue(query.data) && (
          //PCは１行に５件、スマホは１行に２件表示する
          <div
            className={`grid grid-cols-${DISPLAY_DATA_NUM.ONE_ROW} grid-rows-${calculateRowCount(
              query.data!.length,
              DISPLAY_DATA_NUM.ONE_ROW
            )} gap-5 sm:grid-cols-${DISPLAY_DATA_NUM.SM_ONE_ROW} sm:grid-rows-${calculateRowCount(
              query.data!.length,
              DISPLAY_DATA_NUM.SM_ONE_ROW
            )} sm:gap-3 sm:w-352 sm:mx-auto`}
          >
            {query.data!.map((item: ContributionInfo) => (
              <SearchResult contributionInfo={item} path='contributionDetail' />
            ))}
          </div>
        )}
        <div className='my-8'>
          {/* ページネーション */}
          <ReactPaginate
            previousLabel={(() => {
              //初期表示 又は 検索取得件数が0件の場合
              if (router.query.page === 0 || !isExistValue(query.data)) {
                return <></>;
              } else {
                return <ArrowIcon icon='<' pathName='/search' router={router} />;
              }
            })()}
            nextLabel={(() => {
              //初期表示 又は 検索取得件数が0件の場合
              if (router.query.page === 0 || !isExistValue(query.data)) {
                return <></>;
              } else {
                return <ArrowIcon icon='>' pathName='/search' router={router} />;
              }
            })()}
            marginPagesDisplayed={1}
            pageRangeDisplayed={4}
            breakLabel={'...'}
            breakClassName={'break'}
            initialPage={router.query.page - 1}
            disableInitialCallback={true}
            pageCount={
              isExistValue(query.data)
                ? calculatePageCount(query.data!.length, DISPLAY_DATA_NUM.ONE_PAGE)
                : 0
            }
            onPageChange={(e: any) => {
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
