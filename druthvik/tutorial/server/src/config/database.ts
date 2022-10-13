import { ConnectionOptions } from 'typeorm';
import { User, Post, Comment } from '../models';
import { Student } from '../controllers/studentmanagement/studentsranking/model/student';
import { Subject } from '../controllers/studentmanagement/studentsranking/model/subject';
import { Mark } from '../controllers/studentmanagement/studentsranking/model/mark';
import { Product } from '../controllers/canbrowser/model/product';
import { Resources } from '../controllers/canbrowser/model/resource';
import { Tutorial } from '../models';
import { Category } from '../models';
import { userLogin } from '../models';
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'root',
  database: process.env.POSTGRES_DB || 'postgres',
  entities: [
    User,
    Post,
    Comment,
    Student,
    Subject,
    Mark,
    Product,
    Resources,
    Tutorial,
    Category,
    userLogin,
  ],
  synchronize: true,
};

export default config;
