import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { UserAccountEntity } from 'domains/entities/userAccountEntity';
import { UpdateUserInfoReqDto } from 'domains/dto/user/request/updateUserInfoReq.dto';
import { getDbErrorMessage } from 'common/utils/getDbErrorMessage';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //ユーザー登録
  async createUser(createUserParam: Prisma.UserAccountCreateInput): Promise<void> {
    try {
      await this.prisma.userAccount.create({
        data: createUserParam,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //ユーザー検索
  async selectUser(
    selectUserParam: Prisma.UserAccountWhereUniqueInput
  ): Promise<UserAccountEntity | null> {
    try {
      return await this.prisma.userAccount.findUnique({
        where: selectUserParam,
        select: { userId: true, userName: true, groupId: true },
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //ユーザー更新
  async updateUser(updateUserParam: UpdateUserInfoReqDto): Promise<void> {
    try {
      await this.prisma.userAccount.update({
        where: {
          userId: updateUserParam.previousUserId,
        },
        data: {
          userId: updateUserParam.userId,
          userName: updateUserParam.userName,
        },
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //ユーザー削除
  async deleteUser(deleteUserParam: Prisma.UserAccountWhereUniqueInput): Promise<void> {
    try {
      await this.prisma.userAccount.delete({
        where: deleteUserParam,
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }

  //グループ紐付け(グループIDの更新)
  async linkUserToGroup(linkUserToGroupParam: Prisma.UserAccountUpdateInput): Promise<void> {
    try {
      await this.prisma.userAccount.update({
        where: {
          userId: linkUserToGroupParam.userId?.toString(),
        },
        data: {
          groupId: linkUserToGroupParam.groupId,
        },
      });
    } catch (error: any) {
      //エラーコードに合わせたメッセージを取得
      const errorMsg = getDbErrorMessage(error.code);
      throw new InternalServerErrorException({ code: error.code, message: errorMsg });
    }
  }
}
