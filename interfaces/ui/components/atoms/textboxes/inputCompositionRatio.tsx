//引数の型定義
type Props = {
  width: string;
  name: string;
  register: any; //TODO:要修正
  errors: {
    type: string;
  };
};

//素材比率コンポーネント
const InputCompositionRatio: React.VFC<Props> = (props) => {
  return (
    <div className={`w-${props.width} h-8`}>
      <input
        type='number'
        name={props.name}
        className={`w-${props.width} h-8 border border-solid rounded-sm border-gray-400`}
        ref={props.register}
      />
      {props.errors?.type === 'required' && (
        <div className='text-red-600 text-sm'>必須入力です</div>
      )}
      {props.errors?.type === 'max' && <div className='text-red-600 text-sm'>最大値は100です</div>}
      {props.errors?.type === 'min' && <div className='text-red-600 text-sm'>最小値は1です</div>}
    </div>
  );
};

export { InputCompositionRatio };
