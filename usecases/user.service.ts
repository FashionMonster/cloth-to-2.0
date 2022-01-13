import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, UserAccount } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { UpdateUserAccountDTO } from '../domains/dto/updateUserAccount.dto';
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
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //グループ紐付け(グループIDの更新)
  async linkUserToGroup(data: Prisma.UserAccountUpdateInput): Promise<void> {
    try {
      await this.prisma.userAccount.update({
        where: {
          userId: data.userId?.toString(),
        },
        data: {
          groupId: data.groupId,
        },
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //ユーザー更新
  async updateUser(data: UpdateUserAccountDTO): Promise<void> {
    try {
      await this.prisma.userAccount.update({
        where: {
          userId: data.previousUserId,
        },
        data: {
          userId: data.userId,
          userName: data.userName,
        },
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
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
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
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
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }
}
