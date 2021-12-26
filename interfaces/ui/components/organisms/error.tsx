import { Body } from 'interfaces/ui/components/organisms/bodyElement';
import { Header } from 'interfaces/ui/components/organisms/header';
import { FunctionExplain } from 'interfaces/ui/components/atoms/others/functionExplain';
import { Main } from 'interfaces/ui/components/organisms/mainElement';
import { Footer } from 'interfaces/ui/components/organisms/footer';
import { BackBtn } from 'interfaces/ui/components/atoms/buttons/backBtn';

//引数の型定義
type Props = {
  errorMsg: string;
  backType: string;
};

//エラー表示コンポーネント(画面)
const Error: React.VFC<Props> = (props) => {
  return (
    <Body>
      <Header isLogined={true} />
      {/* 画面説明 */}
      <FunctionExplain>
        エラーが発生しました。
        <br />
        下記メッセージをご確認ください。
      </FunctionExplain>
      <Main width='432'>
        <div className='grid grid-rows-2 gap-8'>
          <p className='h-8 leading-8 text-center'>{props.errorMsg}</p>
          <div className='flex justify-center items-center'>
            <BackBtn backType={props.backType} />
          </div>
        </div>
      </Main>
      <div></div>
      <Footer isNeedScroll={false} />
    </Body>
  );
};

export { Error };
