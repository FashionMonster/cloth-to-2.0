import React, { useContext } from 'react';
import { AuthContext } from 'interfaces/ui/components/organisms/authProvider';
import { LogoutBtn } from 'interfaces/ui/components/atoms/buttons/logoutBtn';

//ログイン後ヘッダーコンポーネント
const HeaderAfterLogin: React.VFC = () => {
  const value = useContext(AuthContext);

  return (
    <>
      <div className='h-16 flex justify-center items-center min_2xl:hidden'>
        {/* ようこそ　{makeDispUserName(value.userInfo.userName)} さん */}
      </div>
      <div className='absolute top-2 right-4'>
        <LogoutBtn />
      </div>
    </>
  );
};
export { HeaderAfterLogin };
