import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { HttpModule } from '@nestjs/axios';
import { User, UserSchema } from './schemas';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { APP_GUARD } from '@nestjs/core';
import { SocialRatingModule } from './social-rating/social-rating.module';
import { UserModule } from '@/user/user.module';
import { ReferralSystemModule } from '@/referral-system/referral-system.module';
import { AuthModule } from '@/auth/auth.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { FeedModule } from './feed/feed.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        ThrottlerModule.forRoot([{
            ttl: Number(process.env.TTL),
            limit: Number(process.env.LIMIT),
        }]),
        HttpModule,
        // -----------
        UserModule,
        SocialRatingModule,
        ReferralSystemModule,
        AuthModule,
        LeaderboardModule,
        FeedModule,
    ],
    controllers: [
        AppController
    ],
    providers: [
        {provide: APP_GUARD, useClass: ThrottlerGuard},
        AppService,
    ],
})
export class AppModule {
}
