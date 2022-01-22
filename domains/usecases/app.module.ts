import { Module } from '@nestjs/common';
import { UserController } from '../../interfaces/controllers/user.controller';
import { GroupController } from '../../interfaces/controllers/group.controller';
import { ContributionController } from '../../interfaces/controllers/contribution.controller';
import { UserService } from '../../usecases/user.service';
import { GroupService } from '../../usecases/group.service';
import { ContributionService } from '../../usecases/contribution.service';
import { ContributionImageService } from '../../usecases/contributionImage.service';
import { PrismaService } from '../../usecases/prisma.service';

const controllerArray = [UserController, GroupController, ContributionController];
const serviceArray = [
  PrismaService,
  UserService,
  GroupService,
  ContributionService,
  ContributionImageService,
];

@Module({
  imports: [],
  controllers: controllerArray,
  providers: serviceArray,
})
export class AppModule {}
