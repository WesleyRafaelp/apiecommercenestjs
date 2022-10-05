import { IsNumber } from 'class-validator';
import { Product } from 'src/products/products.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order { 
     
    @PrimaryGeneratedColumn()
    idorders: number;

    @ManyToOne(() => Product, (product) => product.idproduct)
    product: Product;

    @Column()
    @IsNumber()
    quantity: number;
}