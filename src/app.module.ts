/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import * as dotenv from 'dotenv';
import { SeedModule } from './commands/seed.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SseModule } from './sse/sse.module';
import { CvHistoryModule } from './cv-history/cv-history.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    CvModule,
    SkillModule,
    UserModule,
    SeedModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    EventEmitterModule.forRoot(),
    SseModule,
    CvHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
