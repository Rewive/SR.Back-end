import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas';
import { UserModule } from '@/user/user.module';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    controllers: [FeedController],
    providers  : [FeedService],
    exports: [FeedService],
})
export class FeedModule {
}
