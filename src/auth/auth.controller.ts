import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDTO } from './dto/signup.request.dto';
import { UpdateUserRequestDTO } from './dto/update.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('/:userId')
  getUserByIdx(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.getUserByIdx(userId);
  }

  @Post('/signup')
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
