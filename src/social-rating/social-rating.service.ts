import { Injectable } from '@nestjs/common';

@Injectable()
export class SocialRatingService {

    async getSocialRatingByUserId(userId: string) {
        return 0;
    }

    async likeByUserId(userId: string) {
        return 0;
    }

    async dislikeByUserId(userId: string) {
        return 0;
    }
}
