import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequestDTO } from './dto/create-post.request.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post('')
  createPost(@Body() createPostRequestDTO: CreatePostRequestDTO) {
    return this.postsService.createPost(createPostRequestDTO);
  }
}
