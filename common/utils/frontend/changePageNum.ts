import { NextRouter } from 'next/router';

//ページング処理で必要なパラメータセット
const changePageNum = (pageNum: number, pathName: string, router: NextRouter): void => {
  //選択した番号をページにセット
  router.query.page = pageNum.toString();

  router.push({
    pathname: pathName,
    query: router.query,
  });
};

export { changePageNum };
