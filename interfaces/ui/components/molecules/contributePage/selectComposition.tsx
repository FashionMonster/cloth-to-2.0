import { checkCompositionDuplicate } from 'common/utils/frontend/checkCompositionDuplicate';
import type { ErrorOption, FieldError } from 'react-hook-form';
import type { LegacyRef } from 'react';

//引数の型定義
type Props = {
  id: string;
  name: string;
  isDisabled: boolean;
  defaultValue: string;
  register: LegacyRef<HTMLSelectElement> | undefined;
  errors: FieldError | undefined;
  getValues: any;
  setError: (name: string, error: ErrorOption) => void;
  clearErrors: (name?: string | string[] | undefined) => void;
};

//素材選択コンポーネント
const SelectComposition: React.VFC<Props> = (props) => {
  return (
    <div className='w-16 sm:w-55 h-8'>
      <select
        id={props.id}
        name={props.name}
        disabled={props.isDisabled}
        defaultValue={props.defaultValue}
        ref={props.register}
        onChange={() =>
          checkCompositionDuplicate(props.getValues, props.setError, props.clearErrors)
        }
        className='w-16 sm:w-55 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black disabled:opacity-100'
      >
        <option value=''></option>
        <option value='1'>綿</option>
        <option value='2'>麻</option>
        <option value='3'>羊毛</option>
        <option value='4'>絹</option>
        <option value='5'>ポリエステル</option>
        <option value='6'>ナイロン</option>
        <option value='7'>アクリル</option>
        <option value='8'>ポリウレタン</option>
        <option value='9'>レーヨン</option>
        <option value='10'>キュプラ</option>
        <option value='11'>アセテート</option>
        <option value='12'>その他</option>
      </select>
      {props.errors?.type === 'duplicate' && (
        <div className='text-red-600 text-sm w-40 relative'>{props.errors.message}</div>
      )}
    </div>
  );
};

export { SelectComposition };
