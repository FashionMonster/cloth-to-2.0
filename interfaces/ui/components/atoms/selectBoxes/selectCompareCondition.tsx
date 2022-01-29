import type { LegacyRef } from 'react';

//引数の型定義
type Props = {
  id: string;
  name: string;
  isDisabled: boolean;
  register: LegacyRef<HTMLSelectElement> | undefined;
};

//比較条件選択コンポーネント
const SelectCompareCondition: React.VFC<Props> = (props) => {
  return (
    <select
      name={props.name}
      id={props.id}
      className='h-8 border border-solid rounded-sm border-gray-400'
      ref={props.register}
    >
      <option value='1'>等しい</option>
      <option value='2'>以上</option>
      <option value='3'>以下</option>
    </select>
  );
};

export { SelectCompareCondition };
