import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/products.dto';
import { UpdateProductDto } from './dto/update.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    findAll(){
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number ){
        return this.productsService.findOne(id);
    }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    create(@Body() productDto: CreateProductDto ){
        return this.productsService.create(productDto);
    }

    @Patch(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: number, @Body() updateDto: UpdateProductDto ){
        return this.productsService.update(id, updateDto);
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: number){
        return this.productsService.remove(id);
    }
}
