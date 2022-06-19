import { PartialType } from "@nestjs/swagger";
import { ProdutoDto } from "./produto.dto";

export class UpdateDto extends PartialType(ProdutoDto){}