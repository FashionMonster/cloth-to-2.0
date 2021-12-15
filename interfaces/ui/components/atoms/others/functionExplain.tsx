import type { PropsChildlen } from 'constants/types/propsChildlen';

//画面説明コンポーネント
const FunctionExplain: React.VFC<PropsChildlen> = (props) => {
  return <p className='h-12 text-center'>{props.children}</p>;
};

export { FunctionExplain };
