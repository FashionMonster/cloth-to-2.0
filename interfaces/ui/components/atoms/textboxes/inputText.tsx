import { FieldError } from 'react-hook-form';

//引数の型定義
type Props = {
  id: string;
  name: string;
  isDisabled: boolean;
  defaultValue: string;
  placeholder: string;
  width: string;
  maxLength: string;
  register: any; //TODO:要修正
  errors: FieldError | undefined;
};

//テキスト入力コンポーネント
const InputText: React.VFC<Props> = (props) => {
  return (
    <div className={`w-${props.width} h-8`}>
      <input
        type='text'
        id={props.id}
        name={props.name}
        disabled={props.isDisabled}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        ref={props.register}
        className={`w-${props.width} h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black`}
      />
      {props.errors?.type === 'required' && (
        <div className='text-red-600 text-sm relative'>必須入力です</div>
      )}
      {props.errors?.type === 'maxLength' && (
        <div className='text-red-600 text-sm'>最大は{props.maxLength}文字です</div>
      )}
      {props.errors?.type === 'pattern' && (
        <div className='text-red-600 text-sm'>半角数字のみ入力可です</div>
      )}
    </div>
  );
};

export { InputText };
