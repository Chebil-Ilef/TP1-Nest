/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/cv-create.dto';
import { UpdateCvDto } from './dto/cv-update.dto';
import { FindCvsDto } from './dto/find-cvs.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto): Promise<Cv> {
    return await this.cvService.create(createCvDto);
  }
  @Get('find')
  async findByAgeCritere(@Query() critere: FindCvsDto): Promise<Cv[]> {
    console.log(critere);
    return this.cvService.findByAgeCritere(critere);
  }

  @Get()
  async findAll(): Promise<Cv[]> {
    return await this.cvService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cvService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
  ): Promise<Cv> {
    return await this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.softDeleteCv(id);
  }

  @Get('restore/:id')
  async restoreUser(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.restoreCv(id);
  }
}
