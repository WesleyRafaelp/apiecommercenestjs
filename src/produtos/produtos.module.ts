import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ProdutosController } from './produtos.controller';
import { produtoProviders } from './produtos.providers';
import { ProdutosService } from './produtos.service';


@Module({
    imports: [DatabaseModule],
    providers: [ProdutosService, ...produtoProviders],
    controllers: [ProdutosController],
    exports: [],
})
export class ProdutosModule {}
