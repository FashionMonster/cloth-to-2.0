import { logout } from 'common/utils/frontend/logout';
import { useContext } from 'react';
import { AuthContext } from '../../organisms/authProvider';

//ログアウトボタンコンポーネント
const LogoutBtn: React.VFC = () => {
  const value = useContext(AuthContext);

  return (
    <div
      onClick={() => {
        logout(value!);
      }}
      className='absolute right-4 top-2 w-24 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded-3xl text-center px-2 py-1'
    >
      ログアウト
    </div>
  );
};
export { LogoutBtn };
