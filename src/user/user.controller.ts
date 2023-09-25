import { Controller, Get, Put, UseGuards, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  me(@GetUser() user: any) {
    return user;
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Put()
  update(@Body() updateUserInfo: any, @GetUser() user: any) {
    console.log('updateUserInfo');
    console.log(updateUserInfo);
    return this.userService.update(user, updateUserInfo);
  }
}
