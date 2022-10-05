import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    providers: [ 
        OrdersService, 
    ],
    controllers: [OrdersController],
    exports: [],
})
export class OrdersModule {}
