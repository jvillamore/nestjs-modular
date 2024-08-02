import { registerAs } from '@nestjs/config';
export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      database: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    mysql: {
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: parseInt(process.env.MYSQL_PORT),
      host: process.env.MYSQL_HOST,
    },
    apikey: process.env.API_KEY,
    configuration: process.env.CONFIGURATION,
  };
});
