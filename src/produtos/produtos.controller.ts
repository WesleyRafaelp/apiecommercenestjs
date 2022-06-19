import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProdutoDto } from './dto/produto.dto';
import { UpdateDto } from './dto/update.dto';
import { ProdutosService } from './produtos.service';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService){}

    @Get()
    findAll(){
        return this.produtosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number ){
        return this.produtosService.findOne(id);
    }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    create(@Body() produtoDto: ProdutoDto ){
        return this.produtosService.create(produtoDto);
    }

    @Patch(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: number, @Body() updateDto: UpdateDto ){
        return this.produtosService.update(id, updateDto);
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: number){
        return this.produtosService.remove(id);
    }
}
