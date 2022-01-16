//引数の型定義
type Props = {
  icon: string;
  pathName: string;
  router: any;
};

//ページネーションの両端アイコン
const ArrowIcon: React.VFC<Props> = (props) => {
  let queryObj = props.router.query;

  if (props.icon === '>') {
    queryObj.page = queryObj.page + 1;
  } else if (props.icon === '<') {
    queryObj.page = queryObj.page - 1;
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
