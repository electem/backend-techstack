import {ConnectionOptions} from 'typeorm'
import {User, Post, Comment, Product, Resource, Tutorials,Category, Question,Employee,Company,Games,Player,LoginUser} from '../models'

const config : ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "cybis@ban",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [User, Post, Comment, Product, Resource, Tutorials, Category, Question,Employee,Company,Games,Player,LoginUser],
  synchronize: true,
}

export default config