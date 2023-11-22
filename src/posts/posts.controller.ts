import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequestDTO } from './dto/create-post.request.dto';
import { AccessTokenGuard } from 'src/auth/guard/auth.guard';
import { UserEntity } from 'src/users/users.entity';
import { User } from 'src/users/decorator/user.decorator';
import { UpdatePostRequestDTO } from './dto/update-post.request.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  // @Post('')
  // createPost(@Body() createPostRequestDTO: CreatePostRequestDTO) {
  //   return this.postsService.createPost(createPostRequestDTO);
  // }
  @Post()
  @UseGuards(AccessTokenGuard)
  createPost(
    @User() user: UserEntity,
    @Body() createPostDTO: CreatePostRequestDTO
  ) {
    return this.postsService.createPost(user.id, createPostDTO);
  }

  @Put()
  @UseGuards(AccessTokenGuard)
  updatePost(
    @Body() updatePostDTO: UpdatePostRequestDTO
  ) {
    return this.postsService.updatePost(updatePostDTO);
  }
}
