import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

Schema({
    timestamps: true
})
export class Post{
    @Prop({ required: [true, "Post Title is Required"]})
    title: string

    @Prop({ required: [true, "Post Content is Required"]})
    content: string

    @Prop()
    image: string

    @Prop()
    comments: []

    @Prop()
    likes: []
}

export const PostSchema = SchemaFactory.createForClass(Post)