import { Module } from '@nestjs/common';
import { ContributionController } from '../../interfaces/controllers/contribution.controller';
import { ContributionService } from '../../usecases/contribution.service';
import { ContributionImageService } from '../../usecases/contributionImage.service';

@Module({
  imports: [],
  controllers: [ContributionController],
  providers: [ContributionService, ContributionImageService],
})
export class UserModule {}
