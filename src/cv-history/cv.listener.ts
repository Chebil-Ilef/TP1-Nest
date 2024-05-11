import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEnum } from '../cv/enum/event.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { CvHistory } from './entities/cv-history.entity';
import { Repository } from 'typeorm';
import { CvHistoryDto } from './dto/create-cv-history.dto';
import { SseService } from 'src/sse/sse.service';

@Injectable()
export class CvListener {
  constructor(
    @InjectRepository(CvHistory)
    private cvHistoryRepository: Repository<CvHistory>,
    private sseService: SseService,
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
    try {
      this.sseService.sendToAdmins({
        actionType: type,
        data: payload,
      });

      this.sseService.sendToSpecificUser(payload.userId, {
        actionType: type,
        data: payload,
      });
    } catch (error) {
      console.log('Something went wrong !!');
      console.log(error);
    }

    let result = await this.cvHistoryRepository.save({
      type,
      userId: payload.userId,
      cvId: payload.cv.id,
    });

    return result;
  }
}
