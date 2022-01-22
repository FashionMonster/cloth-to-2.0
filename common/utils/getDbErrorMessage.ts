import { DB_ERROR } from '../../constants/dbErrorInfo';

//エラーコードから、エラーメッセージを取得する
//※引数なしで渡ってきた場合、defaultの分岐に入る
const getDbErrorMessage = (errorCode?: string): string => {
  switch (errorCode) {
    case DB_ERROR.COLUMN_TOO_LONG.CODE:
      return DB_ERROR.COLUMN_TOO_LONG.MSG;
    case DB_ERROR.UNIQUE_CONSTRAINT.CODE:
      return DB_ERROR.UNIQUE_CONSTRAINT.MSG;
    case DB_ERROR.VALIDATION_ERROR.CODE:
      return DB_ERROR.VALIDATION_ERROR.MSG;
    case DB_ERROR.DATA_NOT_FOUNDS.CODE:
      return DB_ERROR.DATA_NOT_FOUNDS.MSG;
    default:
      return DB_ERROR.UNEXPECTED.MSG;
  }
};

export { getDbErrorMessage };
