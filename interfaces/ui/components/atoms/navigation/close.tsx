import { Dispatch, SetStateAction } from 'react';

//引数の型定義
type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

//閉じるアイコンコンポーネント
const Close: React.VFC<Props> = (props) => {
  return (
    <div
      className='w-8 h-8 relative flex justify-center items-center'
      onClick={() => props.setIsOpen(false)}
    >
      <span className='w-6 h-1 block rounded bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45 z-20' />
      <span className='w-6 h-1 block rounded bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-45 z-20' />
    </div>
  );
};

export { Close };
