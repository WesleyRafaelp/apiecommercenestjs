import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PedidoDto } from './dto/pedido.dto';
import { PedidosService } from './pedidos.service';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
    constructor(private readonly pedidosService:PedidosService){}

    @Get()
    findAll(){
        return this.pedidosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.pedidosService.findOne(id)
    }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    create(@Body() pedidoDto: PedidoDto){
        return this.pedidosService.create(pedidoDto)
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: number){
        return this.pedidosService.remove(id);
    }
}

