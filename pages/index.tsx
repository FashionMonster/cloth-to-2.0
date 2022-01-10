import Image from 'next/image';
import { Header } from 'interfaces/ui/components/organisms/header';
import { H2 } from 'interfaces/ui/components/atoms/others/h2element';
import { Footer } from 'interfaces/ui/components/organisms/footer';
import { SlickImages } from 'interfaces/ui/components/molecules/others/slickImages';

//TOP画面
const Top: React.VFC = () => (
  <body>
    <div className='mb-8 w-full sm:mb-4'>
      <Header isLogined={false} />
    </div>
    <main className='w-1080 mx-auto sm:w-full'>
      {/* タイトル */}
      <div className='mb-8 sm:mb-4'>
        <div className='mb-8 sm:mb-4'>
          <Image
            src='/share_and_create.png'
            alt='イメージ'
            width='1080px'
            height='600px'
            layout='responsive'
          />
        </div>
        <h1 className='text-center text-purple-700 text-4xl font-bold sm:text-base'>
          アパレル事業者の情報共有を簡単にします
        </h1>
      </div>
      {/* 問いかけ */}
      <div className='mb-8 bg-gray-100 p-8 rounded-3xl sm:mb-4 sm:p-4'>
        <H2>あなたの環境はこんな状況になってませんか？</H2>
        <div className='grid grid-cols-askOfTopPage sm:grid-cols-sm_askOfTopPage'>
          <ul className='leading-16 text-2xl font-semibold sm:leading-8 sm:text-xxs'>
            <li className='h-16 sm:h-8'>
              ・仕入先や素材・製品に関する情報を周りに共有できていない
            </li>
            <li className='h-16 sm:h-8'>
              ・他社員が持つ仕入先や素材・製品の情報を知ることが難しい
            </li>
            <li className='h-16 sm:h-8'>・打合せで情報共有している(不要な情報もあるけど。。)</li>
          </ul>
          <Image
            src='/bad_icon.png'
            alt='イメージ'
            width='216px'
            height='216px'
            layout='responsive'
          />
        </div>
      </div>
      {/* サービスについて */}
      <div className='mb-8 sm:mb-4'>
        <H2>サービス Cloth-Toについて</H2>
        <p className='mb-4 text-center text-2xl font-semibold sm:text-xxs sm:font-bold'>
          アパレル事業を営む企業(グループ)で各メンバーの持つ情報を共有出来ます。
          <br />
          ユーザーは新しい知見を得て、さらなるクリエイションに活かせます。
        </p>
        <Image
          src='/data_share.png'
          alt='DATA_SHARE'
          width='1080px'
          height='550px'
          layout='responsive'
        />
      </div>
      {/* アプリの使用方法 */}
      <div className='mb-12'>
        <div className='mb-4'>
          <H2>サービスの使い方</H2>
        </div>
        {/* TODO: レスポンシブ対応(ボタンを小さく) */}
        <SlickImages />
      </div>
    </main>
    <Footer isNeedScroll={true} />
  </body>
);

export default Top;
