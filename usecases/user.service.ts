import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, UserAccount } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { getDbErrorMessage } from '../common/utils/getDbErrorMessage';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //ユーザー登録
  async createUser(data: Prisma.UserAccountCreateInput): Promise<void> {
    try {
      await this.prisma.userAccount.create({
        data,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMessage = getDbErrorMessage(error.code);
      throw new InternalServerErrorException(errorMessage);
    }
  }

  //ユーザー検索
  async selectUser(userId: Prisma.UserAccountWhereUniqueInput): Promise<UserAccount | null> {
    try {
      return await this.prisma.userAccount.findUnique({
        where: userId,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMessage = getDbErrorMessage(error.code);
      throw new InternalServerErrorException(errorMessage);
    }
  }

  //ユーザー削除
  async deleteUser(userId: Prisma.UserAccountWhereUniqueInput): Promise<void> {
    try {
      await this.prisma.userAccount.delete({
        where: userId,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMessage = getDbErrorMessage(error.code);
      throw new InternalServerErrorException(errorMessage);
    }
  }
}
