import { Module } from '@nestjs/common';
import { CustomersModule } from './modules/customers/customers.module';
import { AuthModule } from './modules/auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { HomeModule } from './modules/home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ProductsModule } from './modules/products/products.module';
import { AddressesModule } from './modules/addresses/addresses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    CustomersModule,
    AuthModule,
    HomeModule,
    ProductsModule,
    AddressesModule,
  ],
})
export class AppModule {}
