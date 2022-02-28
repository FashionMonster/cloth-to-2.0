import type { LegacyRef } from 'react';
import type { FieldError } from 'react-hook-form';

//引数の型定義
type Props = {
  id: string;
  name: string;
  isDisabled: boolean;
  defaultValue: string;
  register: LegacyRef<HTMLSelectElement> | undefined;
  errors?: FieldError | undefined;
  componentName: string;
};

//色選択コンポーネント
const SelectColor: React.VFC<Props> = (props) => {
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
        <option value='1'>レッド</option>
        <option value='2'>オレンジ</option>
        <option value='3'>イエロー</option>
        <option value='4'>ベージュ</option>
        <option value='5'>ブラウン</option>
        <option value='6'>カーキ</option>
        <option value='7'>オリーブ</option>
        <option value='8'>グリーン</option>
        <option value='9'>ネイビー</option>
        <option value='10'>ブルー</option>
        <option value='11'>パープル</option>
        <option value='12'>ピンク</option>
        <option value='13'>ホワイト</option>
        <option value='14'>グレー</option>
        <option value='15'>チャコールグレー</option>
        <option value='16'>ブラック</option>
        <option value='17'>シルバー</option>
        <option value='18'>ゴールド</option>
        <option value='19'>その他</option>
      </select>
      {props.errors && <div className='text-red-600 text-sm relative'>必須選択です</div>}
    </div>
  );
};
export { SelectColor };
