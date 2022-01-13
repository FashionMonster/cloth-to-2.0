import { firebase } from 'common/utils/firebase';

//ユーザー情報更新(Firebase)
const updateUserInfo = async (email: string, password: string): Promise<void> => {
  let user = firebase.auth().currentUser;

  try {
    //メールアドレス(ID)更新
    await user!.updateEmail(email);
    //パスワード更新
    await user!.updatePassword(password);
  } catch (error: any) {
    throw error;
  }
};

export { updateUserInfo };
