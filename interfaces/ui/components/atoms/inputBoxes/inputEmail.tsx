import type { LegacyRef } from 'react';
import type { FieldError } from 'react-hook-form';

//引数の型定義
type Props = {
  width: string;
  name: string;
  id: string;
  defaultValue: string;
  placeholder: string;
  register: LegacyRef<HTMLInputElement> | undefined;
  errors: FieldError | undefined;
};

//メールアドレス入力コンポーネント
const InputEmail: React.VFC<Props> = (props) => {
  return (
    <div className={`w-${props.width} h-8`}>
      <input
        type='email'
        name={props.name}
        id={props.id}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        className={`w-${props.width} h-8 border border-solid rounded-sm border-gray-400`}
        ref={props.register}
      />
      {props.errors?.type === 'required' && (
        <div className='text-red-600 text-sm relative'>必須入力です</div>
      )}
      {props.errors?.type === 'pattern' && (
        <div className='text-red-600 text-sm relative'>不正なメアド形式です</div>
      )}
      {props.errors?.type === 'maxLength' && (
        <div className='text-red-600 text-sm relative'>最大は255文字です</div>
      )}
    </div>
  );
};

export { InputEmail };
