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
    let groupPass: string | undefined;
    if (request.body !== null && request.body.hasOwnProperty('groupPass')) {
      groupPass = (request.body as unknown as { groupPass: string }).groupPass;
      //ログにパスワードが表示されないように変更
      (request.body as unknown as { groupPass: string }).groupPass = '********';
    }

    //リクエスト時のログ出力
    this.logger.log(`リクエストURL：${request.url}`);
    this.logger.log(`リクエストボディ：${JSON.stringify(request.body, null, 2)}`);

    if (request.body !== null && request.body.hasOwnProperty('groupPass')) {
      //変更した値を元に戻す
      (request.body as unknown as { groupPass: string }).groupPass = groupPass as string;
    }

    //レスポンス時のログ出力
    return next
      .handle()
      .pipe(map((data) => this.logger.log(`レスポンスデータ：${JSON.stringify(data, null, 2)}`)));
  }
}
