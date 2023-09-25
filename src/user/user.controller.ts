import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  me(@GetUser() user: any) {
    console.log(user);
    return 'This action returns my user: ' + user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
