//エラー画面お表示確認用
//TODO: 完成次第削除

import { Error } from 'interfaces/ui/components/organisms/error';
import { BACK_PAGE_TYPE } from 'constants/backPageType';
const Home: React.VFC = () => (
  <>
    <Error backType={BACK_PAGE_TYPE.RELOAD} errorMsg='テスト' />
  </>
);

export default Home;
