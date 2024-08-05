import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'my_db',
  logging: true,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
};
const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
