import { Order } from '../orders/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
     
    @PrimaryGeneratedColumn()
    @OneToMany(() => Order, (pedido) => pedido.product)
    idproduct: number;

    @Column()
    name: string;

    @Column()
    price: number;

}