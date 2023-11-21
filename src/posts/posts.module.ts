import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserEntity } from 'src/users/users.entity';
import { PostEntity } from './posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntity
    ]),
    AuthModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
