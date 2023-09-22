import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() newUserData: AuthDto) {
    console.log('newUserData: ', newUserData);
    return this.authService.signup(newUserData);
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
