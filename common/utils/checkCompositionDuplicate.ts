import { isExistValue } from './isExistValue';

const checkCompositionDuplicate = (getValues: any, setError: any, clearErrors: any) => {
  const allValues = getValues(['composition1', 'composition2', 'composition3']);

  const comp1Val: string = allValues['composition1'];
  const comp2Val: string = allValues['composition2'];
  const comp3Val: string = allValues['composition3'];

  //未選択ではない 且つ 選択が重複している場合
  if (
    (comp1Val === comp2Val && isExistValue(comp1Val) && isExistValue(comp2Val)) ||
    (comp1Val === comp3Val && isExistValue(comp1Val) && isExistValue(comp3Val)) ||
    (comp2Val === comp3Val && isExistValue(comp2Val) && isExistValue(comp3Val))
  ) {
    setError('composition1', {
      type: 'duplicate',
      message: '選択が重複しています',
    });
  } else {
    clearErrors(['composition1', 'composition2', 'composition3']);
  }
};

export { checkCompositionDuplicate };
