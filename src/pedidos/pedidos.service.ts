import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedidos.entity';


@Injectable()
export class PedidosService {
    constructor(
        @Inject('PEDIDO_REPOSITORY')
        private pedidosRepository: Repository<Pedido>,
    ){}

    async findAll(){
        return this.pedidosRepository.find();
    }

   async findOne(id:number){
        return await this.pedidosRepository.findOne({
            where: {
                idpedidos:id
            }
        });
    }

    async create(pedidoDto){
        return await this.pedidosRepository.save(pedidoDto);
    }

    async remove(id: number){
        return await this.pedidosRepository.delete({idpedidos: id});
    }
}
