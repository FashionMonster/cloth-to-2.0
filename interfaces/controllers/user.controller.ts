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
import { InternalServerErrorExceptionFilter } from 'common/exceptionFilters/internalServerException.filter';
import { BadRequestExceptionFilter } from 'common/exceptionFilters/badRequestException.filter';
import { LoggingInterceptor } from 'common/Interceptors/logging.interceptor';
import { UserService } from 'usecases/user.service';
import { GroupService } from 'usecases/group.service';
import { UserAccountEntity } from 'domains/entities/userAccountEntity';
import { SignupReqDto } from 'interfaces/requestDto/user/signupReq.dto';
import { GetUserInfoReqDto } from 'interfaces/requestDto/user/getUserInfoReq.dto';
import { UpdateUserInfoReqDto } from 'interfaces/requestDto/user/updateUserInfoReq.dto';
import { LinkUserToGroupReqDto } from 'interfaces/requestDto/user/linkUserToGroupReq.dto';
import { CancelSignupReqDto } from 'interfaces/requestDto/user/cancelSignupReq.dto';
import { isVerifyPass } from 'common/utils/backend/isVerifyPass';
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
  async signup(@Body() signupReqData: SignupReqDto) {
    await this.userService.createUser(signupReqData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.CREATED };
  }

  //ユーザー情報取得処理
  @Get('getUserInfo')
  async getUserInfo(@Query() getUserInfoReqData: GetUserInfoReqDto, @Res() res: Response) {
    const userInfo: UserAccountEntity | null = await this.userService
      .selectUser({ userId: getUserInfoReqData.userId })
      .catch((error) => {
        throw error;
      });

    //データ返却
    res.status(HttpStatus.OK).json({ userInfo: userInfo });

    return { statusCode: HttpStatus.OK, userInfo: userInfo };
  }

  //ユーザー更新処理
  @Put('updateUserInfo')
  async updateUserInfo(@Body() updateUserInfoReqData: UpdateUserInfoReqDto) {
    //ユーザー情報を更新
    await this.userService.updateUser(updateUserInfoReqData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.OK };
  }

  //ユーザー登録取消し処理
  @Delete('delete')
  async cancelSignup(@Body() cancelSignupReqData: CancelSignupReqDto) {
    await this.userService.deleteUser(cancelSignupReqData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.OK };
  }

  //ユーザー＆グループ紐付け処理
  @Put('linkUserToGroup')
  async linkUserToGroup(@Body() linkUserToGroupReqData: LinkUserToGroupReqDto) {
    //選択したグループのパスワードを取得
    const groupAccount: { groupPass: string } | null = await this.groupService
      .selectGroup({ groupId: linkUserToGroupReqData.groupId })
      .catch((error) => {
        throw error;
      });

    //パスワードの照合
    const isCorrectPass: boolean = await isVerifyPass(
      linkUserToGroupReqData.groupPass,
      groupAccount!.groupPass
    ).catch((error: any) => {
      throw new InternalServerErrorException({
        code: 'UNEXPECTED',
        message: RESULT_MSG.ERR.OTHER,
      });
    });

    //パスワードが不正の場合
    if (!isCorrectPass) {
      throw new InternalServerErrorException({
        code: 'WRONG_PASSWORD',
        message: RESULT_MSG.ERR.WRONG_PASSWORD,
      });
    }

    //ユーザーテーブルにグループ情報を追加して更新
    await this.userService.linkUserToGroup(linkUserToGroupReqData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.OK };
  }
}
