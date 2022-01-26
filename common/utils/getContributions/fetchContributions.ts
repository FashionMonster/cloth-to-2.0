// import axios from 'axios';
// import queryString from 'query-string';
// import { downloadImage } from 'common/utils/downloadImage';
// import { getUserInfo } from 'common/utils/getUserInfo';
// import { isExistValue } from 'common/utils/isExistValue';
// import { LoginUserInfo } from 'constants/types/loginUserInfo';
// import { Search } from 'constants/types/request/contribution/search';

// //検索条件を元に投稿情報を取得する
// const fetchContributions = async (apiPath: string, router: any, userInfo: LoginUserInfo) => {
//   //リクエストデータ
//   // let reqData: any;

//   //通常の遷移
//   if (isExistValue(router.query.page)) {
//     let reqData: Search = {
//       page: router.query.page,
//       groupId: userInfo.groupId,
//       searchCategory: router.query.searchCategory,
//       keyword: router.query.keyword,
//       compositionRatio: router.query.compositionRatio,
//       compareCondition: router.query.compareCondition,
//     };

//     //履歴・編集での検索処理で必要になる追加データ
//     if (router.pathname === '/contributionHistory') {
//       reqData.userId = userInfo.userId;
//     }

//     //データが空のプロパティを削除
//     (Object.keys(reqData) as (keyof Search)[]).map((key) => {
//       if (!isExistValue(reqData[key])) {
//         delete reqData[key];
//       }
//     });

//     //URL直叩きの場合
//   } else {
//     //useContext()のデータ取得はフェッチ後になるので、以下で再取得
//     const userInfo = await getUserInfo();
//     const urlData = queryString.parseUrl(router.asPath, {
//       parseFragmentIdentifier: true,
//     });
//     reqData = {
//       page: urlData.query.page,
//       groupId: userInfo.groupId,
//       searchCategory: urlData.query.searchCategory,
//       keyword: urlData.query.keyword,
//       compositionRatio: urlData.query.compositionRatio,
//       compareCondition: urlData.query.compareCondition,
//     };
//     //履歴・編集での検索処理で必要になる追加データ
//     if (router.pathname === '/contributionHistory') {
//       reqData.userId = userInfo.userId;
//     }
//   }

//   const { data } = await axios
//     .get(apiPath, {
//       params: reqData,
//     })
//     .catch((error) => {
//       throw error;
//     });

//   //downloadUrlを取得、dataにセットする
//   if (data.totalCount > 0) {
//     for (let res of data.images) {
//       const src = await downloadImage(res.imageUrl).catch((errMsg) => {
//         throw new Error(errMsg);
//       });
//       res.src = src;
//     }
//   }
//   return data;
// };

// export { fetchContributions };

import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import { downloadImage } from 'common/utils/downloadImage';
import { getUserInfo } from 'common/utils/getUserInfo';
import { isExistValue } from 'common/utils/isExistValue';
import { LoginUserInfo } from 'constants/types/loginUserInfo';
import type { Search } from 'constants/types/request/contribution/search';
import type { ContributionInfo } from 'constants/types/contributionInfo';

//検索条件を元に投稿情報を取得する
const fetchContributions = async (
  apiPath: string,
  router: any,
  userInfo: LoginUserInfo
): Promise<ContributionInfo[] | null> => {
  let reqData: Search = {
    page: router.query.page,
    groupId: userInfo.groupId,
    searchCategory: router.query.searchCategory,
    keyword: router.query.keyword,
    compositionRatio: router.query.compositionRatio,
    compareCondition: router.query.compareCondition,
  };

  //履歴・編集での検索処理で必要になる追加データ
  if (router.pathname === '/contributionHistory') {
    reqData.userId = userInfo.userId;
  }

  //データが空のプロパティを削除
  (Object.keys(reqData) as (keyof Search)[]).map((key) => {
    if (!isExistValue(reqData[key])) {
      delete reqData[key];
    }
  });

  //投稿情報検索リクエスト
  const res: AxiosResponse<{ contributionInfos: ContributionInfo[] | null }> = await axios
    .get(apiPath, {
      params: reqData,
    })
    .catch((error) => {
      throw error;
    });

  //検索結果が０件の場合
  if (!isExistValue(res.data.contributionInfos)) {
    return null;
  }

  const startTime = performance.now(); // 開始時間

  //ダウンロードURLを取得、レスポンスデータに追加する
  for (let contributionInfo of res.data.contributionInfos as ContributionInfo[]) {
    const src: string = await downloadImage(contributionInfo.imageUrl1).catch((errorMsg: any) => {
      throw new Error(errorMsg);
    });
    contributionInfo.src = src;
  }

  const endTime = performance.now(); // 終了時間

  console.log(endTime - startTime); // 何ミリ秒かかったかを表示する

  return res.data.contributionInfos;
};

export { fetchContributions };
