/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindCvsDto {
    @IsOptional()
    @IsString()
    critere: string;
    
    @IsOptional()
    @IsNumber()
    readonly age: number;
  }