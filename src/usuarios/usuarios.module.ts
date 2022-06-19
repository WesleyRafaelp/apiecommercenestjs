import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
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
