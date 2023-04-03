import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { createPostDto } from './dto';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @ApiCreatedResponse()
    @Get('all')
    getAllPosts(){
        return this.postService.getAllPosts()
    }

    @ApiCreatedResponse()
    @Post('add')
    createPost(@Body() dto: createPostDto){
        return this.postService.createPost(dto)
    }

    @ApiCreatedResponse()
    @Get('post/:id')
    getPost(@Param('id') id: string){
        return this.postService.getPost(id)
    }

    @ApiCreatedResponse()
    @Patch('update/:id')
    updatePost(@Param('id') id: string, @Body() dto: createPostDto){
        return this.postService.updatePost(dto, id)
    }

    @ApiCreatedResponse()
    @Delete('delete/:id')
    deletePost(@Param('id') id: string){
        return this.postService.deletePost(id)
    }
}
