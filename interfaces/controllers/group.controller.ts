import {
  Controller,
  Post,
  Body,
  UseFilters,
  HttpStatus,
  Get,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { InternalServerErrorExceptionFilter } from '../../common/exceptionFilters/internalServerException.filter';
import { BadRequestExceptionFilter } from '../../common/exceptionFilters/BadRequestException.filter';
import { LoggingInterceptor } from '../../common/Interceptors/logging.interceptor';
import { GroupService } from '../../usecases/group.service';
import { CreateGroupDTO } from '../../domains/dto/group/createGroup.dto';
import { createHashPass } from '../../common/utils/createHashPass';
import type { GroupInfo } from '../../constants/types/groupInfo';

@Controller('group')
@UseFilters(InternalServerErrorExceptionFilter, BadRequestExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  //グループ登録処理
  @Post('createGroup')
  async createGroup(@Body() groupData: CreateGroupDTO) {
    //パスワードをハッシュ化
    const hashedPass: string = await createHashPass(groupData.groupPass);

    //グループアカウントDTOのデータを加工
    groupData.groupPass = hashedPass;

    await this.groupService.createGroup(groupData).catch((error) => {
      throw error;
    });

    return { statusCode: HttpStatus.CREATED };
  }

  //全グループ情報取得処理
  @Get('getAllGroupInfo')
  async getAllGroupInfo(@Res() res: Response) {
    const allGroupInfo: GroupInfo[] | null = await this.groupService
      .selectAllGroup()
      .catch((error) => {
        throw error;
      });

    //データ返却
    res.status(HttpStatus.OK).json({ allGroupInfo: allGroupInfo });
    return { statusCode: HttpStatus.OK, allGroupInfo: allGroupInfo };
  }
}
