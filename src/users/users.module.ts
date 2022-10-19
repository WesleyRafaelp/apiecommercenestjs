import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService, JwtService,],
  controllers:[UsersController],
  exports:[ UsersService,]
})
export class UsersModule {}
