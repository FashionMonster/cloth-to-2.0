//ユーザー登録、ログイン時などのデータ型定義
//ユーザー名は必須ではない
type UserFormData = {
  userId: string;
  password: string;
  userName?: string;
  previousUserId?: string;
};

export type { UserFormData };
