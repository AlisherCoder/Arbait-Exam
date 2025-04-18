import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
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
import { CreateAdminDto } from './dto/create-admin.dto';
import { RefreshGuard } from 'src/guards/refresh.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role, Roles } from 'src/guards/roles.decorator';

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

  @UseGuards(RefreshGuard)
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Req() req: Request) {
    return this.authService.refreshToken(req);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('createAdmin')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(createAdminDto);
  }

  @UseGuards(AuthGuard)
  @Get('myData')
  me(@Req() req: Request) {
    return this.authService.me(req);
  }

  @UseGuards(AuthGuard)
  @Get('myBackets')
  myBacket(@Req() req: Request) {
    return this.authService.myBacket(req);
  }

  @UseGuards(AuthGuard)
  @Get('mySessions')
  mysession(@Req() req: Request) {
    return this.authService.mysession(req);
  }

  @UseGuards(AuthGuard)
  @Get('myOrders')
  myorders(@Req() req: Request) {
    return this.authService.myorders(req);
  }
}
