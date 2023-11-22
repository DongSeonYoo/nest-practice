import { IsString } from "class-validator";
import { UserEntity } from "src/users/users.entity";
import { PostEntity } from "../posts.entity";
import { PickType } from "@nestjs/mapped-types";

export class CreatePostRequestDTO extends PickType(PostEntity, ['title', 'description']) { }