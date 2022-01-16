import { ContributionInfo } from '.prisma/client';
import {
  Controller,
  UseFilters,
  HttpStatus,
  Get,
  Res,
  UseInterceptors,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { InternalServerErrorExceptionFilter } from '../../common/exceptionFilters/internalServerException.filter';
import { BadRequestExceptionFilter } from '../../common/exceptionFilters/BadRequestException.filter';
import { LoggingInterceptor } from '../../common/Interceptors/logging.interceptor';
import { ContributionService } from '../../usecases/contribution.service';
import { SearchContributionInfosDTO } from '../../domains/dto/searchContributionInfos.dto';

@Controller('contribution')
@UseFilters(InternalServerErrorExceptionFilter, BadRequestExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class ContributionController {
  constructor(private readonly contriobutionService: ContributionService) {}

  //ユーザー情報取得処理
  @Get('search')
  async search(@Query() requestData: SearchContributionInfosDTO, @Res() res: Response) {
    const contributionInfos: ContributionInfo[] | null = await this.contriobutionService
      .selectContributionInfos(requestData)
      .catch((error) => {
        throw error;
      });

    //HTTPレスポンス
    res.status(HttpStatus.OK).json({ contributionInfos: contributionInfos });
    return { statusCode: HttpStatus.OK, contributionInfos: contributionInfos };
  }
}
