//引数の型定義
type Props = {
  isNeedScroll: boolean;
};

//フッターコンポーネント
const Footer: React.VFC<Props> = (props) => {
  //スクロールが不要な画面の場合
  let additonalStyle = '';
  if (!props.isNeedScroll) {
    //ウインドウ下に固定する
    additonalStyle = 'absolute bottom-0';
  }

  return (
    <footer className={`${additonalStyle} w-full text-center h-12 bg-gray-100 sm:h-8`}>
      <p className='h-12 leading-12 sm:text-xxs sm:h-8 sm:leading-8'>
        お問い合わせ：yhirookadev@gmail.com
      </p>
    </footer>
  );
};

export { Footer };
