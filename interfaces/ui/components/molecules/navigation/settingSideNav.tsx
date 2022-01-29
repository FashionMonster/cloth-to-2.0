import { useState } from 'react';
import Image from 'next/image';
import { SideNavLink } from 'interfaces/ui/components/atoms/navigation/sideNavlink';

//設定ナビゲーション(スマホ時のサイドナビ)コンポーネント
const SettingSideNav: React.VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className='grid grid-cols-sideNav gap-2 z-20'
        onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
          setIsOpen(!isOpen);
          //親要素のメニュー閉じるアクションを無効化
          e.stopPropagation();
        }}
      >
        <Image src='/menu/setting.png' alt='' width='24px' height='24px' />
        <div className='text-white rounded-3xl text-base block'>設定 &#9661;</div>
      </div>
      {/* 開いている時 */}
      {isOpen && (
        <div className='grid grid-rows-3 gap-4 animate-fadeIn'>
          <SideNavLink href='/userSetting'>ユーザー設定</SideNavLink>
          <SideNavLink href='/groupSetting'>グループ作成</SideNavLink>
          <SideNavLink href='/linkUserToGroup'>グループ紐付け</SideNavLink>
        </div>
      )}
    </>
  );
};

export { SettingSideNav };
