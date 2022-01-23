import { ContributionInfo } from '.prisma/client';
import {
  Controller,
  UseFilters,
  HttpStatus,
  Get,
  Res,
  UseInterceptors,
  Query,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { InternalServerErrorExceptionFilter } from '../../common/exceptionFilters/internalServerException.filter';
import { BadRequestExceptionFilter } from '../../common/exceptionFilters/BadRequestException.filter';
import { LoggingInterceptor } from '../../common/Interceptors/logging.interceptor';
import { ContributionService } from '../../usecases/contribution.service';
import { ContributionImageService } from 'usecases/contributionImage.service';
import { ContributeDTO } from '../../domains/dto/contribution/contribute.dto';
import { ContributionImageCreateInput } from '../../constants/types/contributionImageCreateInput';
import { SearchDTO } from '../../domains/dto/contribution/search.dto';
import { isExistValue } from 'common/utils/isExistValue';
import { ContributionInfoCreateInput } from 'constants/types/contributionInfoCreateInput';
import { ContributionInfosDto } from 'domains/dto/contributionInfosDto';

@Controller('contribution')
@UseFilters(InternalServerErrorExceptionFilter, BadRequestExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class ContributionController {
  constructor(
    private readonly contriobutionService: ContributionService,
    private readonly contriobutionImageService: ContributionImageService
  ) {}

  //ユーザー情報登録処理
  @Post('contribute')
  async contribute(@Body() contribution: ContributeDTO) {
    //投稿画像データの取得
    const imageUrlArray = contribution.imageUrl;

    //投稿画像情報を除いた(投稿情報)オブジェクトを生成
    const { imageUrl, ...contributionInfo }: any = contribution;
    //文字列型のプロパティに一部数字型に変換しないといけないので変換（TODO:別の変換方法を探す）
    const contributionInfoCreateInput: ContributionInfoCreateInput = contributionInfo;

    try {
      //投稿情報の登録
      await this.contriobutionService.insertContributionInfo(contributionInfoCreateInput);

      //投稿IDを取得
      const result = await this.contriobutionService.selectContributionId();

      //投稿画像オブジェクトの生成
      const contributionImage: ContributionImageCreateInput = {
        contributionId: result.contributionId,
        imageUrl1: imageUrlArray![0],
        imageUrl2: isExistValue(imageUrlArray![1]) ? imageUrlArray![1] : null,
        imageUrl3: isExistValue(imageUrlArray![2]) ? imageUrlArray![2] : null,
        imageUrl4: isExistValue(imageUrlArray![3]) ? imageUrlArray![3] : null,
        imageUrl5: isExistValue(imageUrlArray![4]) ? imageUrlArray![4] : null,
      };

      //投稿画像(URL)の登録
      await this.contriobutionImageService.insertContributionImage(contributionImage);
    } catch (error: any) {
      throw error;
    }

    return { statusCode: HttpStatus.CREATED };
  }

  //投稿情報取得処理
  @Get('search')
  async search(@Query() requestData: SearchDTO, @Res() res: Response) {
    let contributionInfos: ContributionInfosDto | null = null;

    //検索に必須なデータがリクエストに含まれる場合
    if (
      isExistValue(requestData.page) &&
      isExistValue(requestData.keyword) &&
      isExistValue(requestData.searchCategory)
    ) {
      //投稿情報検索処理
      contributionInfos = await this.contriobutionService
        .selectContributionInfos(requestData)
        .catch((error) => {
          throw error;
        });
    }

    //HTTPレスポンス
    res.status(HttpStatus.OK).json({ contributionInfos: contributionInfos });
    return { statusCode: HttpStatus.OK, contributionInfos: contributionInfos };
  }
}
