/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/cv-create.dto';
import { UpdateCvDto } from './dto/cv-update.dto';
import { FindCvsDto } from './dto/find-cvs.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class CvService {
constructor(@InjectRepository(Cv)
  private cvRepository : Repository<Cv> ){}
  
  async create(newCv: CreateCvDto) {
   /* const cv = new Cv();
    cv.name = newCv.name;
    cv.firstname = newCv.firstname;
    cv.age = newCv.age;
    cv.cin = newCv.cin;
    cv.job = newCv.job;
    cv.path = newCv.path;
    cv.user = { id: newCv.userId } as any;
    cv.skills = newCv.skillsIds.map((id) => ({ id } as any));
    console.log(cv);*/
    return await this.cvRepository.save(newCv);
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
 
async softDeleteCv(id: number) {
  console.log(id);
  return await this.cvRepository.softDelete(id);
}

 async restoreCv(id: number) {
  return await this.cvRepository.restore(id);
}

async findByAgeCritere(critereChoix: FindCvsDto) {
  console.log(critereChoix);
  const { age, critere } = critereChoix;

  return await this.cvRepository.createQueryBuilder('cv')
  .where('cv.name LIKE :critere', { critere: `%${critere}%` })
  .orWhere('cv.firstname LIKE :critere', { critere: `%${critere}%` })
  .orWhere('cv.job LIKE :critere', { critere: `%${critere}%` })
  .orWhere('cv.age = :age', { age: age })
  .getRawMany();

 /*  return this.cvRepository.find({
    where: [
      { name: Like(%${critere}%) },
      { firstname: Like(%${critere}%) },
      { job: Like(%${critere}%) },
      { age: age },
    ],
  });*/
}

async findAllPaginated(paginationQuery: PaginationQueryDto): Promise<any> {
  const { page = 1, limit = 10 } = paginationQuery;
  const [results, total] = await this.cvRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    data: results,
    total,
    page,
    limit,
  };
}

  }
