//アクティブなURL(現在表示しているページ)であるか判定する
const isActiveUrl = (href: string, currentUrl: string): boolean => {
  if (href === currentUrl) {
    return true;
  } else {
    return false;
  }
};

export { isActiveUrl };
