import { logout } from 'common/utils/logout';

//ログアウトボタンコンポーネント
const LogoutBtn: React.VFC = () => {
  return (
    <div
      onClick={logout}
      className='absolute right-4 top-2 w-24 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded-3xl text-center px-2 py-1'
    >
      ログアウト
    </div>
  );
};
export { LogoutBtn };
