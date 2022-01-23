import React from 'react';
import { NavLink } from 'interfaces/ui/components/atoms/navigation/navLink';
import { SettingNav } from 'interfaces/ui/components/molecules/navigation/settingNav';

//ナビゲーションコンポーネント（PC表示のみ）
const Navigation: React.VFC = () => {
  return (
    <div className='relative'>
      <nav className='bg-purple-200 h-12 w-full grid grid-cols-contents'>
        <ul className='col-start-2 col-end-3 grid grid-cols-4 h-12 w-1080'>
          <li>
            <NavLink href='/search' isSettingNav={false}>
              一覧/検索
            </NavLink>
          </li>
          <li>
            <NavLink href='/contribution' isSettingNav={false}>
              投稿
            </NavLink>
          </li>
          <li>
            <NavLink href='/contributionHistory' isSettingNav={false}>
              履歴/編集
            </NavLink>
          </li>
          <li className='relative group'>
            <SettingNav />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { Navigation };
