import Router from 'next/router';

//引数の型定義
type Props = {
  backType: string;
};

//戻るボタンコンポーネント
const BackBtn: React.VFC<Props> = (props) => {
  return (
    <div
      onClick={() => {
        if (props.backType === 'browserBack') {
          Router.back();
        } else if (props.backType === 'reload') {
          Router.reload();
        }
      }}
      className='w-16 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded text-center px-2 py-1'
    >
      戻る
    </div>
  );
};
export { BackBtn };
