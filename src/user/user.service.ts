import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/schemas';
import { SignatureStrategy } from '@/strategy';
import { CreateUserDto } from '@/dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly signatureStrategy: SignatureStrategy
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
        const user = await this.userModel.findOne({
            uid: userId
        }).exec();

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
        social_rating: number;
        uid: string
    }> {
        let user = await this.getUserById(userDto.id);

        // Create user
        if (!user) {
            user = new this.userModel({
                ...userDto,
                uid: userDto.id,
                votes: 0,
                social_rating: 0,
                likes_count: 0,
                dislikes_count: 0,
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
}
