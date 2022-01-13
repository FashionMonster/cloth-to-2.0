import { isExistValue } from 'common/utils/isExistValue';
import { logout } from 'common/utils/logout';
import Image from 'next/image';
import Link from 'next/Link';
import { useContext } from 'react';
import { AuthContext } from '../../organisms/authProvider';

//引数の型定義
type Props = {
  href: string;
  image?: string;
  children: React.ReactNode;
  isLogout?: boolean;
};

//サイドナビリンクコンポーネント
const SideNavLink: React.VFC<Props> = (props) => {
  const value = useContext(AuthContext);

  if (isExistValue(props.isLogout) && props.isLogout) {
    return (
      <div
        className='grid grid-cols-sideNav gap-2'
        onClick={() => {
          logout(value!);
        }}
      >
        {/* 画像が指定されている場合 */}
        {props.image !== undefined && (
          <Image src={`/menu/${props.image}`} alt='' width='24px' height='24px' />
        )}
        <div className='text-white col-start-2'>{props.children}</div>
      </div>
    );
  } else {
    return (
      <Link href={props.href}>
        <div className='grid grid-cols-sideNav gap-2'>
          {/* 画像が指定されている場合 */}
          {props.image !== undefined && (
            <Image src={`/menu/${props.image}`} alt='' width='24px' height='24px' />
          )}
          <a className='text-white col-start-2'>{props.children}</a>
        </div>
      </Link>
    );
  }
};

export { SideNavLink };
