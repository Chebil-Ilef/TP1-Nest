/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UserController],
  providers: [UserService, AdminGuard],
  //ajouté pour l'exportation du service, pour pouvoir l'utiliser dans d'autres modules
  // tq le module seed
  exports: [ UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
