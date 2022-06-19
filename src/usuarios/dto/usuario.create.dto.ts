import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UsuarioCreateDto {
    
    @ApiProperty()
    @IsEmail()
    readonly email: string;
    
    @ApiProperty()
    @IsString()
    readonly senha: string;
}