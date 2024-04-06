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
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/cv-create.dto';
import { UpdateCvDto } from './dto/cv-update.dto';
import { FindCvsDto } from './dto/find-cvs.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('v2/cv')
export class CvControllerV2 {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto, @Request() req) {
    const updatedCreateCvDto = { ...createCvDto, userId: req.user.userId };
    console.log(req.user.userId);
    return this.cvService.create(updatedCreateCvDto);
  }

  @Get('find')
  async findByAgeCritere(@Query() critere: FindCvsDto): Promise<Cv[]> {
    console.log(critere);
    return this.cvService.findByAgeCritere(critere);
  }

  @Get('/pagination')
  findAllPaginated(@Query() paginationQuery: PaginationQueryDto) {
    return this.cvService.findAllPaginated(paginationQuery);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cvService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @Request() req,
  ): Promise<Cv> {
    const cv = await this.cvService.findOne(+id);
    if (cv.user.id === req.user.userId) {
      return await this.cvService.update(+id, updateCvDto);
    } else {
      throw new ForbiddenException(
        `Le CV #${id} n'a pas été trouvé ou vous n'avez pas le droit de le modifier`,
      );
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const cv = await this.cvService.findOne(+id);
    if (cv.user.id === req.user.userId) {
      return await this.cvService.softDeleteCv(id);
    } else {
      throw new ForbiddenException(
        `Le CV #${id} n'a pas été trouvé ou vous n'avez pas le droit de le modifier`,
      );
    }
  }

  @Get('restore/:id')
  async restoreUser(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const cv = await this.cvService.findOne(+id);
    if (cv.user.id === req.user.userId) {
      return await this.cvService.restoreCv(id);
    } else {
      throw new ForbiddenException(
        `Le CV #${id} n'a pas été trouvé ou vous n'avez pas le droit de le modifier`,
      );
    }
  }
}
