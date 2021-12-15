import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException) // @Catch() デコレータの適用、InternalServerErrorException をハンドルすることを宣言
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  // ExceptionFilter インターフェースの実装
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    // レスポンスを加工
    response.status(status).json({
      statusCode: status,
      errorMessage: message,
    });
  }
}
