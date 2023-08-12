import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  synchronize: false,
  url: `${process.env.DATABASE_DSN}`,
  autoLoadEntities: true,
  database: 'postgres',
  schema: 'public',
  logging: `${process.env.DATABASE_LOGGING} === 1`,
  migrations: ['migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
