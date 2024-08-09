import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/schemas';
import { SignatureStrategy } from '@/strategy';
import { CreateUserDto } from '@/dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly signatureStrategy: SignatureStrategy,
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
        const user = await this.userModel
            .findOne({
                uid: userId,
            })
            .exec();

        console.log(userId);

        if(!user) {
            throw new NotFoundException('Such user not found');
        }

        return user;
    }

    /**
     * Create new user.
     * If the user already exists - return it.
     *
     * @param userDto
     */
    async createUser(userDto: CreateUserDto): Promise<{
        status: number;
        votes: number;
        social_rating: {
            social_credits: number;
            likes_count: number;
            ignores_count: number;
            hates_count: number;
        };
        uid: string;
    }> {
        let user = await this.getUserById(userDto.id);

        // Create user
        if (!user) {
            user = new this.userModel({
                ...userDto,
                uid: userDto.id,
                social_rating: {
                    social_credits: 0,
                    likes_count: 0,
                    ignores_count: 0,
                    hates_count: 0,
                },
                votes: 0,
            });

            await user.save();
        }

        return {
            status: 201,
            votes: user.votes,
            social_rating: user.social_rating,
            uid: user.uid,
        };
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

        // Check if the user have enough votes
        if(user.votes < 0) {
            throw new ForbiddenException('You have not enough votes');
        }

        return user.save();
    }
}
