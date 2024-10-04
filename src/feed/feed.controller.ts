import { Controller, Get, UseGuards} from '@nestjs/common';
import { FeedService } from './feed.service';
import { ApiTags } from '@nestjs/swagger';
import { GetVkUserId } from '@/user/decorator';
import { SignatureGuard } from '@/guards';


@Controller('feed')
@ApiTags('Feed')
@UseGuards(SignatureGuard)
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
