import { useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { loginUserState } from 'common/utils/frontend/loginUserState';
import { logout } from 'common/utils/frontend/logout';

//ログアウトボタンコンポーネント
const LogoutBtn: React.VFC = () => {
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);
  const queryClient = useQueryClient();

  return (
    <div
      onClick={() => {
        logout(setLoginUserInfo, queryClient);
      }}
      className='absolute right-4 top-2 w-24 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded-3xl text-center px-2 py-1'
    >
      ログアウト
    </div>
  );
};
export { LogoutBtn };
