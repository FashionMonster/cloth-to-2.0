import { fb } from './firebase';

//ユーザー情報更新
const updateUserInfo = async (email: string, password: string) => {
  var user = fb.auth().currentUser;
  try {
    //メールアドレス(ID)更新
    await user.updateEmail(email);
    //パスワード更新
    await user.updatePassword(password);
  } catch (error: unknown) {
    throw error;
  }
};

export { updateUserInfo };
