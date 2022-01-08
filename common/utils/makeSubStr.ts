//表示する名前の編集
const makeSubStr = (displayName: string, maxLength: number): string => {
  if (displayName.length > maxLength) {
    return displayName.substr(0, maxLength) + '...';
  } else {
    return displayName;
  }
};
//makeDispUserNameと共通化
export { makeSubStr };
