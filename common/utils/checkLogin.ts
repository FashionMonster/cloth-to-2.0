// import { firebase } from 'common/utils/firebase';

// //ログインチェック
// const checkLogin = (): Promise<boolean> => {
//   return new Promise((resolve) => {
//     firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
//       if (user !== null) {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     });
//   });
// };

// export { checkLogin };

import { firebase } from 'common/utils/firebase';

//ログインチェック
const checkLogin = (): string | null => {
  let loginedUserEmail = null;
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    if (user !== null) {
      loginedUserEmail = user.email;
    }
  });

  return loginedUserEmail;
};

export { checkLogin };
