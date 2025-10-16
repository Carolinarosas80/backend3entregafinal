import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { setupSwagger } from './config/swagger.js';
import usersRouter from './routes/users.router.js';
import adoptionRouter from './routes/adoption.router.js';
import petsRouter from './routes/pets.router.js';
import logger from './config/logger.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/users', usersRouter);
app.use('/adoptions', adoptionRouter);
app.use('/pets', petsRouter);

setupSwagger(app);

app.get('/', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';
const dbName = env === 'test' ? (process.env.TEST_DB_NAME || process.env.DB_NAME + '_test') : process.env.DB_NAME;
const uri = process.env.DB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${dbName}?retryWrites=true&w=majority`;

if (env !== 'test') {
  mongoose.connect(uri)
    .then(() => {
      logger.info('DB connected');
      app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
    })
    .catch(err => {
      logger.error('DB connection error', err);
      process.exit(1);
    });
}

export default app;
