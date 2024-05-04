import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEnum } from './enum/event.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { CvHistory } from './entities/cv_history.entity';
import { Repository } from 'typeorm';
import { CvHistoryDto } from './dto/cv-history.dto';

@Injectable()
export class CvListener {
  constructor(
    @InjectRepository(CvHistory)
    private cvHistoryRepository: Repository<CvHistory>,
  ) {}

  @OnEvent(EventEnum.CV_CREATED)
  async handleCvCreated(payload: any) {
    return await this.createCvHistory('CREATE', payload);
  }

  @OnEvent(EventEnum.CV_UPDATED)
  async handleCvUpdate(payload: any) {
    return await this.createCvHistory('UPDATE', payload);
  }

  @OnEvent(EventEnum.CV_DELETED)
  async handleCvDelete(payload: any) {
    return await this.createCvHistory('DELETE', payload);
  }

  async createCvHistory(type: string, payload: any) {
    console.log('Creating CV History');

    // const cvHistory = this.cvHistoryRepository.create({
    //   type,
    //   user: { id: payload.userId },
    //   cv: { id: payload.cvId },
    // });

    return this.cvHistoryRepository.save({
      type,
      userId: payload.userId,
      cvId: payload.cv.id,
    });
  }
}
