//値が存在するか判定する
const isExistValue = (value: any): boolean => {
  if (value !== '' && value !== null && value !== undefined) {
    return true;
  } else {
    return false;
  }
};

export { isExistValue };
