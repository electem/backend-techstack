/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import Router from './routes';
import dbConfig from './config/database';

const PORT = process.env.PORT || 8000;
const app: Application = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = express.Router();
const cors = require('cors');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const corsOptions = {
  origin: 'http://localhost:8000',
};

app.use(cors());

true;

app.use(
  '/docs',

  swaggerUi.serve,

  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  }),
);

app.use(Router);

createConnection(dbConfig)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  })

  .catch((err) => {
    console.log('Unable to connect to db', err);

    process.exit(1);
  });
