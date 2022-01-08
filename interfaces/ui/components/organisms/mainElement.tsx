//引数の型定義
type Props = {
  children: React.ReactNode;
};

//メインコンポーネント
const Main: React.VFC<Props> = (props) => {
  return (
    <div
      id='mainWrapper'
      className='w-1080 mx-auto grid justify-items-center items-center sm:w-full'
    >
      <main>{props.children}</main>
    </div>
  );
};

export { Main };
