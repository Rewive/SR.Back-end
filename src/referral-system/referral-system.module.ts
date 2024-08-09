import { Module } from '@nestjs/common';
import { ReferralSystemService } from './referral-system.service';
import { ReferralSystemController } from './referral-system.controller';
import { UserModule } from '@/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas';
import { SignatureStrategy } from '@/strategy';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        UserModule
    ],
    controllers: [ReferralSystemController],
    providers: [
        ReferralSystemService,
        SignatureStrategy
    ],
})
export class ReferralSystemModule {
}
