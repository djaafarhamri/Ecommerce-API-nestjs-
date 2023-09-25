import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() newUserData: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signup(newUserData, res);
  }

  @HttpCode(200)
  @Post('signin')
  signin(
    @Body() signinData: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(signinData, res);
  }
}
