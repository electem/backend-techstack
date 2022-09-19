import { ConnectionOptions } from 'typeorm';
import { Panel } from '../models';
import { Test } from '../models';
import { Report } from '../models';
import { ReportPanelTest } from '../models';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'root',
  database: process.env.POSTGRES_DB || 'report',
  entities: [Panel, Test, Report, ReportPanelTest],
  synchronize: true,
};

export default config;
