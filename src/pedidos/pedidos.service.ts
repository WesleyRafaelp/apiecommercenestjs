import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pedido } from './pedidos.entity';


@Injectable()
export class PedidosService {
    constructor(
        @Inject('PEDIDO_REPOSITORY')
        private pedidosRepository: Repository<Pedido>,
    ) { }

    async findAll() {
        return this.pedidosRepository.query('select idpedidos, nome, quantidade from pedidos join produtos on pedidos.produtoIdproduto = produtos.idproduto where idpedidos;');
    }

    async findOne(id: number) {
        return await this.pedidosRepository.createQueryBuilder("pedidos")
            .innerJoinAndSelect("pedidos.produto", "produtos")
            .where("pedidos.idpedidos = :idpedidos;", { idpedidos: id })
            .getOne()
    }

    async create(pedidoDto) {
        return await this.pedidosRepository.save(pedidoDto);
    }

    async remove(id: number) {
        return await this.pedidosRepository.delete({ idpedidos: id });
    }
}
