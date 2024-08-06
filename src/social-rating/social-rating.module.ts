import { Module } from '@nestjs/common';
import { SocialRatingService } from './social-rating.service';
import { SocialRatingController } from './social-rating.controller';

@Module({
  controllers: [SocialRatingController],
  providers: [SocialRatingService],
})
export class SocialRatingModule {}
