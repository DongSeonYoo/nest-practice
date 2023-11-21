import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { PostEntity } from "src/posts/posts.entity";
import { UserEntity } from "src/users/users.entity";

export const typeormConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'dongseon',
	password: 'dongseon',
	database: 'nest_playground',
	entities: [UserEntity, PostEntity],
	synchronize: true
}