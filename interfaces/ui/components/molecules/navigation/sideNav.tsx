import { useState } from 'react';
import Link from 'next/Link';
import { Hamburger } from 'interfaces/ui/components/atoms/navigation/hamburger';
import { Close } from 'interfaces/ui/components/atoms/navigation/close';

const SideNav: React.VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //初期表示 または メニューを閉じている時
  let sideNav = (
    <div className='relative'>
      <div className='absolute top-1 right-1'>
        <Hamburger setIsOpen={setIsOpen} />
      </div>
    </div>
  );

  //メニューを開いた時
  if (isOpen) {
    sideNav = (
      <div className='relative'>
        <div className='absolute top-1 right-1'>
          <Close setIsOpen={setIsOpen} />
        </div>
        <div className='absolute top-0 right-0 z-10'>
          {/* メニュー */}
          <aside
            className='w-36 h-96 bg-purple-700 bg-opacity-60 relative'
            onClick={() => setIsOpen(false)}
          >
            <div className='absolute top-10 left-4 z-10'>
              <Link href='/signup'>
                <a className=' text-white rounded-3xl text-xs block mb-4'>無料ユーザー登録</a>
              </Link>
              <Link href='/login'>
                <a className=' text-white rounded-3xl block text-xs'> ログイン</a>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return sideNav;
};

export { SideNav };
