import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsuariosController } from './usuarios.controller';
import { usuarioProviders } from './usuarios.providers';
import { UsuariosService } from './usuarios.service';

@Module({
  imports:[DatabaseModule],
  providers: [UsuariosService, AuthService, JwtService, ...usuarioProviders],
  controllers:[UsuariosController],
  exports:[ UsuariosService,]
})
export class UsuariosModule {}
