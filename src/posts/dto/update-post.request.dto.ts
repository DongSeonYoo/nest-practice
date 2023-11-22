import { PartialType } from "@nestjs/mapped-types";
import { CreatePostRequestDTO } from "./create-post.request.dto";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePostRequestDTO {
	@IsNotEmpty()
	@IsNumber()
	postId: number;

	@IsString()
	@IsOptional()
	title?: string;

	@IsString()
	@IsOptional()
	description?: string;
}
