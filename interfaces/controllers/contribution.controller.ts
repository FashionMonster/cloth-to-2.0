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
import { Prisma, PrismaClient } from '@prisma/client';
import { InternalServerErrorExceptionFilter } from 'common/exceptionFilters/internalServerException.filter';
import { BadRequestExceptionFilter } from 'common/exceptionFilters/badRequestException.filter';
import { LoggingInterceptor } from 'common/Interceptors/logging.interceptor';
import { ContributionService } from 'usecases/contribution.service';
import { ContributionImageService } from 'usecases/contributionImage.service';
import { ContributeReqDto } from 'interfaces/requestDto/contribution/contributeReq.dto';
import { SearchReqDto } from 'interfaces/requestDto/contribution/searchReq.dto';
import { UpdateContributionReqDto } from 'interfaces/requestDto/contribution/updateContributionReq.dto';
import { getContributionInfoDetailReqDto } from 'interfaces/requestDto/contribution/getContributionInfoDetailReq.dto';
import { ParseContributeReqPipe } from 'common/pipes/parseContributeReq.pipe';
import { ParseSearchReqPipe } from 'common/pipes/parseSearchReq.pipe';
import { ContributionInfoDto } from 'domains/dto/contributionInfoDto';
import { ContributionInfoDetailDto } from 'domains/dto/contributionInfoDetailDto';
import { ContributionInfoCreateInputDto } from 'domains/dto/contributionInfoCreateInputDto';
import { ContributionSelectWhereInputDto } from 'domains/dto/contributionSelectWhereInputDto';
import { ContributionImageCreateInputDto } from 'domains/dto/contributionImageCreateInputDto';
import { isExistValue } from 'common/utils/isExistValue';

@Controller('contribution')
@UseFilters(InternalServerErrorExceptionFilter, BadRequestExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class ContributionController {
  constructor(
    private readonly contriobutionService: ContributionService,
    private readonly contriobutionImageService: ContributionImageService
  ) {}

  //投稿情報登録処理
  //※ParseContributeReqPipeでリクエストデータを型変換する
  @Post('contribute')
  async contribute(@Body(new ParseContributeReqPipe()) contributeReqData: ContributeReqDto) {
    //投稿画像データの取得
    const imageNameArray: string[] = contributeReqData.imageName;

    //投稿画像情報を除いた(投稿情報)オブジェクトを生成
    const { imageName, ...contributionInfoCreateInput } = contributeReqData;

    const prisma = new PrismaClient();
    try {
      //トランザクション開始(エラー発生時、自動でロールバックする)
      await prisma.$transaction(async (prisma) => {
        //投稿情報の登録
        await this.contriobutionService.insertContributionInfo(
          prisma,
          contributionInfoCreateInput as ContributionInfoCreateInputDto
        );

        //投稿IDを取得
        const result = await this.contriobutionService.selectContributionId(prisma);

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
        await this.contriobutionImageService.insertContributionImage(prisma, contributionImage);
      });
    } catch (error: any) {
      throw error;
    }

    return { statusCode: HttpStatus.CREATED };
  }

  //投稿情報取得処理
  //※ParseSearchReqPipeでリクエストデータを型変換する
  @Get('search')
  async search(@Query(new ParseSearchReqPipe()) searchReqData: SearchReqDto, @Res() res: Response) {
    let contributionInfosTotalCount: number = 0;
    let contributionInfos: ContributionInfoDto[] | null = null;

    //検索に必須なデータがリクエストに含まれる場合
    if (
      isExistValue(searchReqData.page) &&
      isExistValue(searchReqData.keyword) &&
      isExistValue(searchReqData.searchCategory)
    ) {
      //投稿情報件数取得処理
      contributionInfosTotalCount = await this.contriobutionService
        .selectContributionInfosCount(searchReqData as ContributionSelectWhereInputDto)
        .catch((error: any) => {
          throw error;
        });

      //取得件数が１件以上の場合
      if (contributionInfosTotalCount > 0) {
        //投稿情報検索処理
        contributionInfos = await this.contriobutionService
          .selectContributionInfos(searchReqData as ContributionSelectWhereInputDto)
          .catch((error: any) => {
            throw error;
          });
      }
    }

    //データ返却
    res
      .status(HttpStatus.OK)
      .json({ totalCount: contributionInfosTotalCount, contributionInfos: contributionInfos });

    return {
      statusCode: HttpStatus.OK,
      totalCount: contributionInfosTotalCount,
      contributionInfos: contributionInfos,
    };
  }

  //投稿情報詳細取得処理
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
    @Body(new ParseContributeReqPipe()) updateContributionReqData: UpdateContributionReqDto,
    @Res() res: Response
  ) {
    //投稿IDの取得
    const contributionIdParam: number = parseInt(updateContributionReqData.contributionId);

    //投稿画像データの取得
    const imageNameArray: string[] = updateContributionReqData.imageName;

    //投稿画像情報を除いた(投稿情報)オブジェクトを生成
    const { imageName, ...reqWithoutImageName } = updateContributionReqData;

    const { contributionId, ...contributionInfoUpdateInput } =
      reqWithoutImageName as unknown as ContributionInfoCreateInputDto;

    const prisma = new PrismaClient();
    try {
      //トランザクション開始(エラー発生時、自動でロールバックする)
      await prisma.$transaction(async (prisma) => {
        //投稿情報の更新
        await this.contriobutionService.updateContributionInfo(
          prisma,
          contributionIdParam,
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
          prisma,
          contributionIdParam,
          contributionImage
        );
      });
    } catch (error: any) {
      throw error;
    }

    //データ返却
    res.status(HttpStatus.OK).json({ contributionInfoDetail: contributionInfoUpdateInput });

    return { statusCode: HttpStatus.OK };
  }
}
