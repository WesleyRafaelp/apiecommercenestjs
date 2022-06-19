import { Pedido } from 'src/pedidos/pedidos.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produtos')
export class Produto {
     
    @PrimaryGeneratedColumn()
    @OneToMany(() => Pedido, (pedido) => pedido.produto)
    idproduto: number;

    @Column()
    nome: string;

    @Column()
    preco: number;

}