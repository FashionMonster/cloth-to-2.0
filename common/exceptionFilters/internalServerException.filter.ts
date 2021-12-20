import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException) // @Catch() デコレータの適用、InternalServerErrorException をハンドルすることを宣言
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  // ExceptionFilter インターフェースの実装
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    //エラーログ出力
    this.logger.error(`エラーステータス：${exception.getStatus()}`);
    this.logger.error(`エラートレース：${exception.stack}`);

    // レスポンスを加工
    response.status(status).json({
      statusCode: status,
      errorMessage: message,
    });
  }
}
