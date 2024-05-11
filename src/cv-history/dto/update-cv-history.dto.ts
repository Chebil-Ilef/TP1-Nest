import { PartialType } from '@nestjs/mapped-types';
import { CvHistoryDto } from './create-cv-history.dto';

export class UpdateCvHistoryDto extends PartialType(CvHistoryDto) {}
