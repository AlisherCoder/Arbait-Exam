import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ActivateDto,
  CreateAuthDto,
  LoginAuthDto,
  RefreshTokenDto,
  ResetPasswordDto,
  SendOtpDto,
} from './dto/create-auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto, @Req() req: Request) {
    return this.authService.login(loginAuthDto, req);
  }

  @Post('send-otp')
  sendOTP(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOTP(sendOtpDto);
  }

  @Post('verify')
  activate(@Body() activateDto: ActivateDto) {
    return this.authService.activate(activateDto);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Req() req: Request) {
    return this.authService.refreshToken(req);
  }

  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req);
  }

  @Get('me')
  me(@Req() req: Request) {
    return this.authService.me(req);
  }
}
