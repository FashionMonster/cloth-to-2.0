import { firebase } from 'common/utils/firebase';

//ログイン
const login = async (email: string, password: string) => {
  try {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      });
  } catch (error: unknown) {
    throw error;
  }
};

export { login };
