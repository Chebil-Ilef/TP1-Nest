/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CvService } from '../cv/cv.service';
import { SkillService } from '../skill/skill.service';
import { CreateUserDto } from '../user/dto/user-create.dto';
import { CreateCvDto } from '../cv/dto/cv-create.dto';
import { CreateSkillDto } from '../skill/dto/skill-create.dto';
import {
  randFullName,
  randEmail,
  randPassword,
  randJobTitle,
  randNumber,
} from '@ngneat/falso';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UserService,
    private readonly cvService: CvService,
    private readonly skillService: SkillService,
  ) {}

  async seedUsers(count: number = 10) {
    for (let i = 0; i < count; i++) {
      const user = new CreateUserDto();
      user.username = randFullName();
      user.email = randEmail();
      user.password = randPassword();
      console.log(user);
      await this.userService.create(user);
    }
  }

  async seedSkills(count: number = 10) {
    for (let i = 0; i < count; i++) {
      const skillDto: CreateSkillDto = {
        designation: randJobTitle(),
      };
      await this.skillService.create(skillDto);
    }
  }

  async seedCvs(count: number = 10) {
    const userIds = await this.generateUserIds(count);
    const skillIds = await this.generateSkillIds(count);

    for (let i = 0; i < count; i++) {
      const cvDto: CreateCvDto = {
        name: randFullName(),
        firstname: randFullName(),
        age: randNumber({ min: 20, max: 50 }),
        cin: `A${randNumber({ min: 100000, max: 999999 })}`,
        job: randJobTitle(),
        path: `cv-${i}.pdf`,
        userId: userIds[randNumber({ min: 0, max: userIds.length - 1 })],
        skillsIds: skillIds,
        
      };
      await this.cvService.create(cvDto);
    }
  }

  async generateUserIds(count: number): Promise<number[]> {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  async generateSkillIds(count: number): Promise<number[]> {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
}