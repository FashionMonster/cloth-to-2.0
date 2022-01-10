//引数の型定義
type Props = {
  isModalOpen: boolean;
};

//サイドナビ背景コンポーネント
const SideNavBackground: React.VFC<Props> = (props) => {
  if (props.isModalOpen) {
    return <div className='fixed top-0 left-0 w-full h-full bg-white opacity-50 z-10' />;
  } else {
    return <></>;
  }
};

export { SideNavBackground };
