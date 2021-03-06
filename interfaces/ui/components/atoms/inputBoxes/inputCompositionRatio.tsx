import type { LegacyRef } from 'react';
import type { FieldError } from 'react-hook-form';

//引数の型定義
type Props = {
  id: string;
  name: string;
  isDisabled: boolean;
  defaultValue: string;
  register: LegacyRef<HTMLInputElement> | undefined;
  errors: FieldError | undefined;
};

//素材比率コンポーネント
const InputCompositionRatio: React.VFC<Props> = (props) => {
  return (
    <div className='w-100 h-8'>
      <input
        type='number'
        name={props.name}
        id={props.id}
        className='w-100 h-8 border border-solid rounded-sm border-gray-400'
        ref={props.register}
      />
      {props.errors?.type === 'required' && (
        <div className='text-red-600 text-sm'>必須入力です</div>
      )}
      {props.errors?.type === 'max' && <div className='text-red-600 text-sm'>最大は100です</div>}
      {props.errors?.type === 'min' && <div className='text-red-600 text-sm'>最小は1です</div>}
    </div>
  );
};

export { InputCompositionRatio };
