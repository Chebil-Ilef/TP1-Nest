/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { CvModule } from '../cv/cv.module';
import { SkillModule } from '../skill/skill.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CvModule, SkillModule, UserModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}


