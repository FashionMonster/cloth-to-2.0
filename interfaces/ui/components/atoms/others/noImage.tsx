//引数の型定義
type Props = {
  oneSideLength: string;
  smOneSideLength: string;
  isMain?: boolean;
};

//表示画像なし表示コンポーネント
const NoImage: React.VFC<Props> = (props) => {
  let style;
  if (props.isMain) {
    style = 'w-484 h-484 sm:w-352 sm:h-352 border border-solid border-gray-400';
  } else {
    style = 'w-112 h-112 sm:w-79 sm:h-79 border border-solid border-gray-400';
  }

  return <div className={style} />;
};

export { NoImage };
