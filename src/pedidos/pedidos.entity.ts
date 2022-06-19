import { IsNumber } from 'class-validator';
import { Produto } from 'src/produtos/produtos.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pedidos')
export class Pedido { 
     
    @PrimaryGeneratedColumn()
    idpedidos: number;

    @ManyToOne(() => Produto, (produto) => produto.idproduto)
    produto: Produto;

    @Column()
    @IsNumber()
    quantidade: number;
}