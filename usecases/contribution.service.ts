import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { isExistValue } from 'common/utils/isExistValue';
import { getDbErrorMessage } from 'common/utils/getDbErrorMessage';
import { createSearchContributionCondition } from 'common/utils/backend/createSearchContributionCondition';
import { convertContributionInfosEntityToDto } from 'common/utils/backend/convertContributionInfosEntityToDto';
import { ContributionInfoEntity } from 'domains/entities/contributionInfoEntity';
import { ContributionInfoDetailEntity } from 'domains/entities/contributionInfoDetailEntity';
import { SearchReqDto } from 'domains/dto/contribution/request/searchReq.dto';
import { ContributionInfoDto } from 'domains/dto/contribution/contributionInfoDto';
import { ContributionInfoDetailDto } from 'domains/dto/contribution/contributionInfoDetailDto';
import { convertContributionInfoDetailEntityToDto } from 'common/utils/backend/convertContributionInfoDetailEntityToDto';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService) {}

  //投稿情報登録
  async insertContributionInfo(
    insertContributionInfoParam: Prisma.ContributionInfoUncheckedCreateInput
  ): Promise<void> {
    try {
      await this.prisma.contributionInfo.create({
        data: insertContributionInfoParam,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //投稿ID最大値検索
  async selectContributionId(): Promise<{ contributionId: number }> {
    try {
      const result = await this.prisma.contributionInfo.aggregate({
        _max: {
          contributionId: true,
        },
      });

      return result._max as { contributionId: number };
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

  //投稿情報検索
  async selectContributionInfos(
    selectContributionInfosParam: SearchReqDto
  ): Promise<ContributionInfoDto[] | null> {
    //検索条件を生成 ※配列の中にオブジェクトが複数存在
    const conditions: { AND: {}[] } = createSearchContributionCondition(
      selectContributionInfosParam
    );

    try {
      const resultData: ContributionInfoEntity[] | null =
        await this.prisma.contributionInfo.findMany({
          where: conditions,
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

      //取得データが０件の場合
      if (!isExistValue(resultData)) {
        return null;
      }

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
    contributionId: number,
    updateContributionInfoParam: Prisma.ContributionInfoUpdateInput
  ): Promise<void> {
    try {
      await this.prisma.contributionInfo.update({
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
