import type { GetAllGroupInfoResType } from 'constants/types/response/getAllGroupInfoResType';
import type { LegacyRef } from 'react';
import type { FieldError } from 'react-hook-form';

//引数の型定義
type Props = {
  name: string;
  id: string;
  defaultValue: string;
  width: string;
  register: LegacyRef<HTMLSelectElement> | undefined;
  errors: FieldError | undefined;
  allGroupInfo: GetAllGroupInfoResType;
  selectedGroupId: string;
};

//グループ選択コンポーネント
const SelectGroupName: React.VFC<Props> = (props) => {
  return (
    <div className={`w-${props.width} h-8`}>
      <select
        name={props.name}
        id={props.id}
        className={`w-${props.width} h-8 border border-solid rounded-sm border-gray-400`}
        ref={props.register}
      >
        <option value=''></option>
        {props.allGroupInfo.map((item) => {
          //ユーザーがすでにグループを紐付けている場合
          let isSelected = false;
          if (item.groupId === props.selectedGroupId) {
            isSelected = true;
          }

          return (
            //Reactの配列にはkeyが必要 ※条件によっては不要
            //https://zenn.dev/luvmini511/articles/f7b22d93e9c182
            <option value={item.groupId} key={item.groupId} selected={isSelected}>
              {item.groupName}
            </option>
          );
        })}
      </select>
      {props.errors && <div className='text-red-600 text-sm relative'>必須選択です</div>}
    </div>
  );
};
export { SelectGroupName };
