/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/skill-create.dto';
import { UpdateSkillDto } from './dto/skill-update.dto';

@Injectable()
export class SkillService {
constructor(@InjectRepository(Skill)
  private skillRepository : Repository<Skill> ){}
  
  async create(newSkill: CreateSkillDto):Promise<Skill> {
    console.log(newSkill);

    return await this.skillRepository.save(newSkill);;
  }

  async findAll():Promise<Skill[]> {
    return this.skillRepository.find();
  }
  
  async findOne(id: number) :Promise<Skill> {
    const skill=await this.skillRepository.findOne({where: {id}});
    if (!skill){
      throw new NotFoundException(`le skill d'id ${id} n'existe pas` );
   }
   return skill;
  }
  async update(id: number, updatedskill:UpdateSkillDto): Promise<Skill> {
    const  newSkill = await this.skillRepository.preload({id,...updatedskill,});
    if (newSkill) {
      return this.skillRepository.save(newSkill);
    } else {
      throw new NotFoundException('skill innexistant');
    }
}
 
  async remove(id: number) {
    
        return await this.skillRepository.softDelete(id);
}

async restoreSkill(id: number) {
  return await this.skillRepository.restore(id);
}
}