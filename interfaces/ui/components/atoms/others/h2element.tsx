//引数の型定義
type Props = {
  children: React.ReactNode;
};

//見出しコンポーネント
const H2: React.VFC<Props> = (props) => {
  return (
    <h2 className='mb-4 text-center text-purple-700 text-3xl font-semibold sm:mb-2 sm:text-sm'>
      {props.children}
    </h2>
  );
};

export { H2 };
