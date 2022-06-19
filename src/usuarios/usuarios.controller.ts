import { Body, Controller, Post, UseGuards, Request, Get, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { UsuarioCreateDto } from './dto/usuario.create.dto';
import { UsuariosService } from './usuarios.service';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService,
                private readonly authService: AuthService) { }

    @Get()
    findAll(){
        return this.usuariosService.findAll();
    }

    @Post()
    create(@Body() usuarioDto: UsuarioCreateDto) {
        return this.usuariosService.create(usuarioDto);
    }

   // @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id:number){
        return this.usuariosService.remove(id);
    }
}
