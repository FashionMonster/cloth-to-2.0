import { firebase } from 'common/utils/frontend/firebase';
import { isExistValue } from 'common/utils/isExistValue';

//ユーザーの削除　※未使用　今後のユーザー削除機能実装時に使用予定
const deleteUser = (): void => {
  let user: firebase.User | null = firebase.auth().currentUser;

  if (isExistValue(user)) {
    throw new Error();
  }

  user!.delete().catch((error: unknown) => {
    throw error;
  });
};

export { deleteUser };
