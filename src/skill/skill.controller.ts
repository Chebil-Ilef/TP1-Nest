/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/skill-create.dto';
import { UpdateSkillDto } from './dto/skill-update.dto';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto):Promise<Skill> {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  async findAll():Promise<Skill[]> {
    return this.skillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number):Promise<Skill> {
    return this.skillService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.skillService.remove(id);
  }
}