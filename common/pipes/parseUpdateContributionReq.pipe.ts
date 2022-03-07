import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ContributionInfoCreateInputDto } from 'domains/dto/contributionInfoCreateInputDto';
import { ContributeReqDto } from 'interfaces/requestDto/contribution/contributeReq.dto';

//投稿処理時、一部のデータを数字型に変換する
@Injectable()
export class ParseUpdateContributionReqPipe
  implements PipeTransform<ContributeReqDto, ContributionInfoCreateInputDto>
{
  transform(value: ContributeReqDto, metadata: ArgumentMetadata): ContributionInfoCreateInputDto {
    //数字型変換が必要なプロパティ
    const intProperty = [
      'compositionRatio1',
      'compositionRatio2',
      'compositionRatio3',
      'unitPrice',
    ];

    type IntDataType = {
      compositionRatio1?: number;
      compositionRatio2?: number;
      compositionRatio3?: number;
      unitPrice?: number;
    };

    let intData: IntDataType = {};
    (Object.keys(value) as (keyof ContributeReqDto)[]).map((prop) => {
      const isIntProperty = intProperty.includes(prop);

      //数字型変換が必要なプロパティの場合
      if (isIntProperty) {
        intData[prop as keyof IntDataType] = parseInt(value[prop] as string);
      }
    });

    //数字型に変換したデータで新たなオブジェクトを生成
    const contributionInfoCreateInputDto: ContributionInfoCreateInputDto = Object.assign(
      value,
      intData
    );

    return contributionInfoCreateInputDto;
  }
}
