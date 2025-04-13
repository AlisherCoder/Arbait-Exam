import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EskizService } from './eskiz/eskiz.service';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { BrandModule } from './brand/brand.module';
import { SizeModule } from './size/size.module';
import { CapacityModule } from './capacity/capacity.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    RegionModule,
    UsersModule,
    CompaniesModule,
    BrandModule,
    SizeModule,
    CapacityModule,
  ],
  controllers: [AppController],
  providers: [AppService, EskizService],
})
export class AppModule {}
