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
import { InternalServerErrorExceptionFilter } from 'common/exceptionFilters/internalServerException.filter';
import { BadRequestExceptionFilter } from 'common/exceptionFilters/BadRequestException.filter';
import { LoggingInterceptor } from 'common/Interceptors/logging.interceptor';
import { ContributionService } from 'usecases/contribution.service';
import { ContributionImageService } from 'usecases/contributionImage.service';
import { isExistValue } from 'common/utils/isExistValue';
import { ContributeReqDto } from 'domains/dto/contribution/request/contributeReq.dto';
import { SearchReqDto } from 'domains/dto/contribution/request/searchReq.dto';
import { ContributionInfoCreateInputDto } from 'domains/dto/contribution/contributionInfoCreateInputDto';
import { ContributionImageCreateInputDto } from 'domains/dto/contribution/contributionImageCreateInputDto';
import { ContributionInfoDetailDto } from 'domains/dto/contribution/contributionInfoDetailDto';
import { UpdateContributionReqDto } from 'domains/dto/contribution/request/updateContributionReq.dto';
import { ContributionInfoDto } from 'domains/dto/contribution/contributionInfoDto';
import { getContributionInfoDetailReqDto } from 'domains/dto/contribution/request/getContributionInfoDetailReq.dto';
import { Prisma } from '@prisma/client';

@Controller('contribution')
@UseFilters(InternalServerErrorExceptionFilter, BadRequestExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class ContributionController {
  constructor(
    private readonly contriobutionService: ContributionService,
    private readonly contriobutionImageService: ContributionImageService
  ) {}

  //投稿情報登録処理
  @Post('contribute')
  async contribute(@Body() contributeReqData: ContributeReqDto) {
    //投稿画像データの取得
    const imageNameArray: string[] = contributeReqData.imageName;

    //投稿画像情報を除いた(投稿情報)オブジェクトを生成
    const { imageName, ...contributionInfo }: any = contributeReqData;
    //文字列型のプロパティに一部数字型に変換しないといけないので変換（TODO:別の変換方法を探す）
    const contributionInfoCreateInput: ContributionInfoCreateInputDto = contributionInfo;

    try {
      //投稿情報の登録
      await this.contriobutionService.insertContributionInfo(contributionInfoCreateInput);

      //投稿IDを取得
      const result = await this.contriobutionService.selectContributionId();

      //投稿画像オブジェクトの生成
      const contributionImage: ContributionImageCreateInputDto = {
        contributionId: result.contributionId,
        imageName1: imageNameArray![0],
        imageName2: isExistValue(imageNameArray![1]) ? imageNameArray![1] : null,
        imageName3: isExistValue(imageNameArray![2]) ? imageNameArray![2] : null,
        imageName4: isExistValue(imageNameArray![3]) ? imageNameArray![3] : null,
        imageName5: isExistValue(imageNameArray![4]) ? imageNameArray![4] : null,
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
  async search(@Query() searchReqData: SearchReqDto, @Res() res: Response) {
    let contributionInfos: ContributionInfoDto[] | null = null;

    //検索に必須なデータがリクエストに含まれる場合
    if (
      isExistValue(searchReqData.page) &&
      isExistValue(searchReqData.keyword) &&
      isExistValue(searchReqData.searchCategory)
    ) {
      //投稿情報検索処理
      contributionInfos = await this.contriobutionService
        .selectContributionInfos(searchReqData)
        .catch((error: any) => {
          throw error;
        });
    }

    //データ返却
    res.status(HttpStatus.OK).json({ contributionInfos: contributionInfos });

    return { statusCode: HttpStatus.OK, contributionInfos: contributionInfos };
  }

  //投稿情報取得処理
  @Get('getContributionDetail')
  async getContributionDetail(
    @Query() getContributionInfoDetailReqData: getContributionInfoDetailReqDto,
    @Res() res: Response
  ) {
    //投稿情報検索処理
    const contributionInfoDetail: ContributionInfoDetailDto | null = await this.contriobutionService
      .selectContributionInfoDetail({
        contributionId: parseInt(getContributionInfoDetailReqData.contributionId),
      })
      .catch((error: any) => {
        throw error;
      });

    //データ返却
    res.status(HttpStatus.OK).json({ contributionInfoDetail: contributionInfoDetail });

    return { statusCode: HttpStatus.OK, contributionInfoDetail: contributionInfoDetail };
  }

  //投稿情報更新処理
  @Post('updateContribution')
  async updateContribution(
    @Body() updateContributionReqData: UpdateContributionReqDto,
    @Res() res: Response
  ) {
    //投稿画像データの取得
    const imageNameArray: string[] = updateContributionReqData.imageName;
    const contributionIdParam: number = parseInt(updateContributionReqData.contributionId);

    //投稿画像情報を除いた(投稿情報)オブジェクトを生成
    const { imageName, ...contributionInfo }: any = updateContributionReqData;
    const { contributionId, ...contributionInfo2 }: any = contributionInfo;

    //文字列型のプロパティに一部数字型に変換しないといけないので変換（TODO:別の変換方法を探す）
    const contributionInfoUpdateInput: Prisma.ContributionInfoUpdateInput = contributionInfo2;

    try {
      //投稿情報の更新
      await this.contriobutionService.updateContributionInfo(
        contributionId,
        contributionInfoUpdateInput
      );

      //投稿画像オブジェクトの生成
      const contributionImage: Prisma.ContributionImageUpdateInput = {
        imageName1: imageNameArray![0],
        imageName2: isExistValue(imageNameArray![1]) ? imageNameArray![1] : null,
        imageName3: isExistValue(imageNameArray![2]) ? imageNameArray![2] : null,
        imageName4: isExistValue(imageNameArray![3]) ? imageNameArray![3] : null,
        imageName5: isExistValue(imageNameArray![4]) ? imageNameArray![4] : null,
      };

      //投稿画像情報の更新
      await this.contriobutionImageService.updateContributionImage(
        contributionIdParam,
        contributionImage
      );
    } catch (error: any) {
      throw error;
    }

    //データ返却
    res.status(HttpStatus.OK).json({ contributionInfoDetail: contributionInfoUpdateInput });

    return { statusCode: HttpStatus.CREATED };
  }
}
