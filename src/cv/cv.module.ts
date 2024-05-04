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
import { CvListener } from './cv.listener';
import { CvHistory } from './entities/cv_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cv, CvHistory]), JwtModule, UserModule],
  controllers: [CvController, CvControllerV2],
  providers: [CvService, AdminGuard, UserService, CvListener],
  //ajouté pour l'exportation du service, pour pouvoir l'utiliser dans d'autres modules
  // tq le module seed
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
