import { Dispatch, SetStateAction } from 'react';

//引数の型定義
type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

//閉じるアイコンコンポーネント
const Close: React.VFC<Props> = (props) => {
  return (
    <div
      className='w-6 h-6 border-2 border-purple-700 rounded relative flex justify-center items-center'
      onClick={() => props.setIsOpen(false)}
    >
      <span className='w-3 h-0.5 block rounded bg-purple-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45' />
      <span className='w-3 h-0.5 block rounded bg-purple-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-45' />
    </div>
  );
};

export { Close };
