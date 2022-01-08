//引数の型定義
type Props = {
  for: string;
  children: React.ReactNode;
};

//フォームの項目名コンポーネント
const InputLabel: React.VFC<Props> = (props) => {
  return (
    <label htmlFor={props.for} className='w-200 sm:w-40 sm:text-sm'>
      {props.children}
    </label>
  );
};

export { InputLabel };
