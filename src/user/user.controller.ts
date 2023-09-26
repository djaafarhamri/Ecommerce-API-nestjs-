import { Controller, Get, Put, UseGuards, Body, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  me(@Req() req: any) {
    return this.userService.me(req);
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Put()
  update(@Body() updateUserInfo: any, @Req() req: any) {
    return this.userService.update(req, updateUserInfo);
  }
}
