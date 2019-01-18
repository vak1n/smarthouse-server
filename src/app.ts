import cors from 'cors';
import express from 'express';
import createHttpError, { HttpError } from 'http-errors';

const app = express();

import { MongoError } from 'mongodb';
import mongoose from 'mongoose';
import eventsRouter from './routes/events';
import statusRouter from './routes/status';
import storeRouter from './routes/store';
import videosRouter from './routes/videos';

mongoose.Promise = global.Promise;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://smarthouse:smarthouse@localhost:27017/smarthouse';

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true },
  (err: MongoError) => {
    if (err) {
      process.stdout.write('\n' + err.message);
      return;
    }
  },
);

app.use(cors());
app.use('/status', statusRouter);
app.use('/api/events', eventsRouter);
app.use('/api/videos', videosRouter);
app.use('/store', storeRouter);

// по умолчанию ставим 404 статус
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  return next(createHttpError(404));
});

// обработка ошибок
app.use((err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  process.stdout.write('\n' + err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  if (err.status === 404) {
    res.end('<h1>Page not found</h1>');
  }
  res.end('<h1>Internal Server Error</h1>');
});

const port = process.env.PORT || '8000';
app.listen(port, () => {
  process.stdout.write(`App listening on port ${port}!`);
});
