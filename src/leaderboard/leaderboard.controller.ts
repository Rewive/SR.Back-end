import { Controller, Get } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { User } from '@/schemas';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('leaderboard')
@ApiTags('Leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) {
    }

    @Get('top-10')
    @ApiOperation({ summary: 'Return 10 users sorted by total rating' })
    async getTop10(): Promise<User[]> {
        return await this.leaderboardService.getTop(10);
    }

    @Get('top-100')
    @ApiOperation({ summary: 'Return 100 users sorted by total rating' })
    async getTop100(): Promise<User[]> {
        return await this.leaderboardService.getTop(100);
    }

}
