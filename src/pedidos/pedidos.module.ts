import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PedidosController } from './pedidos.controller';
import { pedidoProviders } from './pedidos.providers';
import { PedidosService } from './pedidos.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...pedidoProviders, 
        PedidosService, 
    ],
    controllers: [PedidosController],
    exports: [],
})
export class PedidosModule {}
