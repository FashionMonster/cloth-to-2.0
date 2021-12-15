import { fb } from './firebase';

//ユーザーの削除
const deleteUser = (): void => {
  let user = fb.auth().currentUser;
  user.delete().catch((error: unknown) => {
    throw error;
  });
};

export { deleteUser };
