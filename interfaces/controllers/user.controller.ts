import { UserAccount } from '.prisma/client';
import { Controller, Post, Delete, Body, UseFilters, HttpStatus, Get, Query } from '@nestjs/common';
import { InternalServerErrorExceptionFilter } from '../../common/exceptionFilters/internalServerException.filter';
import { BadRequestExceptionFilter } from '../../common/exceptionFilters/BadRequestException.filter';
import { UserService } from '../../usecases/user.service';
import { CreateUserAccountDTO } from '../../domains/dto/createUserAccount.dto';
import { SelectOrDeleteUserAccountDTO } from '../../domains/dto/selectOrDeleteUserAccount.dto';

@Controller('user')
@UseFilters(InternalServerErrorExceptionFilter, BadRequestExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //ユーザー登録処理
  @Post('signup')
  async signupUser(@Body() userData: CreateUserAccountDTO) {
    await this.userService.createUser(userData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.CREATED };
  }

  //TODO:DTOによるバリデーション
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
  async cancelSignupUser(@Body() userData: SelectOrDeleteUserAccountDTO) {
    await this.userService.deleteUser(userData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.OK };
  }
}
