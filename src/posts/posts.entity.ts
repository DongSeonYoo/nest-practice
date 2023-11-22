import { IsString } from "class-validator";
import { BaseEntity } from "src/common/entity/base.entity";
import { UserEntity } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: 'post_tb'
})
export class PostEntity extends BaseEntity {
	@Column()
	@IsString({
		message: 'title은 스트링이어야함'
	})
	title: string;

	@Column()
	@IsString({
		message: 'description은 스트링이어야함'
	})
	description: string;

	@ManyToOne(() => UserEntity, (user) => user.id, {
		nullable: false
	})
	@JoinColumn({
		name: 'user_id',
	})
	userId: UserEntity;
}