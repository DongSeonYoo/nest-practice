import { BaseEntity } from "src/common/base.entity";
import { UserEntity } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: 'post_tb'
})
export class PostEntity extends BaseEntity {
	@Column()
	title: string;

	@Column()
	description: string;

	@ManyToOne(() => UserEntity, (user) => user.id, {
		nullable: false
	})
	@JoinColumn({
		name: 'user_id',
	})
	userId: UserEntity;
}