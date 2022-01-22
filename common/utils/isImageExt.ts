//拡張子が.jpg .jpeg .gif .pngであるか判定する
const isImageExt = (fileName: string): boolean => {
  //正規表現を生成
  const allowExtensions: string = '(jpeg|jpg|png|gif)$';

  //拡張子のみ切出す
  const index: number = fileName.lastIndexOf('.');
  const extension: string = fileName.slice(index + 1);

  if (extension.match(allowExtensions)) {
    return true;
  } else {
    return false;
  }
};

export { isImageExt };
