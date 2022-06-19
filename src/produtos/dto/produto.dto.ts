import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, isString } from "class-validator";

export class ProdutoDto{
    
    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsNumber()
    preco: number;
}