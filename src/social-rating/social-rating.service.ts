import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/schemas';
import { Model } from 'mongoose';
import { FeedService } from '@/feed/feed.service';

@Injectable()
export class SocialRatingService {
    constructor(
        private readonly userService: UserService,
        private readonly feedService: FeedService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
    }

    async getSocialRatingByUserId(targetUserId: string) {
        const user = await this.userService.getUserById(targetUserId);

        return user.social_rating;
    }

    /**
     * Return true if user has already voted for targetUser.
     *
     * @param userId
     * @param targetUserId
     * @private
     */
    private async isVotedForUser(userId: string, targetUserId: string) {
        const user = await this.userModel.findOne({
            uid: userId,
            voted_for: { $in: [targetUserId] }
        }).exec();

        return !!user;
    }

    /**
     * Add targetUser to voted_for list.
     * Then this targetUser won't be shown in the feed.
     *
     * @param userId
     * @param targetUserId
     * @private
     */
    private async hasVotedFor(userId: string, targetUserId: string) {
        await this.userModel.updateOne(
            {uid: userId},
            {$push: {voted_for: targetUserId}}
        ).exec();
    }

    async like(userId: string, targetUserId: string) {
        // Can't rate yourself.
        if (userId == targetUserId) {
            throw new ForbiddenException('Самолайк залог успеха, но Вы не можете оценивать сами себя');
        }

        // TODO REMOVE COMMENT
        // Can't rate target user twice.
        // if(await this.isVotedForUser(userId, targetUserId)) {
        //     throw new ForbiddenException('Вы уже оценивали этого пользователя');
        // }

        // Decrease user's votes count (throw error if not enough votes)
        await this.userService.changeVotesCount(userId, -1);

        // Increase target user's likes count.
        await this.userModel.updateOne(
            { uid: targetUserId },
            {
                $inc: {
                    'social_rating.total'      : 1,
                    'social_rating.likes_count': 1
                }
            }
        ).exec();

        // Mark that user has voted for this target user.
        await this.hasVotedFor(userId, targetUserId);

        // Return the next user in the feed.
        return this.feedService.getNextUser(userId);
    }

    async hate(userId: string, targetUserId: string) {
        if (userId == targetUserId) {
            throw new ForbiddenException('Не нужно оценивать себя негативно, Вы прекрасны');
        }

        // Can't rate target user twice.
        // TODO REMOVE COMMENT
        // if(await this.isVotedForUser(userId, targetUserId)) {
        //     throw new ForbiddenException('Вы уже оценивали этого пользователя');
        // }

        // Decrease user's votes count (throw error if not enough votes).
        await this.userService.changeVotesCount(userId, -1);

        // Increase target user's hates count.
        await this.userModel.updateOne(
            { uid: targetUserId },
            {
                $inc: {
                    'social_rating.total'      : -1,
                    'social_rating.hates_count': 1
                }
            }
        ).exec();

        // Mark that user has voted for this target user.
        await this.hasVotedFor(userId, targetUserId);

        // Return the next user in the feed.
        return this.feedService.getNextUser(userId);
    }

    async ignore(userId: string, targetUserId: string) {
        if (userId == targetUserId) {
            throw new ForbiddenException('Вы не можете игнорировать сами себя');
        }

        // Can't rate target user twice.
        if(await this.isVotedForUser(userId, targetUserId)) {
            throw new ForbiddenException('Вы уже оценивали этого пользователя');
        }

        // Increase target user's ignores count.
        await this.userModel.updateOne(
            { uid: targetUserId },
            {
                $inc: {
                    'social_rating.ignores_count': 1
                }
            }
        ).exec();

        // Mark that user has voted for this target user.
        await this.hasVotedFor(userId, targetUserId);

        // Return the next user in the feed.
        return this.feedService.getNextUser(userId);
    }
}
