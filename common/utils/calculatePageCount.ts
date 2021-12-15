//検索画面における計算関数の型宣言
type CalculateSearchCount = {
  (totalCount: number, onePageDisplayData: number): number;
};

// 検索画面のページ数の計算
const calculatePageCount: CalculateSearchCount = (totalCount, onePageDisplayData) => {
  if (totalCount === 0) {
    return 0;
  } else if (totalCount <= onePageDisplayData) {
    return 1;
  } else {
    return Math.ceil(totalCount / onePageDisplayData);
  }
};

export { calculatePageCount };
