import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
  return {
    host: 'postgres',
    type: 'postgres',
    username: 'admin',
    password: 'postgres',
    database: 'testdb',
    entities: [join(__dirname, '**', '*.entity.{ts, js}')],
    synchronize: true,
    autoLoadEntities: true,
  };
}
