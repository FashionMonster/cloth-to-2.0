import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { ContributionInfoEntity } from 'domains/entities/contributionInfoEntity';
import { ContributionInfoDto } from 'domains/dto/contribution/contributionInfoDto';
import { SearchReqDto } from 'domains/dto/contribution/request/searchReq.dto';
import { isExistValue } from 'common/utils/isExistValue';
import { getDbErrorMessage } from 'common/utils/getDbErrorMessage';
import { createSearchContributionCondition } from 'common/utils/createSearchContributionCondition';
import { convertContributionInfosEntityToDto } from 'common/utils/convertContributionInfosEntityToDto';

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

      if (!isExistValue(result._max)) {
        throw new Error('');
      }

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
                imageUrl1: true,
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
}
