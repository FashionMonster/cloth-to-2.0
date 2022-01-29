import { firebase } from './firebase';

//新規ユーザー登録（Firebase）
const signup = async (email: string, password: string): Promise<void> => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error: any) {
    throw error;
  }
};

export { signup };
