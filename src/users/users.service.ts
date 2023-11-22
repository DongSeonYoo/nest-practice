import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
	constructor(
		private readonly authServices: AuthService
	) { }

	getUserProfile(userId: number) {
		return this.authServices.getUserByIdx(userId)
	}
}
