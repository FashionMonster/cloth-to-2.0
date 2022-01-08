import { default as bcrypt } from 'bcrypt';

//入力したパスワードが正しいかチェックする
const isVerifyPass = async (inputPass: string, dbPass: string): Promise<boolean> => {
  let isVerify = await bcrypt.compare(inputPass, dbPass);
  return isVerify;
};

export { isVerifyPass };
