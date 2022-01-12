//フッターコンポーネント
const Footer: React.VFC = () => {
  return (
    <footer className={`w-full text-center h-12 bg-gray-100 sm:h-8`}>
      <p className='h-12 leading-12 sm:text-xxs sm:h-8 sm:leading-8'>
        お問い合わせ：yhirookadev@gmail.com
      </p>
    </footer>
  );
};

export { Footer };
