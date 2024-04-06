/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './user-create.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    username:string;
    
    
    @IsEmail()
    @IsOptional()
    email:string;
    
    
    @IsString()
    @IsOptional()
    password:string;
}