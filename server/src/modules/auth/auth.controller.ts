import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { request } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login/:code')
  async login(@Param('code') code: string, @Req() req) {
    const res = await this.authService.validateUser(code);
    if (!res) {
      throw new HttpException('Incorrect code', 400);
    }
    const accessTokenCookie =
      this.authService.getCookieWithJwtAccessToken(res.id);
    const refreshTokenCookie =
      this.authService.getCookieWithJwtRefreshToken(res.id);

    req.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie.cookie,
    ]);

    return true
  }

  @Post('refresh')
  refresh(@Req() request) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      1
    );
    request.res.setHeader('Set-Cookie', accessTokenCookie);
  }

  @Get('checkTokens')
  checkTokens(@Req() request) {
    if (request.cookies.Refresh)
      return true
    else
      return false
  }

  @Post('create')
  create(){
    return this.authService.createUser()
  }

  @Post('log-out')
  async logOut(@Req() request) {
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }
}
 