import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/schemas';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';

export interface SimplifiedUser {
    uid: string;
    first_name: string;
    last_name: string;
    social_rating: {
        total: number;
    };
    photo_max_orig: string;
}

@Injectable()
export class LeaderboardService {
    private select = 'uid first_name last_name social_rating photo_max_orig photo_100';

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
    }

    async getTop(limit: number): Promise<SimplifiedUser[]> {
        const users = await this.userModel
            .find()
            .where('show_in_leaderboard', true)      // Don't show users that prefer to hide
            .where('hasWon', false)                  // Exclude users who have won
            .sort({ 'social_rating.total': -1 })     // Sort by total rating
            .limit(limit)
            .select(this.select)
            .exec();

        return users;
    }

    async getGlory(): Promise<SimplifiedUser[]> {
        const users = await this.userModel
            .find()
            .where('show_in_leaderboard', true)      // Don't show users that prefer to hide
            .where('hasWon', true)                   // Only show users with hasWon: true
            .sort({ 'social_rating.total': -1 }) // Sort by total rating
            .select(this.select)
            .limit(100)
            .exec();

        return users;
    }

    /**
     * Every day mark one top user as hasWon = true.
     */
    @Cron('0 0 * * *') // Runs every day at midnight
    async moveTopToGlory(): Promise<void> {
        const topUser = await this.userModel
            .findOne()
            .where('show_in_leaderboard', true)
            .where('hasWon', false)
            .sort({ 'social_rating.total': -1 })
            .exec();

        console.log('Leaderboard has been changed');

        if (topUser) {
            topUser.hasWon = true;
            await topUser.save();
        }
    }
}
