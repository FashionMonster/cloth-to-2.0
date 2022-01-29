import { firebase } from 'common/utils/firebase';

//ログイン
const login = async (email: string, password: string): Promise<void> => {
  try {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      });
  } catch (error: any) {
    throw error;
  }
};

export { login };
