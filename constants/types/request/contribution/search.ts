//投稿データ検索の型定義
type Search = {
  page?: number;
  searchCategory?: string;
  keyword?: string;
  compositionRatio?: string;
  compareCondition?: string;
  userId?: string;
  groupId?: string;
};

export type { Search };
