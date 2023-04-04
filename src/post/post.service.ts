import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { createPostDto } from './dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postSchema:mongoose.Model<Post>){}
    async getAllPosts(){
        const posts = await this.postSchema.find({})

        return posts
    }

    async createPost(dto: createPostDto): Promise<{}>{
        // Get details from user
        const { title, content, image, comments, likes} = dto

        console.log(dto);
        

        const post = await this.postSchema.create({
            title: title,
            content: content,
            image: image,
            comments: comments,
            likes: likes
        })

        console.log(post)

        return post
    }

    async getPost(id: string){
        // Get Id
        const post = await this.postSchema.findOne({
            _id: id
        })

        return post
    }

    updatePost(dto: createPostDto, id: string){
        return `Updated post with id ${id}`
    }

    async deletePost(id: string){
        
        const deletedPost = await this.postSchema.findOneAndDelete({
            _id: id
        })

        return deletedPost
    }

}
