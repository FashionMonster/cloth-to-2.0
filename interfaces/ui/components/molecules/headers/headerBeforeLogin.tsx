import { CreateUserBtn } from 'interfaces/ui/components/atoms/buttons/createUserBtn';
import { LoginBtn } from 'interfaces/ui/components/atoms/buttons/loginBtn';

//ログイン前ヘッダーコンポーネント
const HeaderBeforeLogin: React.VFC = () => {
  return (
    <>
      <div className='absolute top-4 right-40'>
        <CreateUserBtn />
      </div>
      <div className='absolute top-4 right-8'>
        <LoginBtn />
      </div>
    </>
  );
};

export { HeaderBeforeLogin };
