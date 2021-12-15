import { Settings } from 'react-slick';

const SLIDER: {
  settings: Settings;
  IMAGES: { IMG: string; MSG: string; KEY: string }[];
} = {
  //スライダーの設定
  settings: {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  },
  //スライダーに使用する画像の設定
  //※keyを使用する理由は以下URL参照
  //https://qiita.com/koba04/items/a4d23245d246c53cd49d
  IMAGES: [
    {
      IMG: '/slideShow/createUser.png',
      MSG: '会員登録します',
      KEY: 'createUserImage',
    },
    {
      IMG: '/slideShow/login.png',
      MSG: 'ログインします',
      KEY: 'loginImage',
    },
    {
      IMG: '/slideShow/linkUserToGroup.png',
      MSG: 'グループ紐づけします(もしくはグループ作成します)',
      KEY: 'createUserImage',
    },
    {
      IMG: '/slideShow/contribute.png',
      MSG: '投稿して、皆に共有します',
      KEY: 'linkUserToGroupImage',
    },
    {
      IMG: '/slideShow/search.png',
      MSG: '検索して、気になる情報を探します',
      KEY: 'searchImage',
    },
    {
      IMG: '/slideShow/contributionDetail.png',
      MSG: '投稿詳細を確認します',
      KEY: 'contributionDetailImage',
    },
  ],
};

export { SLIDER };
