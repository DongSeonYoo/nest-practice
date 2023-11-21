import { UserEntity } from "src/users/users.entity";

export class CreatePostRequestDTO {
	userId: number;
	title: string;
	description: string;
}