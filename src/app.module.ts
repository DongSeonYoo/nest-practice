import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UsersModule,
    AuthModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [
    AppService, {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }],
})
export class AppModule { }
