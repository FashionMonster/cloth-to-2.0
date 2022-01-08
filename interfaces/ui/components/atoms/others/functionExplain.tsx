//引数の型定義
type Props = {
  children: React.ReactNode;
};

//画面説明コンポーネント
const FunctionExplain: React.VFC<Props> = (props) => {
  return <p className='h-12 text-center sm:h-6 sm:text-sm'>{props.children}</p>;
};

export { FunctionExplain };
