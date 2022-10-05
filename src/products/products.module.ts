import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './products.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductsService,],
    controllers: [ProductsController],
    exports: [],
})
export class ProductsModule {}
