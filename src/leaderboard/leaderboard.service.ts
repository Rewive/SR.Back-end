import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/schemas';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';

interface SimplifiedUser {
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
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async getTop(limit: number): Promise<SimplifiedUser[]> {
        const users = await this.userModel
            .find()
            .where('show_in_leaderboard', true)      // Don't show users that prefer to hide
            .where('hasWon', false)                  // Exclude users who have won
            .sort({ 'social_rating.total': -1 })     // Sort by total rating
            .limit(limit)
            .exec();
    
            return users.map(user => ({
                uid: user.uid,
                first_name: user.first_name,
                last_name: user.last_name,
                social_rating: {
                    total: user.social_rating.total
                },
                photo_max_orig: user.photo_max_orig,
            }));
    }
    
    async getGlory(): Promise<SimplifiedUser[]> {
        const tests = await this.userModel
            .find()
            .where('show_in_leaderboard', true)      // Don't show users that prefer to hide
            .where('hasWon', true)                   // Only show users with hasWon: true
            .sort({ 'social_rating.total': -1 })     // Sort by total rating
            .exec();

    
        return tests.map(user => ({
            uid: user.uid,
            first_name: user.first_name,
            last_name: user.last_name,
            social_rating: {
                total: user.social_rating.total
            },
            photo_max_orig: user.photo_max_orig,
        }));
    }    

    // @Cron('0 0 * * *') // Runs every day at midnight
    @Cron('* * * * *') // Runs every minute
    async moveTopToGlory(): Promise<void> {
        const topUser = await this.userModel
            .findOne()
            .where('show_in_leaderboard', true)
            .where('hasWon', false)
            .sort({ 'social_rating.total': -1 })
            .exec();
        
        console.log("Leaderboard has been change")

        if (topUser) {
            topUser.hasWon = true;
            await topUser.save();
        }
    }
}
