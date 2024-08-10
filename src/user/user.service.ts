import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/schemas';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
    }

    /**
     * Return the array of all users.
     */
    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();

        return users;
    }

    /**
     * Return user from db by uid
     * @param userId
     */
    async getUserById(userId: string): Promise<User> {
        return await this.userModel.findOne({uid: userId}).exec();
    }

    /**
     * Update user's votes count
     * @param vkUserId - user id to change votes
     * @param count - difference of votes (can be negative number)
     */
    async changeVotesCount(
        vkUserId: string,
        count: number
    ): Promise<User> {
        const user = await this.getUserById(vkUserId);

        // Change user votes count
        user.votes += count;

        // Check if the user has enough votes
        if (user.votes < 0) {
            throw new ForbiddenException('У вас недостаточно голосов. Приглашайте друзей, чтобы получить больше');
        }

        return user.save();
    }

    async getUserReferrals(
        vkUserId: string
    ) {
        const user = await this.getUserById(vkUserId);
        return user.referrals;
    }
}
