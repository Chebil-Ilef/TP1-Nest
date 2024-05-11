/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Like, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/cv-create.dto';
import { UpdateCvDto } from './dto/cv-update.dto';
import { FindCvsDto } from './dto/find-cvs.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { User } from 'src/auth/entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(newCv: CreateCvDto, userId: number, path: string) {
    const cv = new Cv();
    cv.name = newCv.name;
    cv.firstname = newCv.firstname;
    cv.age = newCv.age;
    cv.job = newCv.job;
    cv.cin = newCv.cin;
    cv.userId = userId;
    cv.path = path;

    const savedCv = await this.cvRepository.save(cv);
    if (savedCv) {
      this.eventEmitter.emit('cv.created', {
        cv: savedCv,
        userId,
      });
    }
    return savedCv;
  }

  async findAll(): Promise<Cv[]> {
    return this.cvRepository.find();
  }

  async findOne(id: number): Promise<Cv> {
    const cv = await this.cvRepository.findOne({ where: { id } });
    if (!cv) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return cv;
  }

  async update(
    id: number,
    updatedcv: UpdateCvDto,
    userId: number,
  ): Promise<Cv> {
    const newCv = await this.cvRepository.preload({
      id: id,
      ...updatedcv,
    });
    if (newCv) {
      this.eventEmitter.emit('cv.updated', {
        cv: newCv,
        userId,
      });
      return this.cvRepository.save(newCv);
    } else {
      throw new NotFoundException('cv innexistant');
    }
  }

  async softDeleteCv(id: number, userId: number): Promise<UpdateResult> {
    const cv = await this.cvRepository.findOneBy({ id });
    const updateResult = await this.cvRepository.softDelete(id);
    this.eventEmitter.emit('cv.deleted', {
      cv,
      userId,
    });
    return updateResult;
  }

  async restoreCv(id: number) {
    return await this.cvRepository.restore(id);
  }

  async findByAgeCritere(critereChoix: FindCvsDto) {
    console.log(critereChoix);
    const { age, critere } = critereChoix;

    return await this.cvRepository
      .createQueryBuilder('cv')
      .where('cv.name LIKE :critere', { critere: `%${critere}%` })
      .orWhere('cv.firstname LIKE :critere', { critere: `%${critere}%` })
      .orWhere('cv.job LIKE :critere', { critere: `%${critere}%` })
      .orWhere('cv.age = :age', { age: age })
      .getRawMany();
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

  async attachImagePath(id: number, path: string): Promise<Cv> {
    const cv = await this.cvRepository.findOneOrFail({ where: { id } });
    cv.path = path;

    return this.cvRepository.save(cv);
  }

  async findCvCnx(user: User) {
    console.log(user);
    if (user.role == 'admin') return this.cvRepository.find();
    return this.cvRepository.find({ where: { user: { id: user.id } } });
  }
}
