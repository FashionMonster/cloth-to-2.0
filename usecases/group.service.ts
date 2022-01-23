import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { GroupAccountEntity } from 'domains/entities/groupAccountEntity';
import { getDbErrorMessage } from 'common/utils/getDbErrorMessage';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  //グループ登録
  async createGroup(createGroupParam: Prisma.GroupAccountCreateInput): Promise<void> {
    try {
      await this.prisma.groupAccount.create({
        data: createGroupParam,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //グループ全検索
  async selectAllGroup(): Promise<GroupAccountEntity[] | null> {
    try {
      return await this.prisma.groupAccount.findMany({
        select: { groupId: true, groupName: true },
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //検索条件に合致するグループ１件(グループパスワード)を取得
  async selectGroup(
    selectGroupParam: Prisma.GroupAccountWhereUniqueInput
  ): Promise<{ groupPass: string } | null> {
    try {
      return await this.prisma.groupAccount.findUnique({
        where: selectGroupParam,
        select: { groupPass: true },
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }
}
