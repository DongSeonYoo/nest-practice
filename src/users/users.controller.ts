import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/profile')
  @UseGuards(AccessTokenGuard)
  getUserProfile(
    @Request() req: any
  ) {
    return this.usersService.getUserProfile(req.user.id);
  }
}
