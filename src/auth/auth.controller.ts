import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './Guards/local.auth-guard';
import { JWTAuthGuard } from './Guards/jwt.auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('username') username: string,
  ) {
    return this.authService.register(email, password, username);
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  async GetProfile(@Request() req) {
    return req.user;
  }
}
