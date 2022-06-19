import { IsNumber, IsString,} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produtos')
export class Produto {
    
    @PrimaryGeneratedColumn()
    idproduto: number;

    @Column()
    @IsString()
    nome: string;

    @Column()
    @IsNumber()
    preco: number;
}