import { LegacyRef } from 'react';
import type { FieldError } from 'react-hook-form';

//引数の型定義
type Props = {
  name: string;
  id: string;
  register: LegacyRef<HTMLInputElement> | undefined;
  errors: FieldError | undefined;
};

//パスワード入力コンポーネント
const InputPassword: React.VFC<Props> = (props) => {
  return (
    <div className='w-200 sm:w-40 h-8'>
      <input
        type='password'
        name={props.name}
        id={props.id}
        className='w-200 sm:w-40 h-8 border border-solid rounded-sm border-gray-400'
        ref={props.register}
      />
      {props.errors?.type === 'required' && (
        <div className='text-red-600 text-sm relative'>必須入力です</div>
      )}
      {props.errors?.type === 'minLength' && (
        <div className='text-red-600 text-sm'>最小は6桁です</div>
      )}
      {props.errors?.type === 'maxLength' && (
        <div className='text-red-600 text-sm'>最大は12桁です</div>
      )}
    </div>
  );
};

export { InputPassword };
