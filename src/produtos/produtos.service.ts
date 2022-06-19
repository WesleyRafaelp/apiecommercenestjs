import { HttpException, HttpStatus, Inject, Injectable, Req } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Produto } from './produtos.entity';


@Injectable()
export class ProdutosService {
    constructor(
        @Inject('PRODUTO_REPOSITORY')
        private produtosRepository: Repository<Produto>,
    ){}

    findAll(): Promise<Produto[]> {
        return this.produtosRepository.query('SELECT * FROM produtos;')
    }

   async findOne(id: number): Promise<Produto> {
        const produto = await this.produtosRepository.findOne({
        where: {
            idproduto:id
        }
    })

        if(!produto){
            throw new HttpException(`Produto ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
       return produto
}

    async create(produtoDto){
        const produto = await this.produtosRepository.save(produtoDto)
        return produto
    }

    async update(id: number, updateDto){
        const produto = await this.produtosRepository.update({idproduto: id}, updateDto);
        return produto
    }

    async remove(id:number){
        const produto = await this.produtosRepository.delete({idproduto: id});
        return produto
    }
}
