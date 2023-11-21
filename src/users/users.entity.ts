import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
	name: 'user_tb'
})
export class UserEntity extends BaseEntity {
	@Column({
		name: 'email',
		length: 256
	})
	email: string;

	@Column({
		name: 'name',
		length: 10,
		unique: true
	})
	name: string;

	@Column({
		name: 'password',
		length: 60
	})
	@Exclude()
	password: string;
}