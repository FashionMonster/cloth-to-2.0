// 検索画面のページ数の取得、表示する行数の取得
const getDisplayCount = (totalCount: number, oneDisplayData: number): number => {
  if (totalCount === 0) {
    return 0;
  } else if (totalCount <= oneDisplayData) {
    return 1;
  } else {
    return Math.ceil(totalCount / oneDisplayData);
  }
};

export { getDisplayCount };
