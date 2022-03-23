import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { isExistValue } from 'common/utils/isExistValue';
import { getDbErrorMessage } from 'common/utils/getDbErrorMessage';
import { createSearchContributionCondition } from 'common/utils/backend/createSearchContributionCondition';
import { convertContributionInfosEntityToDto } from 'common/utils/backend/convertContributionInfosEntityToDto';
import { ContributionInfoEntity } from 'domains/entities/contributionInfoEntity';
import { ContributionInfoDetailEntity } from 'domains/entities/contributionInfoDetailEntity';
import { ContributionInfoDto } from 'domains/dto/contributionInfoDto';
import { ContributionInfoDetailDto } from 'domains/dto/contributionInfoDetailDto';
import { ContributionSelectWhereInputDto } from 'domains/dto/contributionSelectWhereInputDto';
import { convertContributionInfoDetailEntityToDto } from 'common/utils/backend/convertContributionInfoDetailEntityToDto';
import { PrismaTransaction } from 'constants/types/prismaTransaction';
import { DISPLAY_DATA_NUM } from 'constants/dispalyDataNum';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService) {}

  //投稿情報登録
  async insertContributionInfo(
    prismaTran: PrismaTransaction,
    insertContributionInfoParam: Prisma.ContributionInfoUncheckedCreateInput
  ): Promise<void> {
    try {
      await prismaTran.contributionInfo.create({
        data: insertContributionInfoParam,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //投稿ID最大値検索
  async selectContributionId(prismaTran: PrismaTransaction): Promise<{ contributionId: number }> {
    try {
      const result: { 'last_insert_id()': number }[] =
        await prismaTran.$queryRaw`SELECT last_insert_id();`;

      return { contributionId: result[0]['last_insert_id()'] } as { contributionId: number };
    } catch (error: any) {
      //最大値が取得できない場合
      if (!isExistValue(error.code)) {
        throw new InternalServerErrorException({
          code: 'UNEXPECTED',
          message: getDbErrorMessage(),
        });
      }

      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //投稿情報検索件数取得
  async selectContributionInfosCount(
    selectContributionInfosParam: ContributionSelectWhereInputDto
  ): Promise<number> {
    //検索条件を生成 ※配列の中にオブジェクトが複数存在
    const conditions: { AND: {}[] } = createSearchContributionCondition(
      selectContributionInfosParam
    );

    try {
      const resultData = await this.prisma.contributionInfo.count({
        where: conditions,
      });

      return resultData;
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //投稿情報検索
  async selectContributionInfos(
    selectContributionInfosParam: ContributionSelectWhereInputDto
  ): Promise<ContributionInfoDto[] | null> {
    //検索条件を生成 ※配列の中にオブジェクトが複数存在
    const conditions: { AND: {}[] } = createSearchContributionCondition(
      selectContributionInfosParam
    );

    try {
      //skip,takeはpaginationの設定
      //https://www.prisma.io/docs/concepts/components/prisma-client/pagination
      const resultData: ContributionInfoEntity[] | null =
        await this.prisma.contributionInfo.findMany({
          where: conditions,
          skip:
            (selectContributionInfosParam.page as number) === 1
              ? 0
              : ((selectContributionInfosParam.page as number) - 1) * DISPLAY_DATA_NUM.ONE_PAGE,
          take: DISPLAY_DATA_NUM.ONE_PAGE,
          select: {
            contributionId: true,
            materialName: true,
            relationContributionImage: {
              select: {
                imageName1: true,
              },
            },
          },
        });

      //DTOに詰め直して返却
      return convertContributionInfosEntityToDto(resultData);
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //投稿情報検索
  async selectContributionInfoDetail(
    selectContributionInfoDetailParam: Prisma.ContributionInfoWhereUniqueInput
  ): Promise<ContributionInfoDetailDto | null> {
    try {
      const resultData: ContributionInfoDetailEntity | null =
        await this.prisma.contributionInfo.findUnique({
          where: selectContributionInfoDetailParam,
          select: {
            contributionId: true,
            materialName: true,
            category: true,
            composition1: true,
            compositionRatio1: true,
            composition2: true,
            compositionRatio2: true,
            composition3: true,
            compositionRatio3: true,
            fabricStructure: true,
            color: true,
            pattern: true,
            processing: true,
            unitPrice: true,
            supplier: true,
            comment: true,
            relationUserId: {
              select: {
                userName: true,
              },
            },
            relationContributionImage: {
              select: {
                imageName1: true,
                imageName2: true,
                imageName3: true,
                imageName4: true,
                imageName5: true,
              },
            },
          },
        });

      console.log('確認：' + (resultData as ContributionInfoDetailEntity).relationUserId?.userName);

      //DTOに詰め直して返却
      return convertContributionInfoDetailEntityToDto(resultData as ContributionInfoDetailEntity);
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //投稿情報更新
  async updateContributionInfo(
    prismaTran: PrismaTransaction,
    contributionId: number,
    updateContributionInfoParam: Prisma.ContributionInfoUpdateInput
  ): Promise<void> {
    try {
      await prismaTran.contributionInfo.update({
        where: {
          contributionId: contributionId,
        },
        data: updateContributionInfoParam,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }
}
