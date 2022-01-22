import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, Logger } from '@nestjs/common';
import { Response } from 'express';
import { RESULT_MSG } from '../../constants/resultMsg';

@Catch(BadRequestException) // @Catch() デコレータの適用、BadRequestException をハンドルすることを宣言
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  // ExceptionFilter インターフェースの実装
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    //レスポンスデータ
    //プロパティ：code,message
    const resData = { errorInfo: { code: 'UNEXPECTED', message: RESULT_MSG.ERR.BAD_REQUEST } };

    //エラーログ出力
    this.logger.error(`ステータスコード：${status}`);
    this.logger.error(`エラートレース：${exception.stack}`);
    this.logger.error(`レスポンスデータ：${JSON.stringify(resData, null, 2)}`);

    // レスポンス
    response.status(status).json(resData);
  }
}
