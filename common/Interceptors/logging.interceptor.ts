import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

//ログ出力AOP
//rxjsについて：https://www.codegrid.net/articles/2017-rxjs-1/
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    //リクエスト時のログ出力
    this.logger.log(`リクエストURL：${request.url}`);
    this.logger.log(`リクエストボディ：${JSON.stringify(request.body, null, 2)}`);

    //レスポンス時のログ出力
    return next
      .handle()
      .pipe(tap(() => this.logger.log(`レスポンスステータス：${response.status}`)));
  }
}
