import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService:OrdersService){}

    @Get()
    findAll(){
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.ordersService.findOne(id)
    }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    create(@Body() orderDto: OrderDto){
        return this.ordersService.create(orderDto)
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: number){
        return this.ordersService.remove(id);
    }
}

