import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { SideNavLink } from 'interfaces/ui/components/atoms/navigation/sideNavLink';
import { Hamburger } from 'interfaces/ui/components/atoms/navigation/hamburger';
import { Close } from 'interfaces/ui/components/atoms/navigation/close';
import { SettingSideNav } from 'interfaces/ui/components/molecules/navigation/settingSideNav';
import { loginUserState } from 'common/utils/frontend/loginUserState';
import { isExistValue } from 'common/utils/isExistValue';
import { subString } from 'common/utils/subString';
import { SideNavBackground } from 'interfaces/ui/components/atoms/others/sideNavBackground';

//サイドナビゲーション(メニュー)　※スマホ時のみ使用
const SideNavigation: React.VFC = () => {
  const [loginUserInfo] = useRecoilState(loginUserState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
            {isExistValue(loginUserInfo.userId) && (
              <div className='text-white'>ようこそ {subString(loginUserInfo.userName, 4)} さん</div>
            )}
            <SideNavLink href='/' image='top.png'>
              トップ
            </SideNavLink>
            <SideNavLink href='/signup' image='signup.png'>
              ユーザー登録
            </SideNavLink>
            {/* 　ログイン前のみ表示 */}
            {!isExistValue(loginUserInfo.userId) && (
              <SideNavLink href='/login' image='login.png'>
                ログイン
              </SideNavLink>
            )}
            {/* ログイン後のみ表示 */}
            {isExistValue(loginUserInfo.userId) && (
              <>
                <SideNavLink href='/search' image='search.png'>
                  一覧/検索
                </SideNavLink>
                <SideNavLink href='/contribution' image='contribute.png'>
                  投稿
                </SideNavLink>
                <SideNavLink href='/contributionHistory' image='edit.png'>
                  履歴/編集
                </SideNavLink>
                {/* 設定とサブナビ */}
                <SettingSideNav />
                <SideNavLink href='/' image='logout.png' isLogoutLink={true}>
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
