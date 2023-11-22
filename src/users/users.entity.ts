import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/base.entity";
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
	email: string;

	@Column()
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