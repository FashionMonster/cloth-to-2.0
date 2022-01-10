import { LogoutBtn } from 'interfaces/ui/components/atoms/buttons/logoutBtn';
import { SideNavigation } from 'interfaces/ui/components/organisms/sideNavigation';

//ログイン後ヘッダーコンポーネント
const HeaderAfterLogin: React.VFC = () => {
  return (
    <>
      {/* PCサイズの場合のみ表示 */}
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
