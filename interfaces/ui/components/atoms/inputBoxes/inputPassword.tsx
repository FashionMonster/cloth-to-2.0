import { LegacyRef, useState } from 'react';
import type { FieldError } from 'react-hook-form';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

//引数の型定義
type Props = {
  width: string;
  name: string;
  id: string;
  register: LegacyRef<HTMLInputElement> | undefined;
  errors: FieldError | undefined;
};

//パスワード入力コンポーネント
const InputPassword: React.VFC<Props> = (props) => {
  // const [isReveal, setIsReveal] = useState<boolean>(false);

  return (
    <div className={`w-${props.width} h-8`}>
      <input
        type='password'
        name={props.name}
        id={props.id}
        className={`w-${props.width} h-8 border border-solid rounded-sm border-gray-400`}
        ref={props.register}
      />
      {/* <FontAwesomeIcon icon={faChevronRight} /> */}
      {props.errors?.type === 'required' && (
        <div className='text-red-600 text-sm relative'>必須入力です</div>
      )}
      {props.errors?.type === 'minLength' && (
        <div className='text-red-600 text-sm'>最小は6桁です</div>
      )}
      {props.errors?.type === 'maxLength' && (
        <div className='text-red-600 text-sm'>最大は12桁です</div>
      )}
    </div>
  );
};

export { InputPassword };
