// import type { NextPage } from 'next';
// import { useState } from 'react';
// import axios from 'axios';

// const Home: NextPage = () => {
//   const [resData, setResData] = useState<string>('');

//   //ネスト初回リクエスト
//   const nestRequest = async () => {
//     const res: any = await axios
//       .get('../api/nestRequest')
//       .then((response) => response.data.nestResponse)
//       .catch((error) => {
//         console.log(error.response);
//         return error.response.data.serverErrMsg;
//       });
//     setResData(res);
//   };

//   //Prismaユーザー作成
//   const prismaCreateUser = async () => {
//     const res: any = await axios
//       .post('../api/user', { name: '山田太郎', email: 'sample@gamil.com' })
//       .then((response) => response.data);
//     setResData(res.name);
//   };

//   //Prismaポスト作成
//   const prismaCreatePost = async () => {
//     const res: any = await axios
//       .post('../api/post', {
//         title: '今日の感想',
//         content: '晩御飯美味しかった',
//         authorEmail: 'sample@gamil.com',
//       })
//       .then((response) => response.data);
//     setResData(res.title);
//   };

//   //Prismaポスト取得
//   const prismaSelectPost = async () => {
//     const res: any = await axios.get('../api/test/1').then((response) => response.data);
//     setResData(res.title);
//   };

//   //CSSは適当です...
//   return (
//     <body className='w-full min-h-screen'>
//       <div
//         onClick={nestRequest}
//         className='w-48 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded-3xl text-center px-2 py-1 mx-auto mt-32 mb-8'
//       >
//         Nest初回リクエスト
//       </div>
//       <div
//         onClick={prismaCreateUser}
//         className='w-48 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded-3xl text-center px-2 py-1 mx-auto mb-8'
//       >
//         Prismaユーザー作成
//       </div>
//       <div
//         onClick={prismaCreatePost}
//         className='w-48 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded-3xl text-center px-2 py-1 mx-auto mb-8'
//       >
//         Prismaポスト作成
//       </div>
//       <div
//         onClick={prismaSelectPost}
//         className='w-48 h-8 bg-purple-700 hover:bg-purple-800 text-white rounded-3xl text-center px-2 py-1 mx-auto mb-8'
//       >
//         Prismaポスト取得
//       </div>
//       <p className='text-red-500 text-center'>{resData}</p>
//     </body>
//   );
// };

// export default Home;

import Image from 'next/image';
import { Header } from 'interfaces/ui/components/organisms/header';
import { H2 } from 'interfaces/ui/components/atoms/others/h2element';
import { Footer } from 'interfaces/ui/components/organisms/footer';
import { SlickImages } from 'interfaces/ui/components/molecules/others/slickImages';

//TOP画面
const Home: React.VFC = () => (
  <body>
    <div className='mb-8'>
      <Header isLogined={false} />
    </div>
    <main className='w-1080 mx-auto'>
      {/* タイトル */}
      <div className='mb-8'>
        <div className='mb-8'>
          <Image src='/share_and_create.png' alt='イメージ' width='1080px' height='600px' />
        </div>
        <h1 className='text-center text-purple-700 text-4xl font-bold'>
          アパレル事業者の情報共有を簡単にします
        </h1>
      </div>
      {/* 問いかけ */}
      <div className='mb-8 bg-gray-100 p-8 rounded-3xl'>
        <H2>あなたの環境はこんな状況ではありませんか？</H2>
        <div className='grid grid-cols-askOfTopPage'>
          <ul className='leading-16 text-2xl font-semibold'>
            <li className='h-16'>・仕入先や素材・製品に関する情報を周りに共有できていない</li>
            <li className='h-16'>・他社員の仕入先や素材・製品に関する情報を知ることが難しい</li>
            <li className='h-16'>
              ・ミーティングで情報共有しても不必要な情報も多く時間を浪費している
            </li>
          </ul>
          <Image src='/bad_icon.png' alt='イメージ' width='216px' height='216px' />
        </div>
      </div>
      {/* サービスについて */}
      <div className='mb-8'>
        <H2>サービス Cloth-Toについて</H2>
        <p className='mb-4 text-center text-2xl font-semibold'>
          アパレル事業を営む企業、グループ内で社員それぞれが持つ情報を簡単に共有出来ます。
          <br />
          ユーザーはその情報から新しい知見を得ることが出来、さらなるクリエイションに活かせます。
        </p>
        <Image src='/data_share.png' alt='DATA_SHARE' width='1080px' height='550px' />
      </div>
      {/* アプリの使用方法 */}
      <div className='mb-8'>
        <div className='mb-4'>
          <H2>サービスの使い方</H2>
        </div>
        <SlickImages />
      </div>
    </main>
    <Footer />
  </body>
);

export default Home;
