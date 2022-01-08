import { Module } from '@nestjs/common';
import { GroupController } from '../../interfaces/controllers/group.controller';
import { GroupService } from '../../usecases/group.service';

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
