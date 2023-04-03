import { Injectable } from '@nestjs/common';
import { createPostDto } from './dto';

@Injectable()
export class PostService {

    getAllPosts(){
        return 'Getting all posts from database'
    }

    createPost(dto: createPostDto){
        return 'Post Created and added to database'
    }

    getPost(id: string){
        return `Getting Post with id ${id}`
    }

    updatePost(dto: createPostDto, id: string){
        return `Updated post with id ${id}`
    }

    deletePost(id: string){
        return `Deleted post with id ${id}`
    }

}
