import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ContributionImageCreateInputDto } from 'domains/dto/contribution/contributionImageCreateInputDto';
import { getDbErrorMessage } from 'common/utils/getDbErrorMessage';

@Injectable()
export class ContributionImageService {
  constructor(private prisma: PrismaService) {}

  //投稿情報登録
  async insertContributionImage(data: ContributionImageCreateInputDto): Promise<void> {
    try {
      await this.prisma.contributionImage.create({
        data,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }
}
