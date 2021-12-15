import { UserAccount } from '.prisma/client';
import { Controller, Post, Delete, Body, UseFilters, HttpStatus, Get, Query } from '@nestjs/common';
import { InternalServerErrorExceptionFilter } from '../../common/exceptionFilters/internalServerException.filter';
import { UserService } from '../../usecases/user.service';

@Controller('user')
@UseFilters(InternalServerErrorExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //ユーザー登録処理
  @Post('signup')
  async signupUser(@Body() userData: { userId: string; userName: string }) {
    await this.userService.createUser(userData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.CREATED };
  }

  //ユーザー情報取得処理
  @Get('getUserInfo')
  async getUserInfo(@Query('userId') userId: string) {
    const userInfo: UserAccount | null = await this.userService
      .selectUser({ userId: userId })
      .catch((error) => {
        throw error;
      });

    return { statusCode: HttpStatus.OK, userInfo: userInfo };
  }

  //ユーザー登録取消し処理
  @Delete('delete')
  async cancelSignupUser(@Body() userData: { userId: string }) {
    await this.userService.deleteUser(userData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.OK };
  }
}
