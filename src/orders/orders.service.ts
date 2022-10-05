import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/orders.dto';
import { Order } from './orders.entity';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
    ) {}

    async findAll() {
        return await this.ordersRepository.find({relations:{product: true}});
    }

    async findOne(id: number) {
        const order = await this.ordersRepository.findOne({
            where:{
                idorders: id
            },
            relations: {
                product: true
            }
        });

        if(!order){
            throw new HttpException(`Order ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return order
    }

    async create(orderDto: OrderDto) {
        const order = await this.ordersRepository.create(orderDto)
        return await this.ordersRepository.save(order);
    }

    async remove(id: number) {
        const order = await this.ordersRepository.findOne({where: {idorders: id}})

        if(!order){
            throw new HttpException(`Order ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return await this.ordersRepository.delete(order);
    }
}
