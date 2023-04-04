import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';

@Module({
  imports: [ MongooseModule.forFeature([{name: 'Post', schema: PostSchema}]) ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
