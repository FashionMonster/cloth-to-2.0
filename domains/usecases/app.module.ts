import { Module } from '@nestjs/common';
import { UserController } from '../../interfaces/controllers/user.controller';
import { UserService } from '../../usecases/user.service';
import { PrismaService } from '../../usecases/prisma.service';

const CONTROLLER_ARRAY = [UserController];
const SERVICE_ARRAY = [PrismaService, UserService];

@Module({
  imports: [],
  controllers: CONTROLLER_ARRAY,
  providers: SERVICE_ARRAY,
})
export class AppModule {}
