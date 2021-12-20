import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import dayjs from 'dayjs';

//ライブラリwinstonを使ってログ出力
@Injectable()
export class CustomLoggerService implements LoggerService {
  logger: Logger;

  constructor() {
    //タイムスタンプを日本に設定
    //フォーマット指定：https://day.js.org/docs/en/display/format
    const timezoned = () => {
      dayjs.locale('ja');
      return dayjs().format('YYYY-MM-DD HH:mm:ss');
    };

    //出力フォーマットの設定
    const myFormat = format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}：${message}`;
    });

    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp({ format: timezoned }), myFormat),
      transports: [
        //出力先とログレベルの設定
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/info.log', level: 'info' }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
