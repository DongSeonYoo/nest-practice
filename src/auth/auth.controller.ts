import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDTO } from './dto/signup.request.dto';
import { UpdateUserRequestDTO } from './dto/update.request.dto';
import { LoginUserDTO } from './dto/login.request.dto';
import { AccessTokenGuard, AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  login(
    @Body() loginUserDTO: LoginUserDTO
  ) {
    return this.authService.login(loginUserDTO);
  }

  @Get()
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('/')
  getUserByIdx(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.getUserByIdx(userId);
  }

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  signup(
    @Body() signupRequestDTO: SignupRequestDTO
  ) {
    return this.authService.signup(signupRequestDTO);
  }

  @Put()
  updateUserByIdx(
    @Body() updateUserDTO: UpdateUserRequestDTO
  ) {
    return this.authService.updateUserByIdx(updateUserDTO);
  }

  @Delete()
  deleteUserByIdx(
    @Body('userId', ParseIntPipe) userId: number
  ) {
    return this.authService.deleteUserByIdx(userId);
  }
}
