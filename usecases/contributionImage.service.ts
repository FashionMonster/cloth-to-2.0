import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { ContributionImageCreateInputDto } from 'domains/dto/contribution/contributionImageCreateInputDto';
import { getDbErrorMessage } from 'common/utils/getDbErrorMessage';
import { PrismaTransaction } from 'constants/types/prismaTransaction';

@Injectable()
export class ContributionImageService {
  constructor(private prisma: PrismaService) {}

  //投稿画像登録
  async insertContributionImage(
    prismaTran: PrismaTransaction,
    data: ContributionImageCreateInputDto
  ): Promise<void> {
    try {
      //一時的に外部キー制約を無効にする
      await prismaTran.$queryRaw`SET FOREIGN_KEY_CHECKS = 0;`;
      //投稿画像テーブル登録
      await prismaTran.contributionImage.create({
        data,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //投稿画像更新
  async updateContributionImage(
    prismaTran: PrismaTransaction,
    contributionId: number,
    updateContributionImageParam: Prisma.ContributionImageUpdateInput
  ): Promise<void> {
    try {
      await prismaTran.contributionImage.update({
        where: {
          contributionId: contributionId,
        },
        data: updateContributionImageParam,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }
}
