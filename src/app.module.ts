import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmProdConfig } from './app.dbconfig';
import { AuthModule } from './auth/auth.module';
import configuration from './common/configuration';
import { GlobalModule } from './global/global.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      ...createTypeOrmProdConfig(),
    }),
    UserModule,
    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
