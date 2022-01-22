import { FieldError } from 'react-hook-form';

//引数の型定義
type Props = {
  id: string;
  name: string;
  isDisabled: boolean;
  defaultValue: string;
  width: string;
  smWidth?: string;
  register: any; //TODO:要修正
  errors: FieldError | undefined;
};

//分類選択コンポーネント
const SelectCategory: React.VFC<Props> = (props) => {
  return (
    <div className={`w-${props.width} h-8`}>
      <select
        name={props.name}
        id={props.id}
        className={`w-${props.width} h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black disabled:opacity-100 sm:w-${props.smWidth}`}
        ref={props.register}
        disabled={props.isDisabled}
        defaultValue={props.defaultValue}
      >
        <option value=''></option>
        <option value='1'>製品</option>
        <option value='2'>生地</option>
        <option value='3'>副資材</option>
        <option value='4'>その他</option>
      </select>
      {props.errors && <div className='text-red-600 text-sm relative'>必須選択です</div>}
    </div>
  );
};

export { SelectCategory };
