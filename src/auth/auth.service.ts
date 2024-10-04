import { Injectable } from '@nestjs/common';
import { ReferralSystemService } from '@/referral-system/referral-system.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from '@/dto';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly referralSystemService: ReferralSystemService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
    }

    /**
     * Create new user.
     * If the user already exists - return it.
     *
     * @param userDto
     */
    async createUser(userDto: CreateUserDto): Promise<{
        votes: number;
        social_rating: {
            total: number;
            likes_count: number;
            ignores_count: number;
            hates_count: number;
        };
        uid: string;
    }> {
        let user = await this.userService.getUserById(userDto.id);

        // Create user
        if (!user) {
            user = new this.userModel({
                ...userDto,
                uid: userDto.id,
                social_rating: {
                    total: 0,
                    likes_count: 0,
                    ignores_count: 0,
                    hates_count: 0,
                },
                votes: 0,
                hasWon: false
            });

            await user.save();

            // Check if it's a referral
            this.referralSystemService.addReferral(
                userDto.referrer_id,
                user.uid
            );
        }

        return {
            votes: user.votes,
            social_rating: user.social_rating,
            uid: user.uid,
        };
    }
}
