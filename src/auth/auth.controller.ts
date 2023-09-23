import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() newUserData: SignupDto) {
    return this.authService.signup(newUserData);
  }

  @Post('signin')
  signin(@Body() signinData: SigninDto) {
    return this.authService.signin(signinData);
  }
}
