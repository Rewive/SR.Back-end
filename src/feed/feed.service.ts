import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/schemas';
import { Model } from 'mongoose';

@Injectable()
export class FeedService {
    constructor(
        private readonly userService: UserService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
    }

    async getNextUser(userId: string) {
        const user = await this.userService.getUserById(userId);

        const randomUser = await this.userModel.aggregate([
            {
                $match: {
                    uid: {
                        $nin: [
                            // TODO REMOVE COMMENT
                            // ...user.voted_for, // Skip already rated users
                            user.uid           // Don't show yourself in the feed
                        ]
                    }
                }
            },
            { $sample: { size: 1 } }, // Get random user
        ]).exec();

        return randomUser[0];
    }
}
