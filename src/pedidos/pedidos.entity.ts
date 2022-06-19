import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pedidos')
export class Pedido {
    
    @PrimaryGeneratedColumn()
    idpedidos: number;

    @Column()
    @IsNumber()
    idproduto: number;

    @Column()
    @IsNumber()
    quantidade: number;
}