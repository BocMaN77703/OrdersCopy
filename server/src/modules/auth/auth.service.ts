import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { DatabaseService } from '../database/database.service'
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private db: DatabaseService
    ) {}

    createUser = async () => {
        const pass = bcrypt.hashSync('1234', 10)
        const res = await this.db.users.create({
            data: { code: pass, role: 'admin' },
        })
        return res
    }

    validateUser = async (
        pass: string
    ): Promise<{ id: number; role: string } | null> => {
        const admin = await this.db.users.findFirst({
            where: { role: 'admin' },
        })
        const validPassword = bcrypt.compareSync(pass, admin.code)
        if (admin && validPassword) {
            const { code, ...result } = admin
            return result
        }
        return null
    }

    public getAccessToken(id: number) {
        const token = this.jwtService.sign(
            { id },
            {
                secret: this.configService.get('secretKey'),
                expiresIn: `${this.configService.get('accessExpiresIn')}s`,
            }
        )
        return token
    }

    public getCookieWithJwtAccessToken(id: number) {
        const token = this.jwtService.sign(
            { id },
            {
                secret: this.configService.get('secretKey'),
                expiresIn: `${this.configService.get('accessExpiresIn')}s`,
            }
        )
        return `access_token=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            'accessExpiresIn'
        )}`
    }

    public getCookieWithJwtRefreshToken(id: number) {
        const token = this.jwtService.sign(
            { id },
            {
                secret: this.configService.get('refreshSecret'),
                expiresIn: `${this.configService.get('refreshExpiresIn')}s`,
            }
        )
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            'refreshExpiresIn'
        )}`
        return {
            cookie,
            token,
        }
    }

    public getCookiesForLogOut() {
        return [
            'access_token=; HttpOnly; Path=/; Max-Age=0',
            'Refresh=; HttpOnly; Path=/; Max-Age=0',
        ]
    }
}
