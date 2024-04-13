/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
      ) {}
      
      async register(registerAuthDto: UserRegisterDto): Promise<void> {
        const { username, password } = registerAuthDto;
    
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
    
        try {
          await this.userRepository.save(user);
        } catch (error) {
          if (error.code === '23505') {
            throw new ConflictException('Username already taken');
          } else {
            throw new InternalServerErrorException();
          }
        }
      }



      async login(credentials: UserLoginDto) {
        const { username, password } = credentials;
        // We can log in via username or email
        const user = await this.userRepository.createQueryBuilder("user")
          .where("user.username = :username or user.email = :username",{ username: username })
          .getOne();
        console.log(username);
        if (!user)
          throw new NotFoundException('Wrong username or password');
      
        // Check password if user exists
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const payload = {
                username: user.username,
                email: user.email,
                role: user.role
              };
              const jwt = await this.jwtService.sign(payload);
              return {
                "access_token" : jwt
              };
        } else {
          // If password is wrong
          throw new NotFoundException('Wrong username or password');
        }
      }
      private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
      }
 }

