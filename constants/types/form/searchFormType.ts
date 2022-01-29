//投稿データ検索フォームの型定義
type SearchFormType = {
  page?: number;
  searchCategory?: string;
  keyword?: string;
  compositionRatio?: string;
  compareCondition?: string;
};

export type { SearchFormType };
