import { Module } from '@nestjs/common';
import { CustomLoggerService } from '../../usecases/customLogger.service';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
