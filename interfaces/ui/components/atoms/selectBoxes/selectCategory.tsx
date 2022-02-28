import type { LegacyRef } from 'react';
import type { FieldError } from 'react-hook-form';

//引数の型定義
type Props = {
  id: string;
  name: string;
  isDisabled: boolean;
  defaultValue: string;
  register: LegacyRef<HTMLSelectElement> | undefined;
  errors: FieldError | undefined;
  componentName: string;
};

//分類選択コンポーネント
const SelectCategory: React.VFC<Props> = (props) => {
  let wrapStyle;
  let selectStyle;

  if (props.componentName == 'searchInput') {
    wrapStyle = 'w-300 h-8';
    selectStyle =
      'w-300 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black disabled:opacity-100';
  } else if (props.componentName == 'contributeForm') {
    wrapStyle = 'w-408 sm:w-352 h-8';
    selectStyle =
      'w-408 sm:w-352 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black disabled:opacity-100';
  }

  return (
    <div className={wrapStyle}>
      <select
        name={props.name}
        id={props.id}
        className={selectStyle}
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
