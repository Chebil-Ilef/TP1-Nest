import { Module } from '@nestjs/common';
import { CvHistoryService } from './cv-history.service';
import { CvHistoryController } from './cv-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvHistory } from './entities/cv-history.entity';
import { CvListener } from './cv.listener';
import { SseModule } from 'src/sse/sse.module';

@Module({
  imports: [TypeOrmModule.forFeature([CvHistory]), SseModule],
  controllers: [CvHistoryController],
  providers: [CvHistoryService, CvListener],
  exports: [CvListener],
})
export class CvHistoryModule {}
