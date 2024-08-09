import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/schemas';
import { Model } from 'mongoose';
import { SignatureStrategy } from '@/strategy';

@Injectable()
export class ReferralSystemService {

    constructor(
        private readonly userService: UserService,
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly signatureStrategy: SignatureStrategy,
    ) {
    }

    addReferral(
        fromVkUserId: string,
        toVkUserId: string
    ) {
        this.userService.changeVotesCount(fromVkUserId, +1);
    }
}
