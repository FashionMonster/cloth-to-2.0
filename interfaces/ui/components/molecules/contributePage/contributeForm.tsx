import type { DeepMap, ErrorOption, FieldError } from 'react-hook-form';
import type { ContributeFormType } from 'constants/types/form/contributeFormType';
import { SelectCategory } from 'interfaces/ui/components/atoms/selectBoxes/selectCategory';
import { SelectColor } from 'interfaces/ui/components/atoms/selectBoxes/selectColor';
import { SelectComposition } from 'interfaces/ui/components/molecules/contributePage/selectComposition';
import { InputCompositionRatio } from 'interfaces/ui/components/molecules/contributePage/inputCompositionRatio';
import { InputTextarea } from 'interfaces/ui/components/atoms/textareas/inputTextarea';
import { InputText } from 'interfaces/ui/components/atoms/inputBoxes/inputText';

//引数の型定義
type Props = {
  register: any;
  errors: DeepMap<ContributeFormType, FieldError>;
  getValues: any;
  setError: (name: string, error: ErrorOption) => void;
  clearErrors: (name?: string | string[] | undefined) => void;
  isDisabled: boolean;
  data?: any;
};

//投稿画面フォームコンポーネント
const ContributeForm: React.VFC<Props> = (props) => {
  const componentName = 'contributeForm';

  return (
    <>
      <label htmlFor='materialName'>素材・製品名</label>
      <InputText
        id='materialName'
        name='materialName'
        isDisabled={props.isDisabled}
        defaultValue={props.data === undefined ? '' : props.data.materialName}
        placeholder='例：2020SS シャツ用生地'
        maxLength='50'
        register={props.register({ required: true, maxLength: 50 })}
        errors={props.errors.materialName}
        componentName={componentName}
      />

      <label htmlFor='category'>分類</label>
      <SelectCategory
        id='category'
        name='category'
        isDisabled={props.isDisabled}
        defaultValue={props.data === undefined ? '' : props.data.category}
        register={props.register({ required: true })}
        errors={props.errors.category}
        componentName={componentName}
      />

      <label htmlFor='composition1'>主組成</label>
      <div className='grid grid-cols-3 gap-1'>
        <div className='grid grid-cols-2 gap-1'>
          <SelectComposition
            id='composition1'
            name='composition1'
            isDisabled={props.isDisabled}
            defaultValue={props.data === undefined ? '' : props.data.composition1}
            register={props.register()}
            errors={props.errors.composition1}
            getValues={props.getValues}
            setError={props.setError}
            clearErrors={props.clearErrors}
          />
          <InputCompositionRatio
            id='compositionRatio1'
            name='compositionRatio1'
            isDisabled={props.isDisabled}
            defaultValue={props.data === undefined ? '' : props.data.compositionRatio1}
            register={props.register()}
            errors={props.errors.compositionRatio1}
            getValues={props.getValues}
            setError={props.setError}
            clearErrors={props.clearErrors}
          />
        </div>
        <div className='grid grid-cols-2 gap-1'>
          <SelectComposition
            name='composition2'
            id='composition2'
            isDisabled={props.isDisabled}
            defaultValue={props.data === undefined ? '' : props.data.composition2}
            register={props.register()}
            errors={props.errors.composition2}
            getValues={props.getValues}
            setError={props.setError}
            clearErrors={props.clearErrors}
          />
          <InputCompositionRatio
            id='compositionRatio2'
            name='compositionRatio2'
            isDisabled={props.isDisabled}
            defaultValue={props.data === undefined ? '' : props.data.compositionRatio2}
            register={props.register()}
            errors={props.errors.compositionRatio2}
            getValues={props.getValues}
            setError={props.setError}
            clearErrors={props.clearErrors}
          />
        </div>
        <div className='grid grid-cols-2 gap-1'>
          <SelectComposition
            name='composition3'
            id='composition3'
            isDisabled={props.isDisabled}
            defaultValue={props.data === undefined ? '' : props.data.composition3}
            register={props.register()}
            errors={props.errors.composition3}
            getValues={props.getValues}
            setError={props.setError}
            clearErrors={props.clearErrors}
          />
          <InputCompositionRatio
            id='compositionRatio3'
            name='compositionRatio3'
            isDisabled={props.isDisabled}
            defaultValue={props.data === undefined ? '' : props.data.compositionRatio3}
            register={props.register()}
            errors={props.errors.compositionRatio3}
            getValues={props.getValues}
            setError={props.setError}
            clearErrors={props.clearErrors}
          />
        </div>
      </div>

      <label htmlFor='fabricStructure'>織・編地</label>
      <InputText
        id='fabricStructure'
        name='fabricStructure'
        isDisabled={props.isDisabled}
        defaultValue={props.data === undefined ? '' : props.data.fabricStructure}
        placeholder='例：サテン'
        maxLength='50'
        register={props.register({ maxLength: 50 })}
        errors={props.errors.fabricStructure}
        componentName={componentName}
      />

      <label htmlFor='color'>色</label>
      <SelectColor
        id='color'
        name='color'
        isDisabled={props.isDisabled}
        defaultValue={props.data === undefined ? '' : props.data.color}
        register={props.register()}
        componentName={componentName}
      />

      <label htmlFor='pattern'>柄</label>
      <InputText
        id='pattern'
        name='pattern'
        isDisabled={props.isDisabled}
        defaultValue={props.data === undefined ? '' : props.data.pattern}
        placeholder='例：ストライプ'
        maxLength='50'
        register={props.register({ maxLength: 50 })}
        errors={props.errors.pattern}
        componentName={componentName}
      />

      <label htmlFor='processing'>加工</label>
      <InputText
        id='processing'
        name='processing'
        isDisabled={props.isDisabled}
        defaultValue={props.data === undefined ? '' : props.data.processing}
        placeholder='例：撥水加工、防汚加工'
        maxLength='50'
        register={props.register({ maxLength: 50 })}
        errors={props.errors.processing}
        componentName={componentName}
      />

      <label htmlFor='unitPrice'>単価</label>
      <InputText
        name='unitPrice'
        id='unitPrice'
        placeholder='例：480'
        register={props.register({ maxLength: 12, pattern: /^[0-9]+$/ })}
        errors={props.errors.unitPrice}
        isDisabled={props.isDisabled}
        defaultValue={props.data === undefined ? '' : props.data.unitPrice}
        maxLength='12'
        componentName={componentName}
      />

      <label htmlFor='supplier'>仕入先</label>
      <InputText
        id='supplier'
        name='supplier'
        isDisabled={props.isDisabled}
        defaultValue={props.data === undefined ? '' : props.data.supplier}
        placeholder='例：株式会社 〇〇'
        maxLength='50'
        register={props.register({ maxLength: 50 })}
        errors={props.errors.supplier}
        componentName={componentName}
      />

      <label htmlFor='comment'>コメント</label>
      <InputTextarea
        id='comment'
        name='comment'
        isDisabled={props.isDisabled}
        defaultValue={props.data === undefined ? '' : props.data.comment}
        placeholder='その他共有したい内容があればご入力ください。'
        maxLength='200'
        register={props.register({ maxLength: 200 })}
        errors={props.errors.comment}
      />
    </>
  );
};

export { ContributeForm };
