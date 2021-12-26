import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { SLIDER } from 'constants/slider';

//トップページのスライダーコンポーネント
const SlickImages: React.VFC = () => {
  return (
    <Slider {...SLIDER.settings}>
      {SLIDER.IMAGES.map((OBJ: any) => {
        return (
          <div className='w-1080 sm:w-full' key={OBJ.KEY}>
            <Image src={OBJ.IMG} alt='イメージ' width='1080px' height='600px' layout='responsive' />
            <p className='w-1080 text-center text-xl font-semibold text-purple-700 mt-4 mb-4 sm:w-full sm:text-sm'>
              {OBJ.MSG}
            </p>
          </div>
        );
      })}
    </Slider>
  );
};

export { SlickImages };
