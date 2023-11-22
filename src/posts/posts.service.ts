import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { CreatePostRequestDTO } from './dto/create-post.request.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
		private readonly authServices: AuthService
	) { }

	async createPost(userId: number, createPostRequestDTO: CreatePostRequestDTO) {
		const foundUser = await this.authServices.getUserByIdx(userId);
		const createdPost = this.postRepository.create({
			...createPostRequestDTO,
			userId: foundUser
		});
		const postInfo = await this.postRepository.save(createdPost);

		return {
			postId: postInfo.id,
			authorId: postInfo.userId.id,
			authorName: postInfo.userId.age
		};
	}
}
