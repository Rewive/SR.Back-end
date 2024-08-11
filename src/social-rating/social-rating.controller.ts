import { Controller, Get, Param, Post } from '@nestjs/common';
import { SocialRatingService } from './social-rating.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetVkUserId } from '@/user/decorator';

@Controller('social-rating')
@ApiTags('Social Rating')
export class SocialRatingController {
    constructor(
        private readonly socialRatingService: SocialRatingService,) {
    }

    @Get(':targetUserId')
    @ApiOperation({ summary: 'Return social rating object (total, likes, hates, ignores) of the user' })
    getSocialRating(
        @Param('targetUserId') targetUserId: string
    ) {
        return this.socialRatingService.getSocialRatingByUserId(targetUserId);
    }

    @Post(':targetUserId/like')
    @ApiOperation({ summary: 'Increase likes count for target user, return the next user in the feed.' })
    like(
        @GetVkUserId() userId: string,
        @Param('targetUserId') targetUserId: string,
    ) {
        return this.socialRatingService.like(userId, targetUserId);
    }

    @Post(':targetUserId/hate')
    @ApiOperation({ summary: 'Increase hates count for target user, return the next user in the feed.' })
    hate(
        @GetVkUserId() userId: string,
        @Param('targetUserId') targetUserId: string,
    ) {
        return this.socialRatingService.hate(userId, targetUserId);
    }

    @Post(':targetUserId/ignore')
    @ApiOperation({ summary: 'Increase ignores for target user, return the next user in the feed.' })
    ignore(
        @GetVkUserId() userId: string,
        @Param('targetUserId') targetUserId: string,
    ) {
        return this.socialRatingService.ignore(userId, targetUserId);
    }
}
