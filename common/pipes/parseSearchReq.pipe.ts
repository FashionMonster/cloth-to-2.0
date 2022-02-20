import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { isExistValue } from 'common/utils/isExistValue';
import { ContributionSelectWhereInputDto } from 'domains/dto/contribution/contributionSelectWhereInputDto';
import { SearchReqDto } from 'domains/dto/contribution/request/searchReq.dto';

//投稿処理時、一部のデータを数字型に変換する
@Injectable()
export class ParseSearchReqPipe
  implements PipeTransform<SearchReqDto, ContributionSelectWhereInputDto>
{
  transform(value: SearchReqDto, metadata: ArgumentMetadata): ContributionSelectWhereInputDto {
    //数字型変換が必要なデータの変換後格納変数
    let convertedData: ContributionSelectWhereInputDto = {};

    //ページ
    if (isExistValue(value.page)) {
      convertedData['page'] = parseInt(value.page as string);
    }

    //主組成
    if (value.searchCategory === '3' && isExistValue(value.compositionRatio)) {
      convertedData['compositionRatio'] = parseInt(value.compositionRatio as string);
    }

    //単価
    if (value.searchCategory === '8' && isExistValue(value.keyword)) {
      convertedData['keyword'] = parseInt(value.keyword as string);
    }

    //数字型に変換したデータで新たなオブジェクトを生成
    const contributionSelectWhereInputDto: ContributionSelectWhereInputDto = Object.assign(
      value,
      convertedData
    );

    return contributionSelectWhereInputDto;
  }
}
