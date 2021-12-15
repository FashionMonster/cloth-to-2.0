import type { PropsChildlen } from 'constants/types/propsChildlen';

//見出しコンポーネント
const H2: React.VFC<PropsChildlen> = (props) => {
  return (
    <h2 className='mb-4 text-center text-purple-700 text-3xl font-semibold'>{props.children}</h2>
  );
};

export { H2 };
