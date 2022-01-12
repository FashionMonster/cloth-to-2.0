import { DB_ERROR } from '../../constants/dbErrorInfo';

//Prismaのエラーコードから、エラーメッセージを取得する
const getDbErrorMessage = (errorCode: string): string => {
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
