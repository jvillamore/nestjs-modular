import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as Joi from 'joi';
import { Client } from 'pg';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from 'enviroments';
import config from 'config';

const client = new Client({
  host: 'localhost',
  port: 5433,
  database: 'my_db',
  user: 'postgres',
  password: 'postgres',
});
client.connect();
client.query('SELECT * FROM tasks', (err, res) => {
  console.log(err);
  console.log(res.rows);
});
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || enviroments.dev,
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
    HttpModule,
  ],

  controllers: [AppController],
  exports: ['TASKS'],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
