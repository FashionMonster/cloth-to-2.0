import { checkCompositionRatio } from 'common/utils/frontend/checkCompositionRatio';
import type { ErrorOption, FieldError } from 'react-hook-form';
import type { LegacyRef } from 'react';

//引数の型定義
type Props = {
  id: string;
  name: string;
  isDisabled: boolean;
  defaultValue: string;
  width: string;
  smWidth?: string;
  register: LegacyRef<HTMLInputElement> | undefined;
  errors: FieldError | undefined;
  getValues: any;
  setError: (name: string, error: ErrorOption) => void;
  clearErrors: (name?: string | string[] | undefined) => void;
};

//素材比率コンポーネント
const InputCompositionRatio: React.VFC<Props> = (props) => {
  return (
    <div className={`w-${props.width} h-8`}>
      <input
        type='number'
        id={props.id}
        name={props.name}
        disabled={props.isDisabled}
        defaultValue={props.defaultValue}
        ref={props.register}
        onChange={() => checkCompositionRatio(props.getValues, props.setError, props.clearErrors)}
        className={`w-${props.width} h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black sm:w-${props.smWidth}`}
      />
      {props.errors?.type === 'totalRatioMax' && (
        <div className='text-red-600 text-sm w-40 relative'>{props.errors.message}</div>
      )}
      {props.errors?.type === 'ratioNegative' && (
        <div className='text-red-600 text-sm w-44 relative'>{props.errors.message}</div>
      )}
    </div>
  );
};

export { InputCompositionRatio };
