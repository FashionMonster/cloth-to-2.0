import React, { useContext } from 'react';
import { AuthContext } from 'interfaces/ui/components/organisms/authProvider';
import { subString } from 'common/utils/subString';
import { NavLink } from 'interfaces/ui/components/atoms/navigation/navLink';
import { SettingNav } from 'interfaces/ui/components/molecules/navigation/settingNav';

const Navigation = () => {
  const value = useContext(AuthContext);

  return (
    <div className='relative'>
      <div className=' absolute left-4 top-3 max_2xl:hidden'>
        ようこそ　{subString(value!.loginUserInfo.userName, 4)} さん
      </div>
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
