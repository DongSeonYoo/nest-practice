import { PickType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { UserEntity } from "src/users/users.entity";

export class SignupRequestDTO {
	email: string;
	name: string;
	password: string;
}
