import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { CreatePostRequestDTO } from './dto/create-post.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdatePostRequestDTO } from './dto/update-post.request.dto';

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
			postInfo
		};
	}

	async updatePost(updatePostDTO: UpdatePostRequestDTO) {
		// const post = await this.getPostByIdx(postId);
		const { postId, title, description } = updatePostDTO;
		const post = await this.getPostByIdx(postId);

		const updateResult = await this.postRepository.update(post.id, {
			title,
			description
		});
		console.log(updateResult)

		return updateResult;
	}

	async getPostByIdx(postId: number) {
		const foundPost = await this.postRepository.findOne({
			where: {
				id: postId
			}
		});

		if (!foundPost) {
			throw new NotFoundException('해당하는 게시글이 존재하지 않음');
		}

		return foundPost;
	}
}
