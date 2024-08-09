import {  Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/schemas';
import { Model } from 'mongoose';
import { rewardsConfig } from '@/config/rewards';

@Injectable()
export class ReferralSystemService {

    constructor(
        private readonly userService: UserService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
    }

    public async addReferral(
        referrerVkUserId: string,
        referralVkUserId: string
    ) {
        try {
            // 0. Check if referrer and referral exist
            if(!referrerVkUserId || !referralVkUserId) {
                throw new Error('Referrer or referral not found');
            }

            // 1. Check if the referral is not a referrer.
            if (referrerVkUserId == referralVkUserId) {
                throw new Error('Referral is a referrer');
            }

            // Get users from db
            const referrer = await this.userService.getUserById(referrerVkUserId);
            const referral = await this.userService.getUserById(referralVkUserId);

            // 2. Add referral to the referrals of the referrer user
            referrer.referrals.push(referral);
            referrer.save();

            // 3. Add referrer to referral
            referral.referrer = referrer;
            referral.save();

            // 4. Add votes to the referrer.
            this.userService.changeVotesCount(
                referrerVkUserId,
                rewardsConfig.increaseVotesForReferral
            );
        } catch (e) {
            console.log(e);
        }
    }
}
