//引数の型定義
type Props = {
  children: React.ReactNode;
};

//ボディーコンポーネント
const Body: React.VFC<Props> = (props) => {
  return <body className='grid grid-rows-layout gap-8 min-h-screen'>{props.children}</body>;
};

export { Body };
