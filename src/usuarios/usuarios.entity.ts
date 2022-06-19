import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    idusuario: number;

    @Column()
    email: string;

    @Column()
    senha: string;
}