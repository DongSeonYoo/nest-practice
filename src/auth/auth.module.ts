import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';
import { PostEntity } from 'src/posts/posts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PostEntity
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
