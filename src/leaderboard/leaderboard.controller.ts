import { Controller, Get, UseGuards } from '@nestjs/common';
import { LeaderboardService, SimplifiedUser } from './leaderboard.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignatureGuard } from '@/guards';

@Controller('leaderboard')
@ApiTags('Leaderboard')
@UseGuards(SignatureGuard)
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) {}

    @Get('hall-of-fare')
    @ApiOperation({ summary: 'Return users with hasWon: true sorted by total rating' })
    async getGlory(): Promise<SimplifiedUser[]> {
        return await this.leaderboardService.getGlory();
    }

    @Get('top-100')
    @ApiOperation({ summary: 'Return top 100 users sorted by total rating' })
    async getTop100(): Promise<SimplifiedUser[]> {
        return await this.leaderboardService.getTop(100);
    }
}
