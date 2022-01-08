//グループアカウントデータ取得時のデータ型定義
type GetGroupAccount = {
  groupId: string;
  groupName: string;
  groupPass?: string;
};

export type { GetGroupAccount };
