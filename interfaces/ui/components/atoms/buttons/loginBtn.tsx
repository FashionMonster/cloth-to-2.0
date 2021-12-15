import Link from 'next/Link';

//ログインボタンコンポーネント
const LoginBtn: React.VFC = () => {
  return (
    <Link href='/login'>
      <a className='w-24 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded-3xl text-center px-2 py-1 block'>
        ログイン
      </a>
    </Link>
  );
};
export { LoginBtn };
