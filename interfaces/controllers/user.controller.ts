import { UserAccount, GroupAccount } from '.prisma/client';
import {
  Controller,
  Post,
  Delete,
  Body,
  UseFilters,
  HttpStatus,
  Get,
  Res,
  Query,
  UseInterceptors,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { InternalServerErrorExceptionFilter } from '../../common/exceptionFilters/internalServerException.filter';
import { BadRequestExceptionFilter } from '../../common/exceptionFilters/BadRequestException.filter';
import { LoggingInterceptor } from '../../common/Interceptors/logging.interceptor';
import { UserService } from '../../usecases/user.service';
import { GroupService } from '../../usecases/group.service';
import { CreateUserAccountDTO } from '../../domains/dto/createUserAccount.dto';
import { UpdateUserAccountDTO } from '../../domains/dto/updateUserAccount.dto';
import { LinkUserToGroupDTO } from '../../domains/dto/linkUserToGroup.dto';
import { SelectOrDeleteUserAccountDTO } from '../../domains/dto/selectOrDeleteUserAccount.dto';
import { isVerifyPass } from 'common/utils/isVerifyPass';
import { RESULT_MSG } from 'constants/resultMsg';

@Controller('user')
@UseFilters(InternalServerErrorExceptionFilter, BadRequestExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupService
  ) {}

  //ユーザー登録処理
  @Post('signup')
  async signupUser(@Body() userData: CreateUserAccountDTO) {
    await this.userService.createUser(userData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.CREATED };
  }

  //ユーザー＆グループ紐付け処理
  @Put('linkUserToGroup')
  async linkUserToGroup(@Body() linkUserToGroupData: LinkUserToGroupDTO) {
    //選択したグループのパスワードを取得
    const groupAccount: GroupAccount | null = await this.groupService
      .selectGroup({ groupId: linkUserToGroupData.groupId })
      .catch((error) => {
        throw error;
      });

    //パスワードの照合
    const isCorrectPass: boolean = await isVerifyPass(
      linkUserToGroupData.groupPass,
      groupAccount!.groupPass
    ).catch((error) => {
      throw error;
    });

    //パスワードが不正の場合
    if (!isCorrectPass) {
      throw new InternalServerErrorException({
        code: 'WRONG_PASSWORD',
        message: RESULT_MSG.ERR.WRONG_PASSWORD,
      });
    }

    //ユーザーテーブルにグループ情報を追加して更新
    await this.userService.linkUserToGroup(linkUserToGroupData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.OK };
  }

  //ユーザー更新処理
  @Put('updateUserInfo')
  async updateUserInfo(@Body() userData: UpdateUserAccountDTO) {
    //ユーザー情報を更新
    await this.userService.updateUser(userData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.OK };
  }

  //TODO:DTOによるバリデーション
  //ユーザー情報取得処理
  @Get('getUserInfo')
  async getUserInfo(@Query('userId') userId: string, @Res() res: Response) {
    const userInfo: UserAccount | null = await this.userService
      .selectUser({ userId: userId })
      .catch((error) => {
        throw error;
      });

    //HTTPレスポンス
    res.status(HttpStatus.OK).json({ userInfo: userInfo });
    return { statusCode: HttpStatus.OK, userInfo: userInfo };
  }

  //ユーザー登録取消し処理
  @Delete('delete')
  async cancelSignupUser(@Body() userData: SelectOrDeleteUserAccountDTO) {
    await this.userService.deleteUser(userData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.OK };
  }
}
