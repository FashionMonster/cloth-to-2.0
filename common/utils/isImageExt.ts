//拡張子が.jpg .jpeg .gif .pngであるか判定する
const isImageExt = (fileName: string): boolean => {
  //外だしすべきか？
  const allowExtensions: string = '(jpeg|jpg|png|gif)$';

  const index: number = fileName.lastIndexOf('.');
  const extension: string = fileName.slice(index + 1);

  if (extension.match(allowExtensions)) {
    return true;
  } else {
    return false;
  }
};

export { isImageExt };
