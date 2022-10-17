import {ConnectionOptions} from 'typeorm'
import {User} from '../models'
import { CustomerGroup } from '../models'
import {Customer} from '../models'

const config : ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "cybis@ban",
  database: process.env.POSTGRES_DB || "customer",
  entities: [User,CustomerGroup,Customer],
  synchronize: true,
}

export default config