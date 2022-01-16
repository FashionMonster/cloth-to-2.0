import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContributionInfo } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { SearchContributionInfosDTO } from '../domains/dto/searchContributionInfos.dto';
import { makeQueryConditions } from '../common/utils/makeQueryConditions';
import { getDbErrorMessage } from '../common/utils/getDbErrorMessage';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService) {}

  //投稿情報検索
  async selectContributionInfos(
    param: SearchContributionInfosDTO
  ): Promise<ContributionInfo[] | null> {
    //検索条件を生成 ※配列の中にオブジェクトが複数存在
    const conditions: { AND: {}[] } = makeQueryConditions(param);

    try {
      return await this.prisma.contributionInfo.findMany({ where: conditions });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }
}
