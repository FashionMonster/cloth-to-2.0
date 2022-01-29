//ログイン時に取得したユーザー情報の型定義
type LoginResType = {
  userId: string;
  userName: string;
  groupId: string | null;
};

export type { LoginResType };
