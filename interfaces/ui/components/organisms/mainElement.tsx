//引数の型定義
type Props = {
  isContentPositionCenter?: boolean;
  children: React.ReactNode;
};

//メインコンポーネント
const Main: React.VFC<Props> = (props) => {
  //isContentPositionCenter:trueの場合、コンテンツ全体が上下左右中央になる
  return (
    <main
      id='mainWrapper'
      className={`w-1080 mx-auto ${
        props.isContentPositionCenter && ' grid justify-items-center items-center'
      } sm:w-full`}
    >
      {props.children}
    </main>
  );
};

Main.defaultProps = { isContentPositionCenter: true };

export { Main };
