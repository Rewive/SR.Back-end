import { Controller, Get, Param, Post } from '@nestjs/common';
import { SocialRatingService } from './social-rating.service';
import { ApiTags } from '@nestjs/swagger';
import { GetVkUserId } from '@/user/decorator';

@Controller('social-rating')
@ApiTags('Social Rating')
export class SocialRatingController {
    constructor(
        private readonly socialRatingService: SocialRatingService,) {
    }

    @Get(':targetUserId')
    getSocialRating(
        @Param('targetUserId') targetUserId: string
    ) {
        return this.socialRatingService.getSocialRatingByUserId(targetUserId);
    }

    @Post(':targetUserId/like')
    like(
        @GetVkUserId() userId: string,
        @Param('targetUserId') targetUserId: string,
    ) {
        return this.socialRatingService.like(userId, targetUserId);
    }

    @Post(':targetUserId/hate')
    hate(
        @GetVkUserId() userId: string,
        @Param('targetUserId') targetUserId: string,
    ) {
        return this.socialRatingService.hate(userId, targetUserId);
    }

    @Post(':targetUserId/ignore')
    ignore(
        @GetVkUserId() userId: string,
        @Param('targetUserId') targetUserId: string,
    ) {
        return this.socialRatingService.ignore(userId, targetUserId);
    }
}
