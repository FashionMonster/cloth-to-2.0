import Image from 'next/image';
import Link from 'next/Link';

//引数の型定義
type Props = {
  href: string;
  image: string;
  children: React.ReactNode;
};

//サイドナビリンクコンポーネント
const SideNavLink: React.VFC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <div className='grid grid-cols-sideNav gap-2'>
        <Image src={`/menu/${props.image}`} alt='top' width='16px' height='16px' />
        <a className='text-white rounded-3xl text-sm block'>{props.children}</a>
      </div>
    </Link>
  );
};

export { SideNavLink };
