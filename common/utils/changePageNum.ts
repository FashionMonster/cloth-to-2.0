import { Router } from 'next/router';

//ページング処理で必要なパラメータセット
const changePageNum = (pageNum: string, pathName: string, router: Router) => {
  //選択した番号をページにセット
  router.query.page = pageNum;

  router.push({
    pathname: pathName,
    query: router.query,
  });
};

export { changePageNum };
