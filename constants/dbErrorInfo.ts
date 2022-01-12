const DB_ERROR = {
  COLUMN_TOO_LONG: { CODE: 'P2000', MSG: '桁数上限を超えたデータが存在します' },
  UNIQUE_CONSTRAINT: { CODE: 'P2002', MSG: 'データは既に登録されています' },
  VALIDATION_ERROR: { CODE: 'P2007', MSG: 'データが不正です' },
  DATA_NOT_FOUNDS: { CODE: 'P2025', MSG: '該当するデータがありません' },
  UNEXPECTED: { CODE: 'UNEXPECTED', MSG: '予期しないエラーが発生しました' },
};

export { DB_ERROR };
