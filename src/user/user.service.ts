/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async create(newUser: CreateUserDto):Promise<User> {
    return await this.userRepository.save(newUser);
  }

  async findAll():Promise<User[]> {
    return await this.userRepository.find();
  }
  
  async findOne(id: number) :Promise<User> {
    const user=await this.userRepository.findOne({where: {id}});
    if (!user){
      throw new NotFoundException(`le user d'id ${id} n'existe pas` );
   }
   return await user;
  }

  async update(id: number, updatedUser:UpdateUserDto): Promise<User> {
    const  newUser = await this.userRepository.preload({id,...updatedUser,});
    if (newUser) {
      return await this.userRepository.save(newUser);
    } else {
      throw new NotFoundException('user inexistant');
    }
}
 
async softDeleteUser(id: number) {
  console.log(id);
  return await this.userRepository.softDelete(id);
}

 async restoreUser(id: number) {
  return await this.userRepository.restore(id);
}

async findUserByEmail(email: string){
  return await this.userRepository.findOne({where: {email}});
}
}