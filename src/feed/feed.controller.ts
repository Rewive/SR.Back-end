import { Controller, Get } from '@nestjs/common';
import { FeedService } from './feed.service';
import { ApiTags } from '@nestjs/swagger';
import { GetVkUserId } from '@/user/decorator';

@Controller('feed')
@ApiTags('Feed')
export class FeedController {
    constructor(
        private readonly feedService: FeedService,
    ) {
    }

    @Get('next')
    getNextUser(
        @GetVkUserId() userId: string
    ) {
        return this.feedService.getNextUser(userId);
    }
}
