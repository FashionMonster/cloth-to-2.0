import ReactLoading from 'react-loading';

//ローディングコンポーネント
const Loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-purple-200'>
      <ReactLoading type='spinningBubbles' color='white' width='120px' height='120px' />
    </div>
  );
};

export { Loading };
