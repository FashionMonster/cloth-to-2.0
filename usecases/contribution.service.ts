import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, ContributionInfo } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { SearchDTO } from '../domains/dto/contribution/search.dto';
import { createSearchContributionCondition } from '../common/utils/createSearchContributionCondition';
import { getDbErrorMessage } from '../common/utils/getDbErrorMessage';
import { isExistValue } from 'common/utils/isExistValue';
import { ContributionInfoCreateInput } from 'constants/types/contributionInfoCreateInput';
import { ContributionInfosEntity } from 'domains/entities/contributionInfosEntity';
import { convertContributionInfosEntityToDto } from 'common/utils/convertContributionInfosEntityToDto';
import { ContributionInfosDto } from 'domains/dto/contributionInfosDto';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService) {}

  //投稿情報登録
  async insertContributionInfo(data: Prisma.ContributionInfoUncheckedCreateInput): Promise<void> {
    try {
      await this.prisma.contributionInfo.create({
        data,
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
  async selectContributionInfos(param: SearchDTO): Promise<ContributionInfosDto | null> {
    //検索条件を生成 ※配列の中にオブジェクトが複数存在
    const conditions: { AND: {}[] } = createSearchContributionCondition(param);

    try {
      const resultData: ContributionInfosEntity | null =
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
