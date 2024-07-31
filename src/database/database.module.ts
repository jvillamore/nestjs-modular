import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'config';

const API_KEY = '21345456';

@Global()
@Module({
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
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
