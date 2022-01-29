//表示する名前の編集
const subString = (displayName: string, maxLength: number): string => {
  if (displayName.length > maxLength) {
    return displayName.substr(0, maxLength) + '...';
  } else {
    return displayName;
  }
};

export { subString };
