import { Module } from '@nestjs/common';
import { SocialRatingService } from './social-rating.service';
import { SocialRatingController } from './social-rating.controller';
import { UserModule } from '@/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas';
import { FeedModule } from '@/feed/feed.module';

@Module({
    imports: [
        UserModule,
        FeedModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    controllers: [SocialRatingController],
    providers: [SocialRatingService],
})
export class SocialRatingModule {
}
