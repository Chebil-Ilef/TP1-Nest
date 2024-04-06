/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateSkillDto } from './skill-create.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
@IsOptional()
 @IsString()
 designation:string;
}