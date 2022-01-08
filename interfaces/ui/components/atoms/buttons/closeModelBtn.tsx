import { Dispatch, SetStateAction } from 'react';

//引数の型定義
type Props = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

//モーダル閉じるボタン
const CloseModalBtn: React.VFC<Props> = (props) => {
  return (
    <button
      onClick={() => props.setIsModalOpen(false)}
      className='row-start-3 row-end-4 m-auto w-20 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded text-center px-2 py-1'
    >
      閉じる
    </button>
  );
};
export { CloseModalBtn };
