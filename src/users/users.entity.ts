import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    iduser: number;

    @Column()
    email: string;

    @Column()
    password: string;
}