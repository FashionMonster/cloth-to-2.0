import { NextRouter, useRouter } from 'next/router';
import { isActiveUrl } from 'common/utils/frontend/isActiveUrl';
import { NavLink } from 'interfaces/ui/components/atoms/navigation/navLink';

//設定ナビゲーションコンポーネント
const SettingNav: React.VFC = () => {
  const router: NextRouter = useRouter();

  const defaultStyle =
    'bg-purple-200 font-semibold h-12 leading-12 text-center border-l-2 border-r-2 hover:bg-purple-300';

  const activeStyle =
    'bg-purple-300 font-semibold h-12 leading-12 text-center border-l-2 border-r-2';

  return (
    <>
      <div
        className={
          isActiveUrl('/userSetting', router.pathname) ||
          isActiveUrl('/groupSetting', router.pathname) ||
          isActiveUrl('/linkUserToGroup', router.pathname)
            ? activeStyle
            : defaultStyle
        }
      >
        設定&#9661;
      </div>
      <div className='absolute top-12 left-0.5 z-0 invisible group-hover:visible'>
        <ul>
          <li>
            <NavLink href='/userSetting' isSettingNav={true}>
              ユーザー設定
            </NavLink>
          </li>
          <li>
            <NavLink href='/groupSetting' isSettingNav={true}>
              グループアカウント作成
            </NavLink>
          </li>
          <li>
            <NavLink href='/linkUserToGroup' isSettingNav={true}>
              グループ紐付け
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export { SettingNav };
