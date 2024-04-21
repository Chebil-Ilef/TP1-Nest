/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindCvsDto {
    @IsOptional()
    @IsString()
    critere: string;
    
    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    readonly age: number;
  }