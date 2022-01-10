import { CreateUserBtn } from 'interfaces/ui/components/atoms/buttons/createUserBtn';
import { LoginBtn } from 'interfaces/ui/components/atoms/buttons/loginBtn';
import { SideNavigation } from 'interfaces/ui/components/organisms/sideNavigation';

//ログイン前ヘッダーコンポーネント
const HeaderBeforeLogin: React.VFC = () => {
  return (
    <>
      {/* PCサイズの場合のみ表示 */}
      <div className='sm:hidden'>
        <div className='absolute top-4 right-40'>
          <CreateUserBtn />
        </div>
        <div className='absolute top-4 right-8'>
          <LoginBtn />
        </div>
      </div>
      {/* スマホサイズのみ表示 */}
      <div className='hidden sm:block'>
        <SideNavigation />
      </div>
    </>
  );
};

export { HeaderBeforeLogin };
