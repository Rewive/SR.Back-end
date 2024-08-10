import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/schemas';
import { Model } from 'mongoose';

@Injectable()
export class SocialRatingService {
    constructor(
        private readonly userService: UserService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
    }

    async getSocialRatingByUserId(targetUserId: string) {
        const user = await this.userService.getUserById(targetUserId);

        return user.social_rating;
    }

    async like(userId: string, targetUserId: string) {
        if (userId == targetUserId) {
            throw new ForbiddenException('Самолайк залог успеха, но Вы не можете оценивать сами себя');
        }

        // Decrease user's votes count
        await this.userService.changeVotesCount(userId, -1);

        // Increase target user's likes count
        await this.userModel.updateOne(
            { uid: targetUserId },
            {
                $inc: {
                    'social_rating.total'      : 1,
                    'social_rating.likes_count': 1
                }
            }
        ).exec();

        return 0;
    }

    async hate(userId: string, targetUserId: string) {
        if (userId == targetUserId) {
            throw new ForbiddenException('Не нужно оценивать себя негативно, Вы прекрасны');
        }

        // Decrease user's votes count
        await this.userService.changeVotesCount(userId, -1);

        // Increase target user's hates count
        await this.userModel.updateOne(
            { uid: targetUserId },
            {
                $inc: {
                    'social_rating.total'      : -1,
                    'social_rating.hates_count': 1
                }
            }
        ).exec();

        return 0;
    }

    async ignore(userId: string, targetUserId: string) {
        if (userId == targetUserId) {
            throw new ForbiddenException('Вы не можете игнорировать сами себя');
        }

        // Increase target user's ignores count
        await this.userModel.updateOne(
            { uid: targetUserId },
            {
                $inc: {
                    'social_rating.ignores_count': 1
                }
            }
        ).exec();

        return 0;
    }
}
