import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import { downloadImage } from 'common/utils/frontend/downloadImage';
import { isExistValue } from 'common/utils/isExistValue';
import { LoginUserInfo } from 'constants/types/loginUserInfo';
import type { SearchFormType } from 'constants/types/form/searchFormType';
import type { UserInfoType } from 'constants/types/userInfoType';
import type { SearchResType } from 'constants/types/response/searchResType';

//検索条件を元に投稿情報を取得する
const fetchContributions = async (
  apiPath: string,
  router: any,
  userInfo: LoginUserInfo
): Promise<({ src: string } & SearchResType)[] | null> => {
  const urlData: queryString.ParsedUrl = queryString.parseUrl(router.asPath, {
    parseFragmentIdentifier: true,
  });

  //リクエストパラメータを生成
  let reqData: SearchFormType & UserInfoType = {
    page: isExistValue(urlData.query.page) ? (urlData.query.page as string) : undefined,
    groupId: userInfo.groupId,
    searchCategory: isExistValue(urlData.query.searchCategory)
      ? (urlData.query.searchCategory as string)
      : undefined,
    keyword: isExistValue(urlData.query.keyword) ? (urlData.query.keyword as string) : undefined,
    compositionRatio: isExistValue(urlData.query.compositionRatio)
      ? (urlData.query.compositionRatio as string)
      : undefined,
    compareCondition: isExistValue(urlData.query.compareCondition)
      ? (urlData.query.compareCondition as string)
      : undefined,
  };

  //履歴・編集での検索処理の場合
  if (router.pathname === '/contributionHistory') {
    //ユーザーIDをリクエストパラメータに追加
    reqData.userId = userInfo.userId;
  }

  //データが存在しないプロパティを削除
  (Object.keys(reqData) as (keyof SearchFormType)[]).map((key) => {
    if (!isExistValue(reqData[key])) {
      delete reqData[key];
    }
  });

  //投稿情報検索リクエスト
  const res: AxiosResponse<{ contributionInfos: SearchResType[] | null }> = await axios
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

  //ダウンロードURLを取得、レスポンスデータに追加する
  let responseData: ({ src: string } & SearchResType)[] = [];
  for (let contributionInfo of res.data.contributionInfos as SearchResType[]) {
    const src: string = await downloadImage(contributionInfo.imageName1).catch((errorMsg: any) => {
      throw new Error(errorMsg);
    });

    //srcを追加したオブジェクトを生成
    const combinedData: { src: string } & SearchResType = Object.assign(
      { src: src as string },
      contributionInfo
    );

    responseData.push(combinedData);
  }

  return responseData;
};

export { fetchContributions };
