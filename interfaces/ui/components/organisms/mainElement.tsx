//引数の型定義
type Props = {
  width: string;
  children: React.ReactNode;
};

//メインコンポーネント
const Main: React.VFC<Props> = (props) => {
  return (
    // PCの横幅を1080px、縦３×横３のグリッドレイアウトの中央にメインコンテンツを配置する
    <div id='mainWrapper' className='w-1080 mx-auto grid grid-rows-fr3 grid-cols-fr3'>
      <main className={`w-${props.width} row-start-2 row-end-3 col-start-2 col-end-3`}>
        {props.children}
      </main>
    </div>
  );
};

export { Main };
