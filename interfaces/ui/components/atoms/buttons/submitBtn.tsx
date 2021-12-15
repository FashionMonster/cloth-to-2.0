//引数の型定義
type Props = {
  value: string;
  width: number;
};

//サブミットボタン
const SubmitBtn: React.VFC<Props> = (props) => {
  return (
    <input
      type='submit'
      id='submit'
      value={props.value}
      className={`w-${props.width} h-8 bg-purple-700 hover:bg-purple-800 text-white rounded text-center px-2 py-1 `}
    />
  );
};
export { SubmitBtn };
