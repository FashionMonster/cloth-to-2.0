import { useRecoilState } from 'recoil';
import { loginUserState } from 'common/utils/frontend/loginUserState';
import { subString } from 'common/utils/subString';
import { LogoutBtn } from 'interfaces/ui/components/atoms/buttons/logoutBtn';
import { SideNavigation } from 'interfaces/ui/components/organisms/sideNavigation';

//ログイン後ヘッダーコンポーネント
const HeaderAfterLogin: React.VFC = () => {
  //ログインユーザー情報を取得
  const [loginUserInfo] = useRecoilState(loginUserState);

  return (
    <>
      {/* PCサイズの場合のみ表示 */}
      <div className='sm:hidden absolute top-5 right-40'>
        {/* ようこそ　{subString(value!.loginUserInfo.userName, 4)} さん */}
        ようこそ　{subString(loginUserInfo.userName, 4)} さん
      </div>
      <div className='sm:hidden absolute top-2 right-4'>
        <LogoutBtn />
      </div>
      {/* スマホサイズのみ表示 */}
      <div className='hidden sm:block'>
        <SideNavigation />
      </div>
    </>
  );
};
export { HeaderAfterLogin };
