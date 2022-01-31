import { SearchFormType } from 'constants/types/form/searchFormType';

//クエリパラメータを生成
const createQueryParam = (formData: SearchFormType): SearchFormType => {
  let queryParam: SearchFormType = {
    page: '1',
    searchCategory: formData.searchCategory,
    keyword: formData.keyword,
  };

  //検索条件：主組成を選択している場合
  if (formData.searchCategory === '3') {
    queryParam.compositionRatio = formData.compositionRatio;
    queryParam.compareCondition = formData.compareCondition;

    //検索条件：単価を選択している場合
  } else if (formData.searchCategory === '8') {
    queryParam.compareCondition = formData.compareCondition;
  }

  return queryParam;
};

export { createQueryParam };
