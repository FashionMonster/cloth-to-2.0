import { Dispatch, SetStateAction } from 'react';

//引数の型定義
type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

//ハンバーガーアイコンコンポーネント
const Hamburger: React.VFC<Props> = (props) => {
  return (
    <div
      className='w-6 h-6 border-2 border-purple-700 rounded relative flex justify-center items-center'
      onClick={() => props.setIsOpen(true)}
    >
      <span className='absolute w-3 h-0.5 block rounded bg-purple-700 top-1' />
      <span className='absolute w-3 h-0.5 block rounded bg-purple-700' />
      <span className='absolute w-3 h-0.5 block rounded bg-purple-700 bottom-1' />
    </div>
  );
};

export { Hamburger };
