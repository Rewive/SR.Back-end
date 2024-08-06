import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

class Country {
    @Prop({required: true})
    id: number;

    @Prop({required: true})
    title: string;
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

    @Prop({default: 0})
    social_rating: number;

    @Prop({default: 0})
    likes_count: number;

    @Prop({default: 0})
    dislikes_count: number;

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
