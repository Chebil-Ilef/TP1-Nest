/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSkillDto {
    @IsString()
    @IsNotEmpty()
    designation:string;
}