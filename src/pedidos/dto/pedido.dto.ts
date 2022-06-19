import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class PedidoDto {
    
    @ApiProperty()
    @IsNumber()
    produto: number;
    
    @ApiProperty()
    @IsNumber()
    quantidade: number;
}