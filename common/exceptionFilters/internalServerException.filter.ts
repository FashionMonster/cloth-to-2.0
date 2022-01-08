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

    //エラーログ出力
    this.logger.error(`ステータスコード：${status}`);
    this.logger.error(`エラートレース：${exception.stack}`);

    //レスポンス
    response.status(status).json({
      //プロパティ：code,message
      errorInfo: exception.getResponse(),
    });
  }
}
