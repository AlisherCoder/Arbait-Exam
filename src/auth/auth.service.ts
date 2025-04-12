import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ActivateDto,
  CreateAuthDto,
  LoginAuthDto,
  ResetPasswordDto,
  SendOtpDto,
} from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EskizService } from 'src/eskiz/eskiz.service';
import * as DeviceDetector from 'device-detector-js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { totp } from 'otplib';
totp.options = { step: 600, digits: 5 };

@Injectable()
export class AuthService {
  private ACCKEY = process.env.ACCKEY;
  private REFKEY = process.env.REFKEY;
  private OTPKEY = process.env.OTPKEY;
  private deviceDetector = new DeviceDetector();

  constructor(
    private prisma: PrismaService,
    private eskizService: EskizService,
    private jwtServices: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    let { phone, password, region_id } = createAuthDto;
    try {
      let user = await this.prisma.user.findUnique({ where: { phone } });
      if (user) {
        throw new ConflictException('User already exists');
      }

      let region = await this.prisma.region.findUnique({
        where: { id: region_id },
      });
      if (!region) {
        throw new NotFoundException('Not found region');
      }

      let hashedpassword = await bcrypt.hash(password, 10);
      await this.prisma.user.create({
        data: { ...createAuthDto, password: hashedpassword },
      });

      let otp = totp.generate(this.OTPKEY + phone);
      // await this.eskizService.sendSMS(otp, phone);

      return {
        otp,
        data: 'Registration was successful. The code was sent to your phone number, please activate your account',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async login(loginAuthDto: LoginAuthDto, req: Request) {
    let { phone, password } = loginAuthDto;
    try {
      let user = await this.prisma.user.findUnique({ where: { phone } });
      if (!user) {
        throw new UnauthorizedException();
      }

      let isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new BadRequestException('Phone number or password is wrong');
      }

      if (!user.status) {
        throw new BadRequestException(
          'Your account is not active, please activate your account',
        );
      }

      let session = await this.prisma.session.findFirst({
        where: { ip_address: req.ip, user_id: user.id },
      });

      if (!session) {
        let useragent: any = req.headers['user-agent'];
        let device = this.deviceDetector.parse(useragent);

        let newSession: any = {
          ip_address: req.ip,
          user_id: user.id,
          device,
        };

        await this.prisma.session.create({ data: newSession });
      }

      let accessToken = this.genAccessToken({ id: user.id, role: user.role });
      let refreshToken = this.genRefreshToken({ id: user.id, role: user.role });

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async sendOTP(sendOtpDto: SendOtpDto) {
    let { phone } = sendOtpDto;
    try {
      let user = await this.prisma.user.findUnique({ where: { phone } });
      if (!user) {
        throw new UnauthorizedException();
      }

      let otp = totp.generate(this.OTPKEY + phone);
      // await this.eskizService.sendSMS(otp, phone)

      return { data: 'OTP sent to your phone number', otp };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async activate(activateDto: ActivateDto) {
    let { phone, otp } = activateDto;
    try {
      let isValid = totp.check(otp, this.OTPKEY + phone);
      if (!isValid) {
        throw new UnauthorizedException();
      }

      await this.prisma.user.update({
        where: { phone },
        data: { status: true },
      });

      return { data: 'Your account has been successfully activated' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    let { phone, otp, newPassword } = resetPasswordDto;
    try {
      let isValid = totp.check(otp, this.OTPKEY + phone);
      if (!isValid) {
        throw new UnauthorizedException();
      }

      let hashedpassword = await bcrypt.hash(newPassword, 10);
      await this.prisma.user.update({
        where: { phone },
        data: { password: hashedpassword },
      });

      return { data: 'Your password updated successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async refreshToken(req: Request) {
    let user = req['user'];
    try {
      let accessToken = this.genAccessToken({ id: user.id, role: user.role });
      return { accessToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  genAccessToken(payload: any) {
    return this.jwtServices.sign(payload, {
      secret: this.ACCKEY,
      expiresIn: '12h',
    });
  }

  genRefreshToken(payload: any) {
    return this.jwtServices.sign(payload, {
      secret: this.REFKEY,
      expiresIn: '7d',
    });
  }
}
