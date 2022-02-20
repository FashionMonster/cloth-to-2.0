//投稿情報テーブルデータ取得のWhere句型定義
type ContributionSelectWhereInputDto = {
  page?: number;
  searchCategory?: string;
  keyword?: string | number;
  compositionRatio?: number;
  compareCondition?: string;
  userId?: string;
  groupId?: string;
};

export type { ContributionSelectWhereInputDto };
