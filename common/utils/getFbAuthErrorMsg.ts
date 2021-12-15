import { RESULT_MSG } from 'constants/resultMsg';

//Firebase認証で発生したエラーコードから、エラーメッセージを取得
const getFbAuthErrorMsg = (errorCode: string): string => {
  switch (errorCode) {
    //ログイン時のエラー
    case 'auth/user-disabled':
      return RESULT_MSG.ERR.USER_DISABLED;
    case 'auth/user-not-found':
      return RESULT_MSG.ERR.USER_NOT_FOUND;
    case 'auth/wrong-password':
      return RESULT_MSG.ERR.WRONG_PASSWORD;
    case 'auth/too-many-requests':
      return RESULT_MSG.ERR.WRONG_PASSWORD_TOO_MANY;
    //ユーザー登録時のエラー
    case 'auth/email-already-in-use':
      return RESULT_MSG.ERR.EMAIL_ALREADY_IN_USE;
    case 'auth/operation-not-allowed':
      return RESULT_MSG.ERR.OPERATION_NOT_ALLOWED;
    case 'auth/weak-password':
      return RESULT_MSG.ERR.WEAK_PASSWORD;
    //共通のエラー
    case 'auth/invalid-email':
      return RESULT_MSG.ERR.INVALID_EMAIL;
    default:
      return RESULT_MSG.ERR.OTHER;
  }
};

export { getFbAuthErrorMsg };
