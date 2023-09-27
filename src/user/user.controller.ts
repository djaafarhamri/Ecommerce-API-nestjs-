import { Controller, Get, Put, UseGuards, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { UpdateUserDto } from './dto';
import { UserFromReq } from 'src/dtos';
import { GetUser } from 'src/auth/decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  me(@GetUser() user: UserFromReq) {
    return this.userService.me(user);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Put()
  update(@Body() updateUserInfo: UpdateUserDto, @GetUser() user: UserFromReq) {
    return this.userService.update(user, updateUserInfo);
  }
}
