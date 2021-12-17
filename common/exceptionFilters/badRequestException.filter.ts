import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { RESULT_MSG } from '../../constants/resultMsg';

@Catch(BadRequestException) // @Catch() デコレータの適用、InternalServerErrorException をハンドルすることを宣言
export class BadRequestExceptionFilter implements ExceptionFilter {
  // ExceptionFilter インターフェースの実装
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    // const message = exception.message;

    // レスポンスを加工
    response.status(status).json({
      statusCode: status,
      errorMessage: RESULT_MSG.ERR.BAD_REQUEST,
    });
  }
}
