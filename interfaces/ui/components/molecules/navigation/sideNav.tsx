import { useState } from 'react';
import { SideNavLink } from 'interfaces/ui/components/atoms/navigation/sideNavlink';
import { Hamburger } from 'interfaces/ui/components/atoms/navigation/hamburger';
import { Close } from 'interfaces/ui/components/atoms/navigation/close';

const SideNav: React.VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //初期表示 または メニューを閉じている時
  let sideNav = (
    <div className='relative'>
      <div className='absolute top-2 right-2'>
        <Hamburger setIsOpen={setIsOpen} />
      </div>
    </div>
  );

  //メニューを開いた時
  if (isOpen) {
    sideNav = (
      <div className='relative'>
        <div className='absolute top-2 right-2'>
          <Close setIsOpen={setIsOpen} />
        </div>
        <div className='absolute top-0 right-0 z-10'>
          {/* メニュー */}
          <aside
            className='w-48 min-h-screen bg-purple-700 relative'
            onClick={() => setIsOpen(false)}
          >
            <div className='absolute top-10 left-4 z-10 grid grid-rows-3 gap-3'>
              <SideNavLink href='/' image='top.png'>
                トップ
              </SideNavLink>
              <SideNavLink href='/signup' image='signup.png'>
                無料ユーザー登録
              </SideNavLink>
              <SideNavLink href='/login' image='login.png'>
                ログイン
              </SideNavLink>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return sideNav;
};

export { SideNav };
