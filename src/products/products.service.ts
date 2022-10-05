import { HttpException, HttpStatus, Inject, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/products.dto';
import { Product } from './products.entity';


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ){}

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

   async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: {
                idproduct:id
            }
        });

        if(!product){
            throw new HttpException(`Product ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

       return product
}

    async create(createProductDto: CreateProductDto){
        const product = await this.productsRepository.findOne({
            where:{
                name: createProductDto.name
            }
        });

        if(product){
            throw new HttpException(`Product already registered!`, HttpStatus.CONFLICT)
        }

        return await this.productsRepository.save(createProductDto);
    }

    async update(id: number, updateProductDto){
        const product = await this.productsRepository.update({idproduct: id}, updateProductDto);
        return product
    }

    async remove(id:number){
        const product = await this.productsRepository.findOne({ where: {idproduct: id}});

        if(!product){
            throw new HttpException(`Product ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return await this.productsRepository.delete(product);
    }
}
