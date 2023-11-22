import { IsEmail, IsNotEmpty } from "class-validator";

export class SignupRequestDTO {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	age: number;

	@IsNotEmpty()
	password: string;
}
