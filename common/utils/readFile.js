//ファイル読み込み処理
const readFile = (blob) => {
  return new Promise((resolve) => {
    // FileReaderの生成
    const reader = new FileReader();

    // ファイルの読み込み
    reader.readAsDataURL(blob);

    // reader.resultでファイル内容にアクセスできる
    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

export { readFile };
