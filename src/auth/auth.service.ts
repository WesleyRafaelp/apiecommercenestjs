import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../users/dto/login.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUsuario(email: string, password: string): Promise<any> {
        const usuario = await this.userService.findOne(email);
        if (usuario && bcrypt.compareSync(password, usuario.password)) {
            const { password, ...result } = usuario;
            return result;
        }
        return null;
    }

    async login(user: LoginDto) {
        const payload = { username: user.username }
        const usuario = await this.validateUsuario(user.username, user.password)
        if (usuario) {
            return {
                access_token: this.jwtService.sign(payload, {
                    privateKey: jwtConstants.secret,
                    expiresIn: '5min'
                }),
            }
        }
        throw new NotAcceptableException()
    }
}
