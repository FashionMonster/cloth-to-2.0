import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, GroupAccount } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { getDbErrorMessage } from '../common/utils/getDbErrorMessage';
import { GroupInfo } from 'constants/types/groupInfo';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  //グループ登録
  async createGroup(data: Prisma.GroupAccountCreateInput): Promise<void> {
    try {
      await this.prisma.groupAccount.create({
        data,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //グループ全検索
  async selectAllGroup(): Promise<GroupInfo[] | null> {
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

  //検索条件に合致するグループ１件を取得
  async selectGroup(groupId: Prisma.GroupAccountWhereUniqueInput): Promise<GroupAccount | null> {
    try {
      return await this.prisma.groupAccount.findUnique({
        where: groupId,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }
}
