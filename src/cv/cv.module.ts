/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { CvControllerV2 } from './cv.controllerV2';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { CvHistoryModule } from 'src/cv-history/cv-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cv]),
    JwtModule,
    UserModule,
    CvHistoryModule,
  ],
  controllers: [CvController, CvControllerV2],
  providers: [CvService, AdminGuard, UserService],

  exports: [CvService, TypeOrmModule.forFeature([Cv])],
})
export class CvModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes
      //{ path: 'v2/cv/*', method: RequestMethod.PATCH },
      //{ path: 'v2/cv/*', method: RequestMethod.POST },
      //{ path: 'v2/cv/*', method: RequestMethod.DELETE },
      ();
  }
}
