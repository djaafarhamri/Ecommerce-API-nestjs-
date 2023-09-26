import { Controller, Get, Put, UseGuards, Body, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { AdminGuard } from 'src/auth/guard/admin.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  me(@Req() req: any) {
    return this.userService.me(req);
  }

  @UseGuards(JwtGuard, AdminGuard)
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
