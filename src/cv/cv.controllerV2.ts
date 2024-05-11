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
  UseInterceptors,
  HttpStatus,
  UploadedFile,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/cv-create.dto';
import { UpdateCvDto } from './dto/cv-update.dto';
import { FindCvsDto } from './dto/find-cvs.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer-config';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UserDec } from '../user-dec/user-dec.decorator';
import { UserService } from '../user/user.service';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('v2/cv')
export class CvControllerV2 {
  constructor(
    private readonly cvService: CvService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @UseGuards(JWTAuthGuard)
  async create(
    @Body() createCvDto: CreateCvDto,
    @Request() req,
    @UploadedFile() file,
  ) {
    if (!file) {
      throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
    }
    console.log(file);
    const updatedCreateCvDto = { ...createCvDto, userId: req.userId };

    console.log(req.user.userId);

    const cvCreated = await this.cvService.create(
      updatedCreateCvDto,
      req.user.userId,
      file.path,
    );

    return cvCreated;
  }

  @Post('/dec')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createDec(
    @Body() createCvDto: CreateCvDto,
    @UserDec() user,
    @UploadedFile() file,
  ) {
    if (!file) {
      throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
    }
    console.log(file);
    const userFound = await this.userService.findUserByEmail(user.email);
    const updatedCreateCvDto = { ...createCvDto, userId: userFound.id };
    console.log(userFound);

    return this.cvService.create(updatedCreateCvDto, user.id, file.path);
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

  @Get('/connecte')
  @UseGuards(JWTAuthGuard)
  async findCvConn(@UserDec() user) {
    console.log(user);
    return await this.cvService.findCvCnx(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cvService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @Request() req,
  ) {
    const cv = await this.cvService.findOne(+id);
    return await this.cvService.update(+id, updateCvDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Request() req) {
    console.log(req.userId);
    const cv = await this.cvService.findOne(+id);

    return await this.cvService.softDeleteCv(id, req.user.userId);
  }

  @Get('restore/:id')
  async restoreUser(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const cv = await this.cvService.findOne(+id);

    if (cv.user.id === req.userId) {
      return await this.cvService.restoreCv(id);
    } else {
      throw new ForbiddenException(
        `Le CV #${id} n'a pas été trouvé ou vous n'avez pas le droit de le modifier`,
      );
    }
  }

  @Patch('upload/:id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadFile(@Param('id') id: number, @UploadedFile() file) {
    if (!file) {
      throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
    }

    const savedFile = await this.cvService.attachImagePath(id, file.path);
    console.log(savedFile);
    return {
      message: 'File uploaded successfully',
      data: savedFile,
    };
  }
}
