import { Module } from '@nestjs/common';
import { UserController } from '../../interfaces/controllers/user.controller';
import { UserService } from '../../usecases/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
