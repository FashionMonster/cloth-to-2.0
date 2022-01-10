import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from 'interfaces/ui/components/organisms/authProvider';
import { SideNavLink } from 'interfaces/ui/components/atoms/navigation/sideNavlink';
import { Hamburger } from 'interfaces/ui/components/atoms/navigation/hamburger';
import { Close } from 'interfaces/ui/components/atoms/navigation/close';
import { SettingSideNav } from 'interfaces/ui/components/molecules/navigation/settingSideNav';
import { isExistValue } from 'common/utils/isExistValue';
import { makeSubStr } from 'common/utils/makeSubStr';
import { SideNavBackground } from 'interfaces/ui/components/atoms/others/sideNavBackground';

const SideNavigation: React.VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const value = useContext(AuthContext);

  //初期表示 または メニューを閉じている時
  let sideNav = (
    <div className='absolute top-2 right-2'>
      <Hamburger setIsOpen={setIsOpen} />
    </div>
  );

  //メニューを開いた時
  if (isOpen) {
    sideNav = (
      <>
        <aside
          className='animate-slideIn fixed top-0 right-0 w-48 h-full z-20 bg-purple-700'
          onClick={() => setIsOpen(false)}
        >
          <div className='absolute top-2 right-2'>
            <Close setIsOpen={setIsOpen} />
          </div>
          <nav className='absolute top-10 left-4 z-10 grid grid-rows-7 gap-4'>
            {/* ログイン後のみ表示 */}
            {isExistValue(value?.loginUserInfo.userId) && (
              <div className='text-white'>
                ようこそ {makeSubStr(value.loginUserInfo.userName, 4)} さん
              </div>
            )}
            <SideNavLink href='/' image='top.png'>
              トップ
            </SideNavLink>
            <SideNavLink href='/signup' image='signup.png'>
              ユーザー登録
            </SideNavLink>
            {/* 　ログイン前のみ表示 */}
            {!isExistValue(value?.loginUserInfo.userId) && (
              <SideNavLink href='/login' image='login.png'>
                ログイン
              </SideNavLink>
            )}
            {/* ログイン後のみ表示 */}
            {isExistValue(value?.loginUserInfo.userId) && (
              <>
                <SideNavLink href='search' image='search.png'>
                  一覧/検索
                </SideNavLink>
                <SideNavLink href='/contribute' image='contribute.png'>
                  投稿
                </SideNavLink>
                <SideNavLink href='/edit' image='edit.png'>
                  履歴/編集
                </SideNavLink>
                {/* 設定とサブナビ */}
                <SettingSideNav />
                <SideNavLink href='/top' image='logout.png'>
                  ログアウト
                </SideNavLink>
              </>
            )}
          </nav>
        </aside>
        {/* 画面操作させない背景 */}
        <SideNavBackground isModalOpen={isOpen} />
      </>
    );
  }

  return sideNav;
};

export { SideNavigation };
