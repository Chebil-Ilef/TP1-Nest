/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
   
    @IsString()
    @IsNotEmpty()
    username:string;
    
    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsStrongPassword()
    @IsNotEmpty()
    password:string;

}