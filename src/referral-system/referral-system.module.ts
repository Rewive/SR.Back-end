import { Module } from '@nestjs/common';
import { ReferralSystemService } from './referral-system.service';
import { ReferralSystemController } from './referral-system.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas';
import { SignatureStrategy } from '@/strategy';
import { UserModule } from '@/user/user.module';

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
    exports: [ReferralSystemService]
})
export class ReferralSystemModule {
}
