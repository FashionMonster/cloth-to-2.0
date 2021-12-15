import { Module } from '@nestjs/common';
import { PostController } from '../../interfaces/controllers/post.controller';
import { PostService } from '../../usecases/post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
