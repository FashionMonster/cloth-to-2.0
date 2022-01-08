import { UserAccount } from '.prisma/client';
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
} from '@nestjs/common';
import { Response } from 'express';
import { InternalServerErrorExceptionFilter } from '../../common/exceptionFilters/internalServerException.filter';
import { BadRequestExceptionFilter } from '../../common/exceptionFilters/BadRequestException.filter';
import { LoggingInterceptor } from '../../common/Interceptors/logging.interceptor';
import { UserService } from '../../usecases/user.service';
import { CreateUserAccountDTO } from '../../domains/dto/createUserAccount.dto';
import { UpdateUserAccountDTO } from '../../domains/dto/updateUserAccount.dto';
import { SelectOrDeleteUserAccountDTO } from '../../domains/dto/selectOrDeleteUserAccount.dto';

@Controller('user')
@UseFilters(InternalServerErrorExceptionFilter, BadRequestExceptionFilter)
@UseInterceptors(LoggingInterceptor)
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

  //ユーザー＆グループ紐付け処理
  @Put('linkUserToGroup')
  async linkUserToGroup(@Body() userData: UpdateUserAccountDTO) {
    await this.userService.updateUser(userData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.CREATED };
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
