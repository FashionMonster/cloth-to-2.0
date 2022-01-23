import Image from 'next/image';
import Link from 'next/link';
import type { ContributionInfo } from 'constants/types/contributionInfo';
import { subString } from 'common/utils/subString';

//引数の型定義
type Props = {
  contributionInfo: ContributionInfo;
  path: string;
};

//一覧/検索ページ
//検索結果(画像一枚)表示
const SearchResult: React.VFC<Props> = (props) => {
  const imageSrc = props.contributionInfo.src as string;

  return (
    <div className='mx-auto'>
      <Link
        href={`/${props.path}/[contributionId]`}
        as={`/${props.path}/${props.contributionInfo.contributionId}`}
      >
        <Image
          src={imageSrc}
          width={200}
          height={200}
          alt='イメージ画像'
          blurDataURL={imageSrc}
          placeholder='blur'
        />
      </Link>
      <p className='font-semibold w-200 text-center mt-4'>
        {subString(props.contributionInfo.materialName, 4)}
      </p>
    </div>
  );
};

export { SearchResult };
