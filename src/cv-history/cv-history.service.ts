import { Injectable } from '@nestjs/common';
import { CvHistoryDto } from './dto/create-cv-history.dto';
import { UpdateCvHistoryDto } from './dto/update-cv-history.dto';

@Injectable()
export class CvHistoryService {
  create(createCvHistoryDto: CvHistoryDto) {
    return 'This action adds a new cvHistory';
  }

  findAll() {
    return `This action returns all cvHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cvHistory`;
  }

  update(id: number, updateCvHistoryDto: UpdateCvHistoryDto) {
    return `This action updates a #${id} cvHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} cvHistory`;
  }
}
