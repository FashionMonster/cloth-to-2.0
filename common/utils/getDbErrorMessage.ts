import { DB_ERROR_MSG } from '../../constants/dbErrorMsg';

//Prismaのエラーコードから、エラーメッセージを取得する
const getDbErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'P2000':
      return DB_ERROR_MSG.COLUMN_TOO_LONG;
    case 'P2002':
      return DB_ERROR_MSG.UNIQUE_CONSTRAINT;
    case 'P2007':
      return DB_ERROR_MSG.VALIDATION_ERROR;
    case 'P2025':
      return DB_ERROR_MSG.DATA_NOT_FOUNDS;
    default:
      return DB_ERROR_MSG.UNEXPECTED;
  }
};

export { getDbErrorMessage };
