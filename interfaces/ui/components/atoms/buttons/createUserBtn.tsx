import Link from 'next/link';

//会員登録ボタンコンポーネント
const CreateUserBtn: React.VFC = () => {
  return (
    <Link href='/signup'>
      <a className='w-36 h-8 block bg-purple-700 hover:bg-purple-800 text-white rounded-3xl text-center px-2 py-1'>
        無料ユーザー登録
      </a>
    </Link>
  );
};
export { CreateUserBtn };
