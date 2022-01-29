import Image from 'next/image';
import Link from 'next/link';
import { subString } from 'common/utils/subString';

//引数の型定義
type Props = {
  path: string;
  contributionId: number;
  materialName: string;
  src: string;
};

//一覧/検索ページ
//検索結果(画像一枚)表示
const SearchResult: React.VFC<Props> = (props) => {
  return (
    <div className='w-200 sm:w-170'>
      <Link
        href={`/${props.path}/[contributionId]`}
        as={`/${props.path}/${props.contributionId}`}
        passHref
      >
        <Image
          src={props.src}
          width={200}
          height={200}
          alt='イメージ画像'
          blurDataURL={props.src}
          placeholder='blur'
          layout='responsive'
        />
      </Link>
      <p className='font-semibold w-200 text-center mt-4 sm:w-170'>
        {subString(props.materialName, 4)}
      </p>
    </div>
  );
};

export { SearchResult };
