import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './modules/users/users.module';
import { CurrentUserMiddleware } from './utility/middwares/current-user.middleware';
import { CategoriesModule } from './modules/categories/categories.module';
import path from 'path';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, CategoriesModule, ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
