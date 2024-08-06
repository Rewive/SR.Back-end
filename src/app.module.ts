import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { HttpModule } from '@nestjs/axios';
import { User, UserSchema } from './schemas';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { SignatureStrategy } from './strategy';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ThrottlerModule.forRoot([{
            ttl: Number(process.env.TTL),
            limit: Number(process.env.LIMIT),
        }]),
        HttpModule,
    ],
    controllers: [AppController, UserController], 
    providers: [{ provide : APP_GUARD , useClass : ThrottlerGuard }, AppService, UserService, SignatureStrategy],
})
export class AppModule {}
