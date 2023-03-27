import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Auth{

    @Prop({ required: [true, 'Username is required']})
    name: string;

    @Prop({ required: [ true, 'Email is required'], unique: [ true, "Duplicate Email entered"]})
    email: string;

    @Prop({ required: [true, 'Password is required']})
    password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth)