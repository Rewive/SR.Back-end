// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from '@/schemas';
import { SignatureStrategy } from '@/strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        UserService,
        SignatureStrategy
    ],
    exports: [UserService]
})
export class UserModule {
}
