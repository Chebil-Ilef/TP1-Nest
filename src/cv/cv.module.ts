/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { CvControllerV2 } from './cv.controllerV2';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Cv])],
  controllers: [CvController, CvControllerV2],
  providers: [CvService],
  //ajouté pour l'exportation du service, pour pouvoir l'utiliser dans d'autres modules
  // tq le module seed
  exports: [CvService, TypeOrmModule.forFeature([Cv])],
})
export class CvModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes({ path: 'v2/cv', method: RequestMethod.DELETE });
    }
}

