import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EskizService } from './eskiz/eskiz.service';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    RegionModule,
  ],
  controllers: [AppController],
  providers: [AppService, EskizService],
})
export class AppModule {}
