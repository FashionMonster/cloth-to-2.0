import { default as bcrypt } from 'bcrypt';

//入力したパスワードが正しいかチェックする
const isVerifyPass = async (requestPass: string, dbPass: string): Promise<boolean> => {
  let isVerify = await bcrypt.compare(requestPass, dbPass).catch((error) => {
    throw error;
  });
  return isVerify;
};

export { isVerifyPass };
