import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';

@Module({
  imports:[ JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async (configService:ConfigService) => ({
      secret:configService.get<string>('secretKey'),
      signOptions:{expiresIn:configService.get<string>('accessExpiresIn')}
    })
  })],
  providers: [AuthService,JwtService,DatabaseService],
  controllers: [AuthController]
})
export class AuthModule {}
