import { BaseEntity } from "src/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
	name: 'user_tb'
})
export class UserEntity extends BaseEntity {
	@Column({
		name: 'login_id'
	})
	loginId: string;

	@Column({
		name: 'password'
	})
	password: string;
}