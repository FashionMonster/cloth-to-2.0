import { Footer } from 'interfaces/ui/components/organisms/footer';
import { Header } from 'interfaces/ui/components/organisms/header';
import { BackBtn } from 'interfaces/ui/components/atoms/buttons/backBtn';

//引数の型定義
type Props = {
  errorMsg: string;
  backType: string;
};

//エラー表示コンポーネント(画面)
const Error: React.VFC<Props> = (props) => {
  return (
    <body className='min-h-screen grid grid-rows-error'>
      <Header isLogined={true} />
      <main className='grid grid-cols-contents'>
        <div className='col-start-2 col-end-3 grid grid-rows-6'>
          <div className='flex justify-center items-center row-start-3 row-end-4'>
            <p>{props.errorMsg}</p>
          </div>
          <div className='flex justify-center items-center row-start-4 row-end-5'>
            <BackBtn backType={props.backType} />
          </div>
        </div>
      </main>
      <Footer />
    </body>
  );
};

export { Error };
