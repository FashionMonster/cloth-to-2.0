//引数の型定義
type Props = {
  oneSideLength: string;
  smOneSideLength: string;
};

//表示画像なし表示コンポーネント
const NoImage: React.VFC<Props> = (props) => {
  return (
    <div
      className={`w-${props.oneSideLength} h-${props.oneSideLength} border border-solid border-gray-400 sm:w-${props.smOneSideLength} sm:h-${props.smOneSideLength}`}
    />
  );
};

export { NoImage };
