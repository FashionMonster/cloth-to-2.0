import { Module } from '@nestjs/common';
import { UserController } from '../../interfaces/controllers/user.controller';
import { GroupController } from '../../interfaces/controllers/group.controller';
import { UserService } from '../../usecases/user.service';
import { GroupService } from '../../usecases/group.service';
import { PrismaService } from '../../usecases/prisma.service';

const controllerArray = [UserController, GroupController];
const serviceArray = [PrismaService, UserService, GroupService];

@Module({
  imports: [],
  controllers: controllerArray,
  providers: serviceArray,
})
export class AppModule {}
