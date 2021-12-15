//表示する素材名の編集
// const makeDispMaterialName = (materialName: string): string => {
//   if (materialName.length > 10) {
//     return materialName.substr(0, 10) + '...';
//   } else {
//     return materialName;
//   }
// };

//export { makeDispMaterialName };

//表示する名前の編集
const makeDisplayName = (displayName: string, maxLength: number): string => {
  if (displayName.length > 10) {
    return displayName.substr(0, 10) + '...';
  } else {
    return displayName;
  }
};
//makeDispUserNameと共通化
export { makeDisplayName };
