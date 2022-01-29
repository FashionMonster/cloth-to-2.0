import { NextRouter } from 'next/router';

//引数の型定義
type Props = {
  icon: string;
  pathName: string;
  router: NextRouter;
};

//ページネーションの両端アイコン
const ArrowIcon: React.VFC<Props> = (props) => {
  let queryObj = props.router.query;

  if (props.icon === '>') {
    //現在ページに+１
    queryObj.page = ((queryObj.page as unknown as number) + 1).toString();
  } else if (props.icon === '<') {
    //現在ページに−１
    queryObj.page = ((queryObj.page as unknown as number) - 1).toString();
  }

  return (
    <div
      onClick={() =>
        props.router.push({
          pathname: props.pathName,
          query: queryObj,
        })
      }
      className='w-7 h-7 bg-purple-200 mx-2 text-center rounded-3xl font-semibold hover:bg-purple-600 hover:text-white'
    >
      {props.icon}
    </div>
  );
};

export { ArrowIcon };
