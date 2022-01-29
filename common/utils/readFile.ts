//ファイル読み込み処理
const readFile = (blob: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve) => {
    // FileReaderの生成
    const reader = new FileReader();

    // ファイルの読み込み
    reader.readAsDataURL(blob);

    // reader.resultでファイル内容にアクセス
    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

export { readFile };
