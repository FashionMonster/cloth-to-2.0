//引数の型定義
type Props = {
  isLogined: boolean;
  children: React.ReactNode;
};

//ボディーコンポーネント
const Body: React.VFC<Props> = (props) => {
  //ログインの有無で適用するスタイルを切替え
  let gridLayout;
  if (props.isLogined) {
    gridLayout = 'grid-rows-loginedBody';
  } else {
    gridLayout = 'grid-rows-body';
  }

  return <body className={`relative grid ${gridLayout} gap-8 min-h-screen`}>{props.children}</body>;
};

export { Body };
