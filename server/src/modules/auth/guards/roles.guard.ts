import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/modules/database/database.service';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private db: DatabaseService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (!request.cookies.Refresh) return false;

    let access = "";
    if (!request.cookies.access_token) {
      access = this.authService.getAccessToken(1);
      request.res.setHeader(
        'Set-Cookie',
        `access_token=${access}; HttpOnly; Path=/; Max-Age=${this.configService.get(
          'accessExpiresIn',
        )}`,
      );
    } else access = request.cookies.access_token;
    const decoded = this.jwtService.decode(access);
    let id = 0;
    if (typeof decoded == 'object') id = decoded.id;
    let user = await this.db.users.findFirst({ where: { id: id } });

    if (roles[0] == user.role) return true;
    return false;
  }
}
