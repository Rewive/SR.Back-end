import { Controller, Get, Param, Post } from '@nestjs/common';
import { SocialRatingService } from './social-rating.service';

@Controller('social-rating')
export class SocialRatingController {
    constructor(private readonly socialRatingService: SocialRatingService) {
    }

    @Get(':userId')
    getSocialRating(
        @Param('userId') userId: string
    ) {
        return this.socialRatingService.getSocialRatingByUserId(userId);
    }

    @Post(':userId/like')
    like(
        @Param('userId') userId: string
    ) {
        return this.socialRatingService.likeByUserId(userId);
    }

    @Post(':userId/dislike')
    dislike(
        @Param('userId') userId: string
    ) {
        return this.socialRatingService.dislikeByUserId(userId);
    }
}
