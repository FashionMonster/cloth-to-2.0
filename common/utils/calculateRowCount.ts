//検索画面における計算関数の型宣言
type calculateSearchCount = {
  (dispalyCount: number, oneRowDisplayData: number): number;
};

// 検索画面に表示する行数計算
const calculateRowCount: calculateSearchCount = (dispalyCount, oneRowDisplayData) => {
  if (dispalyCount === 0) {
    return 0;
  } else if (dispalyCount <= oneRowDisplayData) {
    return 1;
  } else {
    return Math.ceil(dispalyCount / oneRowDisplayData);
  }
};

export { calculateRowCount };
//calculatePageCount.ts関数と共通化できそう！！
