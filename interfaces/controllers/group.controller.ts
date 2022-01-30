import {
  Controller,
  Post,
  Body,
  UseFilters,
  HttpStatus,
  Get,
  Res,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { InternalServerErrorExceptionFilter } from 'common/exceptionFilters/internalServerException.filter';
import { BadRequestExceptionFilter } from 'common/exceptionFilters/BadRequestException.filter';
import { LoggingInterceptor } from 'common/Interceptors/logging.interceptor';
import { GroupService } from 'usecases/group.service';
import { GroupAccountEntity } from 'domains/entities/groupAccountEntity';
import { CreateGroupReqDto } from 'domains/dto/group/request/createGroupReq.dto';
import { createHashPass } from 'common/utils/backend/createHashPass';

@Controller('group')
@UseFilters(InternalServerErrorExceptionFilter, BadRequestExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  //グループ登録処理
  @Post('createGroup')
  async createGroup(@Body() createGroupReqData: CreateGroupReqDto) {
    //パスワードをハッシュ化
    const hashedPass: string = await createHashPass(createGroupReqData.groupPass).catch(
      (error: any) => {
        throw new InternalServerErrorException({
          code: 'UNEXPECTED',
          message: error,
        });
      }
    );

    createGroupReqData.groupPass = hashedPass;

    await this.groupService.createGroup(createGroupReqData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.CREATED };
  }

  //全グループ情報取得処理
  @Get('getAllGroupInfo')
  async getAllGroupInfo(@Res() res: Response) {
    const allGroupInfo: GroupAccountEntity[] | null = await this.groupService
      .selectAllGroup()
      .catch((error) => {
        throw error;
      });

    //データ返却
    res.status(HttpStatus.OK).json({ allGroupInfo: allGroupInfo });

    return { statusCode: HttpStatus.OK, allGroupInfo: allGroupInfo };
  }
}
