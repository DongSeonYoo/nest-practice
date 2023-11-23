import { Exclude } from "class-transformer";
import { IsEmail, IsNumber, IsString, Length } from "class-validator";
import { BaseEntity } from "src/common/entity/base.entity";
import { lengthValidationMessage } from "src/common/validation-message/validation-message";
import { PostEntity } from "src/posts/posts.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({
	name: 'user_tb'
})
export class UserEntity extends BaseEntity {
	@Column({
		name: 'email',
		length: 256,
		unique: true
	})
	@IsString()
	@IsEmail()
	@Length(1, 20, {
		message: lengthValidationMessage
	})
	email: string;

	@Column()
	@IsNumber()
	age: number;

	@Column({
		name: 'password',
		length: 60
	})
	@IsString()
	@Length(1, 30, {
		message: lengthValidationMessage
	})
	/**
	 * FE -> BE (request)
	 * JSON(plain object) -> DTO(class instance)
	 * 
	 * BE -> FE (response)
	 * DTO(class instance) -> JSON(plain object)
	 * 
	 * toClassOnly -> class object로 변환될 때, 즉 request에 적용한다
	 * toPlainOnly -> plain object로 변환될 떄, 즉 response에 적용한다
	 */
	@Exclude({
		toPlainOnly: true
	})
	password: string;

	@OneToMany(() => PostEntity, (post) => post.userId)
	posts: PostEntity[];
}