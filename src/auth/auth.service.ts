import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { SignupRequestDTO } from './dto/signup.request.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequestDTO } from './dto/update.request.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) { }

	async getAllUsers() {
		return await this.userRepository.find();
	}

	async getUserByIdx(userId: number) {
		const foundUser = await this.userRepository.findOne({
			where: {
				id: userId
			}
		});
		if (!foundUser) {
			throw new NotFoundException("없음유저");
		}
		return foundUser;
	}

	async signup(signupRequestDTO: SignupRequestDTO) {
		const hashedPassword = await bcrypt.hash(signupRequestDTO.password, 10);
		const userObj = this.userRepository.create({
			...signupRequestDTO,
			password: hashedPassword,
		});
		return await this.userRepository.save(userObj);
	}

	async updateUserByIdx(updateUserRequestDTO: UpdateUserRequestDTO) {
		const { userId, name } = updateUserRequestDTO;
		const updateResult = await this.userRepository.update(userId, {
			name
		});

		if (!updateResult.affected) {
			throw new NotFoundException('해당하는 사용자가 없습니다');
		}

		return updateResult;
	}

	async deleteUserByIdx(userId: number) {
		const deletedResult = await this.userRepository.delete({
			id: userId
		});

		if (!deletedResult.affected) {
			throw new NotFoundException('해당하는 사용자가 없습니다');
		}
	}
}
