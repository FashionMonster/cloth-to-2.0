import Image from 'next/image';
import { NoImage } from 'interfaces/ui/components/atoms/others/noImage';
import { isExistValue } from 'common/utils/isExistValue';

//引数の型定義
type Props = {
  imgFileUrl: string;
  oneSideLength: string;
  smOneSideLength: string;
  isMain?: boolean;
};

//画像表示コンポーネント
const ImageDisplay: React.VFC<Props> = (props) => {
  //画像がない場合
  if (!isExistValue(props.imgFileUrl)) {
    return (
      <NoImage
        oneSideLength={props.oneSideLength}
        smOneSideLength={props.smOneSideLength}
        isMain={props.isMain}
      />
    );
  } else {
    return (
      <Image
        src={props.imgFileUrl}
        alt='Image'
        width={`${props.oneSideLength}px`}
        height={`${props.oneSideLength}px`}
        layout='responsive'
      />
    );
  }
};

export { ImageDisplay };
