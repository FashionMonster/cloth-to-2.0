//引数の型定義
type Props = {
  isLogined: boolean;
  children: React.ReactNode;
};

//ボディーコンポーネント
const Body: React.VFC<Props> = (props) => {
  //ログインの有無で適用するスタイルを切替え
  let gridLayout;
  let smGridLayout;
  if (props.isLogined) {
    gridLayout = 'grid-rows-loginedBody';
  } else {
    gridLayout = 'grid-rows-body';
    smGridLayout = 'grid-rows-sm_body';
  }

  return (
    <body className={`relative grid ${gridLayout} gap-8 min-h-screen sm:${smGridLayout}`}>
      {props.children}
    </body>
  );
};

export { Body };
