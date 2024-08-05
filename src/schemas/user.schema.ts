import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    //Тут для примера
    @Prop()
    name: string;

    @Prop()
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
