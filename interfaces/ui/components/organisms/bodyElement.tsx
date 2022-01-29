//引数の型定義
type Props = {
  isLogined: boolean;
  children: React.ReactNode;
};

//ボディーコンポーネント
const Body: React.VFC<Props> = (props) => {
  //ログインの有無で適用するスタイルを切替え
  const gridLayout = props.isLogined ? 'grid-rows-loginedBody' : 'grid-rows-body';

  return (
    <body className={`relative grid ${gridLayout} gap-8 min-h-screen sm:grid-rows-sm_body`}>
      {props.children}
    </body>
  );
};

export { Body };
