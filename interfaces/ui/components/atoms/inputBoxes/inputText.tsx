import type { LegacyRef } from 'react';
import type { FieldError } from 'react-hook-form';

//引数の型定義
type Props = {
  id: string;
  name: string;
  isDisabled: boolean;
  defaultValue: string;
  placeholder: string;
  maxLength: string;
  register: LegacyRef<HTMLInputElement> | undefined;
  errors: FieldError | undefined;
  componentName: string;
};

//テキスト入力コンポーネント
const InputText: React.VFC<Props> = (props) => {
  let wrapStyle;
  let inputStyle;
  //スタイルの設定
  if (props.componentName == 'contributeForm') {
    wrapStyle = 'w-408 h-8 sm:w-352';
    inputStyle =
      'w-408 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black sm:w-352';
  } else if (props.componentName == 'searchInput') {
    wrapStyle = 'w-300 h-8';
    inputStyle =
      'w-300 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black';
  } else if (props.componentName == 'searchInputUnitPrice') {
    wrapStyle = 'w-204 h-8';
    inputStyle =
      'w-204 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black';
  } else if (
    props.componentName == 'userSetting' ||
    props.componentName == 'groupSetting' ||
    props.componentName == 'signup'
  ) {
    wrapStyle = 'w-200 h-8 sm:w-40';
    inputStyle =
      'w-200 h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black sm:w-40';
  } else {
    wrapStyle = 'h-8';
    inputStyle =
      'h-8 border border-solid rounded-sm border-gray-400 disabled:bg-gray-100 disabled:text-black';
  }

  return (
    <div className={wrapStyle}>
      <input
        type='text'
        id={props.id}
        name={props.name}
        disabled={props.isDisabled}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        ref={props.register}
        className={inputStyle}
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
