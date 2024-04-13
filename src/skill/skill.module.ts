/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), JwtModule],
  controllers: [SkillController],
  providers: [SkillService],
  //ajouté pour l'exportation du service, pour pouvoir l'utiliser dans d'autres modules
  // tq le module seed
  exports: [SkillService, TypeOrmModule.forFeature([Skill])],
})
export class SkillModule {}
