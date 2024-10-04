import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas';
import { SignatureStrategy } from '@/common';

@Module({
    imports    : [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [LeaderboardController],
    providers  : [
        LeaderboardService, 
        SignatureStrategy,
    ],
})
export class LeaderboardModule {
}
