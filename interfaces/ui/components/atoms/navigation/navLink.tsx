import Link from 'next/link';
import { useRouter } from 'next/router';
import { isActiveUrl } from 'common/utils/frontend/isActiveUrl';

//引数の型定義
type Props = {
  href: string;
  isSettingNav: boolean;
  children: React.ReactNode;
};

const NavLink: React.VFC<Props> = (props) => {
  const router = useRouter();

  let defaultStyle;
  let activeStyle;
  let linkStyle;
  //設定サブナビの場合
  if (props.isSettingNav) {
    defaultStyle =
      'bg-purple-200 font-semibold h-12 leading-12 text-center hover:bg-purple-300 border-t-2';
    activeStyle = 'bg-purple-300 font-semibold h-12 leading-12 text-center border-t-2';
    linkStyle = 'w-266 block';
  } else {
    defaultStyle =
      'bg-purple-200 font-semibold h-12 leading-12 text-center hover:bg-purple-300 border-l-2';
    activeStyle = 'bg-purple-300 font-semibold h-12 leading-12 text-center border-l-2';
    linkStyle = 'w-270 block';
  }

  return (
    <li className={isActiveUrl(props.href, router.pathname) ? activeStyle : defaultStyle}>
      <Link href={props.href}>
        <a className={linkStyle}>{props.children}</a>
      </Link>
    </li>
  );
};

export { NavLink };
