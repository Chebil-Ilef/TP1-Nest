/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards} from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/skill-create.dto';
import { UpdateSkillDto } from './dto/skill-update.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('skill')
@UseGuards(JWTAuthGuard)
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
  findOne(@Param('id', ParseIntPipe) id: number):Promise<Skill> {
    return this.skillService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.skillService.remove(id);
  }

  @Get('restore/:id')
  async restoreUser(@Param('id', ParseIntPipe) id: number) {
  return await this.skillService.restoreSkill(id);
}
}