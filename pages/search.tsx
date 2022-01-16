// import { useRouter } from 'next/router';
// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import ReactPaginate from 'react-paginate';
// import { useQuery } from 'react-query';
// import { AuthContext } from 'interfaces/ui/components/organisms/authProvider';
// import { Body } from 'interfaces/ui/components/organisms/bodyElement';
// import { Header } from 'interfaces/ui/components/organisms/header';
// import { Navigation } from 'interfaces/ui/components/organisms/navigation';
// import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
// import { Main } from 'interfaces/ui/components/organisms/mainElement';
// import { Loading } from 'interfaces/ui/components/atoms/others/loading';
// import { Error } from 'interfaces/ui/components/organisms/error';
// import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
// import { ArrowIcon } from 'interfaces/ui/components/atoms/icon/arrowIcon';
// import { SelectCategory } from 'interfaces/ui/components/molecules/searchPage/selectCategory';
// import { SearchInput } from 'interfaces/ui/components/molecules/searchPage/searchInput';
// import { SearchResult } from 'interfaces/ui/components/molecules/searchPage/searchResult';
// import { calculatePageCount } from 'common/utils/calculatePageCount';
// import { calculateRowCount } from 'common/utils/calculateRowCount';
// import { changePageNum } from 'common/utils/changePageNum';
// import { fetchContributions } from 'common/utils/getContributions/fetchContributions';
// import { setQueryParam } from 'common/utils/getContributions/setQueryParam';
// import { BACK_PAGE_TYPE } from 'constants/backPageType';
// import { DISPLAY_DATA_NUM } from 'constants/dispalyDataNum';

// const Search: React.VFC = () => {
//   const router: any = useRouter();
//   const value = useContext(AuthContext);
//   const { handleSubmit, register, errors, clearErrors } = useForm();
//   const [category, setCategory] = useState('1');

//   const { isFetching, isLoading, error, data } = useQuery(['searchPath', router.asPath], () =>
//     fetchContributions('./api/getContribution', router, value!.loginUserInfo)
//   );

//   //検索処理
//   const submit = (data: any) => {
//     //初期化
//     // document.getElementById('searchCategory').options[0].selected = true;
//     setCategory('1');

//     //クエリパラメータをセット
//     router.push({
//       pathname: '/search',
//       query: setQueryParam(data),
//     });
//   };

//   // if (isFetching || isLoading) return <Loading />;

//   //ログインしていない場合に、画面が見えないようにする
//   //応急処置なので、対応予定
//   // if (value.userInfo.userId === '') {
//   //   return <></>;
//   // }

//   // if (error)
//   //   return (
//   //     <Error
//   //       backType={BACK_PAGE_TYPE.BROWSER}
//   //       errorMsg={mutation.error.response.data.errorInfo.message}
//   //       isLogined={true}
//   //     />
//   //   );

//   return (
//     <Body isLogined={true}>
//       <div id='headerWrapper'>
//         <Header isLogined={true} />
//         <div className='sm:hidden'>
//           <Navigation />
//         </div>
//       </div>
//       {/* 画面説明 */}
//       <FunctionExplain>
//         投稿された情報を閲覧、収集できます。
//         <br />
//         新しいアイデアが湧いたり、創りたい商品を実現するキッカケになります。
//       </FunctionExplain>
//       {/* メイン(コンテンツ) */}
//       <Main>
//         <form
//           onSubmit={handleSubmit(submit)}
//           className='w-full h-16 flex justify-center grid grid-cols-searchForm gap-4'
//         >
//           <SelectCategory
//             onChange={(e: any) => {
//               setCategory(e.target.value);
//               clearErrors();
//             }}
//             register={register()}
//           />
//           <SearchInput category={category} register={register} errors={errors} />
//           <SubmitBtn value='検索' width='20' />
//         </form>
//         <div
//           className={`grid grid-cols-5 grid-rows-${calculateRowCount(
//             data.images.length,
//             DISPLAY_DATA_NUM.ONE_ROW
//           )}} gap-5`}
//         >
//           {/* {data.totalCount === 0
//             ? ''
//             : data.images.map((item: any) => (
//                 <SearchResult data={item} path='contributionDetail' />
//               ))} */}
//         </div>
//         <div>
//           <div>
//             {/* ページネーション */}
//             <ReactPaginate
//               previousLabel={(() => {
//                 //初期表示 又は 検索取得件数が0件の場合
//                 if (router.query.page === 0 || data.totalCount === 0) {
//                   return <></>;
//                 } else {
//                   return <ArrowIcon icon='<' pathName='/search' router={router} />;
//                 }
//               })()}
//               nextLabel={(() => {
//                 //初期表示 又は 検索取得件数が0件の場合
//                 if (router.query.page === 0 || data.totalCount === 0) {
//                   return <></>;
//                 } else {
//                   return <ArrowIcon icon='>' pathName='/search' router={router} />;
//                 }
//               })()}
//               marginPagesDisplayed={1}
//               pageRangeDisplayed={4}
//               breakLabel={'...'}
//               breakClassName={'break'}
//               initialPage={router.query.page - 1}
//               disableInitialCallback={true}
//               pageCount={calculatePageCount(data.totalCount, DISPLAY_DATA_NUM.ONE_PAGE)}
//               onPageChange={(e: any) => {
//                 changePageNum(e.selected + 1, '/search', router);
//               }}
//               containerClassName={'flex w-full justify-center'}
//               pageClassName={
//                 'w-7 h-7 bg-purple-200 mx-2 text-center rounded-3xl font-semibold hover:bg-purple-600 hover:text-white'
//               }
//               pageLinkClassName={'inline-block w-7 h-7 text-center rounded-3xl font-semibold'}
//               activeClassName={'w-7 h-7 bg-purple-400 font-semibold'}
//               activeLinkClassName={'inline-block w-7 h-7 text-center rounded-3xl font-semibold'}
//               disabledClassName={'hidden'}
//             />
//           </div>
//         </div>
//       </Main>
//     </Body>
//   );
// };

// export default Search;

import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactPaginate from 'react-paginate';
import { useQuery } from 'react-query';
import { AuthContext } from 'interfaces/ui/components/organisms/authProvider';
import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { Navigation } from 'interfaces/ui/components/organisms/navigation';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { Loading } from 'interfaces/ui/components/atoms/others/loading';
import { Error } from 'interfaces/ui/components/organisms/error';
import { SubmitBtn } from 'interfaces/ui/components/atoms/buttons/submitBtn';
import { ArrowIcon } from 'interfaces/ui/components/atoms/icon/arrowIcon';
import { SelectSearchCategory } from 'interfaces/ui/components/atoms/selectBoxes/selectSearchCategory';
import { SearchInput } from 'interfaces/ui/components/molecules/searchPage/searchInput';
import { SearchResult } from 'interfaces/ui/components/molecules/searchPage/searchResult';
import { calculatePageCount } from 'common/utils/calculatePageCount';
import { calculateRowCount } from 'common/utils/calculateRowCount';
import { changePageNum } from 'common/utils/changePageNum';
import { fetchContributions } from 'common/utils/getContributions/fetchContributions';
import { setQueryParam } from 'common/utils/getContributions/setQueryParam';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
import { DISPLAY_DATA_NUM } from 'constants/dispalyDataNum';

const Search: React.VFC = () => {
  const router: any = useRouter();
  const value = useContext(AuthContext);
  const { handleSubmit, register, errors, clearErrors } = useForm();
  const [category, setCategory] = useState('1');

  const query: any = useQuery(['searchPath', router.asPath], () =>
    fetchContributions('./api/contribution/search', router, value!.loginUserInfo)
  );

  //検索処理
  const submitGetContributions = (data: any) => {
    //初期化
    // document.getElementById('searchCategory').options[0].selected = true;
    setCategory('1');

    //クエリパラメータをセットしたURLで再描画
    router.push({
      pathname: '/search',
      query: setQueryParam(data),
    });
  };

  if (query.isFetching || query.isLoading) return <Loading />;

  //ログインしていない場合に、画面が見えないようにする
  //応急処置なので、対応予定
  // if (value.userInfo.userId === '') {
  //   return <></>;
  // }

  if (query.error)
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
        投稿された情報を閲覧、収集できます。
        <br />
        新しいアイデアが湧いたり、創りたい商品を実現するキッカケになります。
      </FunctionExplain>
      {/* メイン(コンテンツ) */}
      <Main>
        <form
          onSubmit={handleSubmit(submitGetContributions)}
          className='w-full h-16 grid grid-cols-searchForm gap-4'
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
        <div>
          {/* {data.totalCount === 0
            ? ''
            : data.images.map((item: any) => (
                <SearchResult data={item} path='contributionDetail' />
              ))} */}
        </div>
        <div>
          <div></div>
        </div>
      </Main>
    </Body>
  );
};

export default Search;
