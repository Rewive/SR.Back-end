import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/user/user.module';
import { ReferralSystemModule } from '@/referral-system/referral-system.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas';
import { SignatureStrategy } from '@/common';

@Module({
    imports    : [
        UserModule,
        ReferralSystemModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [AuthController],
    providers  : [
        AuthService,
        SignatureStrategy
    ],
})
export class AuthModule {
}
