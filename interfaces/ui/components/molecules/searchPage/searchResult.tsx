import Image from 'next/image';
import Link from 'next/link';
import { makeSubStr } from 'common/utils/makeSubStr';

//引数の型定義
type Props = {
  data: {
    contributionId: string;
    src: string;
    materialName: string;
  };
  path: string;
};

//一覧/検索ページ
//検索結果表示
const SearchResult: React.VFC<Props> = (props) => {
  return (
    <div className='mx-auto'>
      <Link
        href={`/${props.path}/[contributionId]`}
        as={`/${props.path}/${props.data.contributionId}`}
      >
        <Image src={props.data.src} width={200} height={200} alt='イメージ画像' />
      </Link>
      <p className='font-semibold w-200 text-center mt-4'>
        {makeSubStr(props.data.materialName, 4)}
      </p>
    </div>
  );
};

export { SearchResult };
