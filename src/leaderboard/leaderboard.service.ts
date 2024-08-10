import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/schemas';
import { Model } from 'mongoose';

@Injectable()
export class LeaderboardService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
    }

    async getTop(limit: number): Promise<User[]> {
        return await this.userModel
            .find()
            .where('show_in_leaderboard', true)      // Don't show users that prefer to hide
            .sort({ 'social_rating.total': -1 }) // Sort by total rating
            .limit(limit)
            .exec();
    }
}
 