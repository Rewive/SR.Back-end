import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Country {
    @Prop({required: true})
    id: number;

    @Prop({required: true})
    title: string;
}

class SocialRating {
    @Prop({default: 0})
    social_credits: number;

    @Prop({default: 0})
    likes_count: number;

    @Prop({default: 0})
    ignores_count: number;

    @Prop({default: 0})
    hates_count: number;
}

@Schema()
export class User extends Document {
    @Prop({required: true, unique: true})
    uid: string;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop({default: 0})
    votes: number;

    @Prop({type: SocialRating, default: () => new SocialRating()})
    social_rating: SocialRating;

    // ===== Vk user data =====

    @Prop()
    bdate: string;

    @Prop()
    bdate_visibility: number;

    @Prop({type: Country})
    country: Country;

    @Prop()
    timezone: number;

    @Prop()
    photo_200: string;

    @Prop()
    photo_max_orig: string;

    @Prop()
    sex: number;

    @Prop()
    photo_100: string;

    @Prop()
    photo_base: string;

    @Prop()
    can_access_closed: boolean;

    @Prop()
    is_closed: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
