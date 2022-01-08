import { LogoutBtn } from 'interfaces/ui/components/atoms/buttons/logoutBtn';

//ログイン後ヘッダーコンポーネント
const HeaderAfterLogin: React.VFC = () => {
  return (
    <div className='absolute top-2 right-4'>
      <LogoutBtn />
    </div>
  );
};
export { HeaderAfterLogin };
