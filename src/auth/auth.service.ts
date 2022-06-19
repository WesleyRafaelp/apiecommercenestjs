import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/usuarios/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService,
    ) { }

    async validateUsuario(email: string, senha: string): Promise<any> {
        const usuario = await this.usuariosService.findOne(email);
        if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
            const { senha, ...result } = usuario;
            return result;
        }
        return null;
    }

    async login(user: LoginDto) {
        const payload = { username: user.username }
        const usuario = await this.validateUsuario(user.username, user.password)
        if (usuario) {
            return {
                access_token: this.jwtService.sign(payload),
            }
        }
        throw new NotAcceptableException()
    }
}
