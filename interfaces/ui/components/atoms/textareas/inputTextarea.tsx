import { LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';

//引数の型定義
type Props = {
  id: string;
  name: string;
  isDisabled: boolean;
  defaultValue: string;
  placeholder: string;
  width: string;
  smWidth?: string;
  maxLength: string;
  register: LegacyRef<HTMLTextAreaElement> | undefined;
  errors: FieldError | undefined;
};

//テキストエリアコンポーネント
const InputTextarea: React.VFC<Props> = (props) => {
  return (
    <div className={`w-${props.width} h-112`}>
      <textarea
        id={props.id}
        name={props.name}
        disabled={props.isDisabled}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        ref={props.register}
        className={`w-${props.width} h-112 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black sm:w-${props.smWidth}`}
      />
      {props.errors?.type === 'maxLength' && (
        <div className='text-red-600 text-sm'>最大は{props.maxLength}文字です</div>
      )}
    </div>
  );
};

export { InputTextarea };
