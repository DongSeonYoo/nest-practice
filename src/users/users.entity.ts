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
	@Exclude({
		toPlainOnly: true
	})
	password: string;

	@OneToMany(() => PostEntity, (post) => post.userId)
	posts: PostEntity[];
}