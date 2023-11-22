import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { SignupRequestDTO } from './dto/signup.request.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequestDTO } from './dto/update.request.dto';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from './const/auth.const';
import { LoginUserDTO } from './dto/login.request.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
	) { }

	/**
	 * payload에 들어갈 정보 (민감한 정보는 들어가면 안됨)
	 * 1. email
	 * 2. userPk
	 * 3. type: 'accessToken', 'refreshToken'
	 */
	signToken(user: Pick<UserEntity, 'email' | 'id'>, isRefreshToken: boolean) {
		const payload = {
			id: user.id,
			email: user.email,
			type: isRefreshToken ? 'refreshToken' : 'accessToken',
		};
		return this.jwtService.sign(payload, {
			secret: JWT_SECRET,
			// refresh token인 경우 1시간, accessToken인 경우 5분
			// (초 단위)
			expiresIn: isRefreshToken ? 3600 : 300
		});
	}

	extractTokenFromHeader(header: string) {
		const splitToken = header.split(' ');

		if (splitToken.length !== 2) {
			throw new UnauthorizedException('잘못된 토큰');
		}

		if (splitToken[0] !== 'bearer') {
			throw new UnauthorizedException('토큰 bearer만 가능하다고');
		}

		const token = splitToken[1];
		return token;
	}

	verifyToken(token: string) {
		try {
			return this.jwtService.verify(token, {
				secret: JWT_SECRET
			});
		} catch (error) {
			if (error.name === 'JsonWebTokenError') {
				throw new UnauthorizedException('토큰 븅삼같음');
			}

			if (error.name === 'TokenExpiredError') {
				throw new UnauthorizedException('토큰만료됨');
				// 여기서 리프레시토큰으로 엑세스 토큰 재발급하면 됨
			}
		}
	}

	async login(user: LoginUserDTO) {
		// 1. 해당하는 이메일을 가진 사용자가 존재하는지 확인
		const { email, password } = user;

		const foundUser = await this.getUserByEmail(email);
		const hashedPassword = foundUser.password;
		const passwordCompare = await bcrypt.compare(password, hashedPassword);
		if (!passwordCompare) {
			throw new BadRequestException('아이디 또는 비밀번호가 올바르지 않습니다');
		}

		// 토큰 발급
		return {
			accessToken: this.signToken(foundUser, false),
			refreshToken: this.signToken(foundUser, true)
		}
	}

	async signup(signupRequestDTO: SignupRequestDTO) {
		const hashedPassword = await bcrypt.hash(signupRequestDTO.password, 10);
		const userObj = this.userRepository.create({
			...signupRequestDTO,
			password: hashedPassword,
		});

		try {
			const registeredUser = await this.userRepository.save(userObj);

			return {
				accessToken: this.signToken(registeredUser, false),
				refreshToken: this.signToken(registeredUser, true)
			}
		} catch (error) {
			if (error.code === '23505') {
				throw new BadRequestException('이미 사용중인 아이디');
			}
		}
	}

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

	async getUserByEmail(email: string) {
		const foundUser = await this.userRepository.findOne({
			select: {
				id: true,
				email: true,
				password: true
			},
			where: {
				email
			}
		});

		if (!foundUser) {
			throw new BadRequestException('아이디 또는 비밀번호가 올바르지 않습니다');
		}
		return foundUser;
	}

	async updateUserByIdx(updateUserRequestDTO: UpdateUserRequestDTO) {
		const { userId, age: name } = updateUserRequestDTO;
		const updateResult = await this.userRepository.update(userId, {
			age: name
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
