import {ConnectionOptions} from 'typeorm'
import {  Panel,Test ,Report} from '../models'

const config : ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "cybis@ban",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [Panel,Test,Report],
  synchronize: true,
}

export default config