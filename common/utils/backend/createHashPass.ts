import { default as bcrypt } from 'bcrypt';
import { SALT_ROUNDS } from 'constants/saltRounds';

//パスワードをハッシュ化する
const createHashPass = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export { createHashPass };
