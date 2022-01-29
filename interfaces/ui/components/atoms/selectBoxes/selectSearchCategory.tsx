import type { ChangeEventHandler, LegacyRef } from 'react';

//引数の型定義
type Props = {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  register: LegacyRef<HTMLSelectElement> | undefined;
};

//一覧/検索ページ
//入力エリアコンポーネント
const SelectSearchCategory: React.VFC<Props> = (props) => {
  return (
    <select
      name='searchCategory'
      id='searchCategory'
      onChange={props.onChange}
      className='w-120 h-8 border border-solid rounded-sm border-gray-400 inline-block'
      ref={props.register}
    >
      <option value='1'>素材・製品名</option>
      <option value='2'>分類</option>
      <option value='3'>主組成</option>
      <option value='4'>織・編地</option>
      <option value='5'>色</option>
      <option value='6'>柄</option>
      <option value='7'>加工</option>
      <option value='8'>単価</option>
      <option value='9'>仕入先</option>
      <option value='10'>投稿者</option>
    </select>
  );
};

export { SelectSearchCategory };
