import { Body, Controller, Post, UseGuards, Request, Get, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
                private readonly authService: AuthService) { }

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Post()
    create(@Body() userDto: UserCreateDto) {
        return this.usersService.create(userDto);
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
        return this.usersService.remove(id);
    }
}
