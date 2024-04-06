/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CvModule } from '../cv/cv.module';
import { SkillModule } from '../skill/skill.module';
import { SeedService } from './seed.service';

@Module({
  imports: [CvModule, SkillModule, UserModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}

