import Image from 'next/image';
import Link from 'next/Link';

//引数の型定義
type Props = {
  href: string;
  image?: string;
  children: React.ReactNode;
};

//サイドナビリンクコンポーネント
const SideNavLink: React.VFC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <div className='grid grid-cols-sideNav gap-2'>
        {/* 画像が指定されている場合 */}
        {props.image !== undefined && (
          <Image src={`/menu/${props.image}`} alt='' width='24px' height='24px' />
        )}
        <a className='text-white'>{props.children}</a>
      </div>
    </Link>
  );
};

export { SideNavLink };
