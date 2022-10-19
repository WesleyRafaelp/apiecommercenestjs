import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Product } from "../../products/products.entity";

export class OrderDto {
    
    @ApiProperty({type: Product})
    product: Product;
    
    @ApiProperty()
    @IsNumber()
    quantity: number;
}