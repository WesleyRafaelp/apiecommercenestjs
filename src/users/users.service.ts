import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(userCreateDto: UserCreateDto){
        const user = await this.userRepository.findOne({
            where:{
                email: userCreateDto.email
            }
        })

        if(user){
            throw new HttpException(`User already registered!`, HttpStatus.CONFLICT);
        }

        const createUser = this.userRepository.create({email: userCreateDto.email, password: bcrypt.hashSync(userCreateDto.password, 8)})


        return await this.userRepository.save(createUser);
    }

    async findOne(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({where:{email:email}}); 

        if(!user){
            throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
          }
          
        return user
    }

    async remove(id:number){
        const user = await this.userRepository.findOne({where:{iduser: id}});

        if(!user){
            throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
          }

        return await this.userRepository.delete(user);
    }
}
