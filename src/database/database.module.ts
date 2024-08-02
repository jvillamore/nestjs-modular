import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '21345456';

@Global()
@Module({
  imports: [
    //Consiguración para postgres
    TypeOrmModule.forRootAsync({
      // 👈 use TypeOrmModule
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, database, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    // Configuración con MySQL
    /*
    TypeOrmModule.forRootAsync({
      // 👈 use TypeOrmModule
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, database, password, port } = configService.mysql;
        console.log(configService.mysql);
        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    */
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        //console.log(configService);
        const { user, host, database, password, port } = configService.postgres;
        const client = new Client({
          host,
          port,
          database,
          user,
          password,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
      // Ejemplo con useValue
      //useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
