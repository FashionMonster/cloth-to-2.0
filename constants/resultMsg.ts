//モーダル画面に表示する処理結果メッセージ
const RESULT_MSG = {
  OK: {
    FIN_CREATE_CONTRIBUTION: '投稿完了しました',
    FIN_UPDATE_CONTRIBUTION: '投稿更新完了しました',
    FIN_CREATE_USER: 'ユーザー登録完了しました',
    FIN_UPDATE_USER: 'ユーザー情報更新完了しました',
    FIN_LINK_USER_TO_GROUP: 'グループ紐付け完了しました',
    FIN_CREATE_GROUP: 'グループ登録完了しました',
  },
  ERR: {
    EMAIL_ALREADY_IN_USE: 'ユーザーID(メールアドレス)は\n既に使用されています',
    INVALID_EMAIL: 'ユーザーID(メールアドレス)の\n形式が不正です',
    OPERATION_NOT_ALLOWED: 'ユーザー登録処理は\n現在許可されていません',
    WEAK_PASSWORD: 'パスワードが脆弱です。\n変更して下さい',
    USER_DISABLED: '現在使用できないユーザーです',
    USER_NOT_FOUND: '入力したユーザーID\n(メールアドレス)は存在しません',
    WRONG_PASSWORD: 'パスワードが誤っています',
    WRONG_PASSWORD_TOO_MANY: '複数回の認証に失敗しました。\n時間を置いて再度実行してください。',
    WORNG_EXTENSION: '.jpeg .jpg .gif .png 以外の\nファイルは選択不可です',
    OTHER: '予期しないエラーです。\n管理者に連絡して下さい',
    BAD_REQUEST: 'リクエストデータが不正です',
  },
};

export { RESULT_MSG };
