import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//ログ出力AOP
//rxjsについて：https://www.codegrid.net/articles/2017-rxjs-1/
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    //リクエストデータにパスワードが存在する場合
    if (request.body !== null && request.body.hasOwnProperty('groupPass')) {
      request.body.groupPass = '****';
    }

    //リクエスト時のログ出力
    this.logger.log(`リクエストURL：${request.url}`);
    this.logger.log(`リクエストボディ：${JSON.stringify(request.body, null, 2)}`);

    //レスポンス時のログ出力
    return next
      .handle()
      .pipe(map((data) => this.logger.log(`レスポンスデータ：${JSON.stringify(data, null, 2)}`)));
  }
}
