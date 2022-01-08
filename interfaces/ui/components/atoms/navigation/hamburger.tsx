import { Dispatch, SetStateAction } from 'react';

//引数の型定義
type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

//ハンバーガーアイコンコンポーネント
const Hamburger: React.VFC<Props> = (props) => {
  return (
    <div
      className='w-8 h-8 relative flex justify-center items-center'
      onClick={() => props.setIsOpen(true)}
    >
      <span className='absolute w-6 h-1 block rounded bg-purple-700 top-1' />
      <span className='absolute w-6 h-1 block rounded bg-purple-700' />
      <span className='absolute w-6 h-1 block rounded bg-purple-700 bottom-1' />
    </div>
  );
};

export { Hamburger };
