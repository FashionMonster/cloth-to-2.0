import { ChangeEventHandler } from 'react';

//引数の型定義
type Props = {
  selectFile: ChangeEventHandler<HTMLInputElement> | undefined;
  register: any; //TODO:要修正
  isRequired: boolean;
  errors: {
    type: string;
  };
};

//ファイル選択ボタンコンポーネント
const FileSelectBtn: React.VFC<Props> = (props) => {
  return (
    <label
      htmlFor='uploadBtn'
      className='bg-purple-700 hover:bg-purple-800 text-white rounded w-32 text-center px-2 py-1'
    >
      ファイルを選択
      <input
        type='file'
        multiple={true}
        name='imageFiles'
        id='uploadBtn'
        className='hidden'
        onChange={props.selectFile}
        ref={props.register({ required: props.isRequired })}
        accept='.png,.jpg,.jpeg,.gif'
      />
      {props.errors?.type === 'required' && (
        <div className='text-red-600 text-sm relative left-0 top-1'>必須選択です</div>
      )}
    </label>
  );
};

export { FileSelectBtn };
