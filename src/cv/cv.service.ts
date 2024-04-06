/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/cv-create.dto';
import { UpdateCvDto } from './dto/cv-update.dto';

@Injectable()
export class CvService {
constructor(@InjectRepository(Cv)
  private cvRepository : Repository<Cv> ){}
  
  async create(newCv: CreateCvDto) {
    return await this.cvRepository.save(newCv);;
  }

  async findAll():Promise<Cv[]> {
    return this.cvRepository.find();
  }
  
  async findOne(id: number) :Promise<Cv> {
    const cv=await this.cvRepository.findOne({where: {id}});
    if (!cv){
      throw new NotFoundException(`le cv d'id ${id} n'existe pas` );
   }
   return cv;
  }
  async update(id: number, updatedcv:UpdateCvDto): Promise<Cv> {
    const  newCv = await this.cvRepository.preload({
        id: id,
        ...updatedcv});
    if (newCv) {
      return this.cvRepository.save(newCv);
    } else {
      throw new NotFoundException('cv innexistant');
    }
}
 
  async remove(id: number) :Promise<Cv> {
    const cvToDelete=await this.cvRepository.findOne({where:{id}});
        if(!cvToDelete){
            throw new NotFoundException("Le cv d'id ${id} n'existe pas");
        }
    
            return await this.cvRepository.remove(cvToDelete);
    }
  }