import { PickType } from "@nestjs/mapped-types";
import { UserEntity } from "src/users/users.entity";

export class SignupRequestDTO extends PickType(UserEntity, ['email', 'age', 'password']) { }
