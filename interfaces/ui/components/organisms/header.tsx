import Image from 'next/image';
import React from 'react';
import { HeaderAfterLogin } from 'interfaces/ui/components/molecules/headers/headerAfterLogin';
import { HeaderBeforeLogin } from 'interfaces/ui/components/molecules/headers/headerBeforeLogin';

//引数の型定義
type Props = {
  isLogined: boolean;
};

//ヘッダーコンポーネント
const Header: React.VFC<Props> = (props) => {
  return (
    <header className='relative w-full h-16 bg-gray-100 sm:h-8'>
      <div className='absolute top-0 left-0 w-16 h-16 sm:w-8 sm:h-8'>
        <Image src='/logo.png' alt='ロゴ' width='64px' height='64px' layout='responsive' />
      </div>
      <p className='absolute top-0 left-20 h-16 leading-16 text-lg font-black sm:left-12 sm:h-8 sm:leading-8 sm:text-xs'>
        アパレル事業者のための情報共有ツール
      </p>
      {/* ログイン前と後でヘッダー内容を切替える */}
      {props.isLogined ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
    </header>
  );
};

export { Header };
