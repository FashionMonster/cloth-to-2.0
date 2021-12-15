import { Module } from '@nestjs/common';
import { UserController } from '../../interfaces/controllers/user.controller';
import { PostController } from '../../interfaces/controllers/post.controller';
import { UserService } from '../../usecases/user.service';
import { PostService } from '../../usecases/post.service';
import { PrismaService } from '../../usecases/prisma.service';

const CONTROLLER_ARRAY = [UserController, PostController];
const SERVICE_ARRAY = [PrismaService, UserService, PostService];

@Module({
  imports: [],
  controllers: CONTROLLER_ARRAY,
  providers: SERVICE_ARRAY,
})
export class AppModule {}
