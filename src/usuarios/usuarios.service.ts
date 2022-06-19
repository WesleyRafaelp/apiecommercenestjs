import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsuarioCreateDto } from './dto/usuario.create.dto';
import { Usuario } from './usuarios.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(
        @Inject('USUARIO_REPOSITORY')
        private usuariosRepository : Repository<Usuario>,
    ) {}

    findAll(): Promise<Usuario[]> {
        return this.usuariosRepository.query('SELECT * FROM usuarios;')
    }

    async create(usuarioDto: UsuarioCreateDto){
        return await this.usuariosRepository.createQueryBuilder()
        .insert()
        .into(Usuario)
        .values({
            email: usuarioDto.email,
            senha: bcrypt.hashSync(usuarioDto.senha, 8),
        })
        .execute()
    }

    async findOne(email: string): Promise<Usuario | undefined>{
        return await this.usuariosRepository.findOne({where:{email:email}}); 
    }

    async remove(id:number){
        return await this.usuariosRepository.delete({idusuario: id});
    }
}
