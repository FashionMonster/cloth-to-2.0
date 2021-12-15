//クエリパラメータをセット
const setQueryParam = (data) => {
  let queryParam = {
    page: 1,
    searchCategory: data.searchCategory,
    keyword: data.keyword,
  };

  //検索条件：主組成を選択している場合
  if (data.searchCategory === "3") {
    queryParam.compositionRatio = data.compositionRatio;
    queryParam.compareCondition = data.compareCondition;

    //検索条件：単価を選択している場合
  } else if (data.searchCategory === "8") {
    queryParam.compareCondition = data.compareCondition;
  }

  return queryParam;
};

export { setQueryParam };
