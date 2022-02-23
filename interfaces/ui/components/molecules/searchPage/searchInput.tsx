import { SelectCategory } from 'interfaces/ui/components/atoms/selectBoxes/selectCategory';
import { SelectColor } from 'interfaces/ui/components/atoms/selectBoxes/selectColor';
import { SelectCompareCondition } from 'interfaces/ui/components/atoms/selectBoxes/selectCompareCondition';
import { SelectComposition } from 'interfaces/ui/components/atoms/selectBoxes/selectComposition';
// import { InputCompositionRatio } from 'interfaces/ui/components/atoms/textBoxes/inputCompositionRatio';
// import { InputText } from 'interfaces/ui/components/atoms/textBoxes/inputText';
import { DeepMap, FieldError, FieldValues } from 'react-hook-form';

//引数の型定義
type Props = {
  category: string;
  register: any;
  errors: DeepMap<FieldValues, FieldError>;
};

//一覧/検索ページ
//入力エリアコンポーネント
const SearchInput: React.VFC<Props> = ({ category, register, errors }) => {
  //2:分類
  if (category === '2') {
    return (
      <SelectCategory
        id='keyword'
        name='keyword'
        isDisabled={false}
        defaultValue=''
        width='300'
        register={register({ required: true })}
        errors={errors.keyword}
      />
    );
    //3:主組成
  } else if (category === '3') {
    return (
      <div className='grid grid-cols-inputComposition gap-2'>
        <SelectComposition
          id='keyword'
          name='keyword'
          isDisabled={false}
          defaultValue=''
          width='120'
          register={register({ required: true })}
          errors={errors.keyword}
        />
        {/* <InputCompositionRatio
          id='compositionRatio'
          name='compositionRatio'
          isDisabled={false}
          defaultValue=''
          width='100'
          register={register({ required: true, max: 100, min: 1 })}
          errors={errors.compositionRatio}
        /> */}
        <SelectCompareCondition
          id='compareCondition'
          name='compareCondition'
          register={register()}
          isDisabled={false}
        />
      </div>
    );
    //5:色
  } else if (category === '5') {
    return (
      <SelectColor
        name='keyword'
        id='keyword'
        isDisabled={false}
        defaultValue=''
        width='300'
        register={register({ required: true })}
        errors={errors.keyword}
      />
    );
    //8:単価
  } else if (category === '8') {
    return (
      <div className='grid grid-cols-inputUnitPrice gap-4'>
        {/* <InputText
          id='keyword'
          name='keyword'
          isDisabled={false}
          defaultValue=''
          placeholder=''
          width='204'
          maxLength='100'
          register={register({ required: true, pattern: /^[0-9]+$/ })}
          errors={errors.keyword}
        /> */}
        <SelectCompareCondition
          name='compareCondition'
          register={register()}
          id={''}
          isDisabled={false}
        />
      </div>
    );
    // 1:素材・製品名
    // 4:織・編地
    // 6:柄
    // 7:加工
    // 9:仕入先
    // 10:投稿者
  } else {
    return (
      // <InputText
      //   name='keyword'
      //   id='keyword'
      //   isDisabled={false}
      //   defaultValue=''
      //   placeholder=''
      //   width='300'
      //   maxLength=''
      //   register={register({ required: true })}
      //   errors={errors.keyword}
      // />
      <></>
    );
  }
};

export { SearchInput };
