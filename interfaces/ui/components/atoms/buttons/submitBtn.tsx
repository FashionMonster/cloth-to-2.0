import { UseQueryResult } from 'react-query';
import ReactLoading from 'react-loading';
import { isExistValue } from 'common/utils/isExistValue';

//引数の型定義
type Props = {
  value: string;
  componentName: string;
  query?: UseQueryResult;
};

//サブミットボタンコンポーネント
const SubmitBtn: React.VFC<Props> = (props) => {
  let style;
  if (props.componentName === 'contribution' || props.componentName === 'edit') {
    style = 'w-24 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded text-center px-2 py-1';
  } else if (props.componentName === 'contributionHistory' || props.componentName === 'search') {
    style = 'w-20 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded text-center px-2 py-1';
  } else if (props.componentName === 'groupSetting' || props.componentName === 'userSetting') {
    style =
      'w-200 sm:w-40 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded text-center px-2 py-1';
  } else if (props.componentName === 'linkUserToGroup') {
    style =
      'w-28 sm:w-40 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded text-center px-2 py-1';
  } else if (props.componentName === 'login') {
    style =
      'w-24 sm:w-40 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded text-center px-2 py-1';
  } else if (props.componentName === 'signup') {
    style =
      'w-20 sm:w-40 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded text-center px-2 py-1';
  }

  //データフェッチ中、ローディングアイコンを表示 ※検索系画面のみで使用
  if (
    isExistValue(props.query) &&
    ((props.query as UseQueryResult).isFetching || (props.query as UseQueryResult).isLoading)
  ) {
    return (
      <div className='w-20 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded text-center px-2 py-1 flex items-center justify-center'>
        <ReactLoading type='spinningBubbles' color='white' width='20px' height='20px' />
      </div>
    );
  }

  return <input type='submit' id='submit' value={props.value} className={style} />;
};
export { SubmitBtn };
