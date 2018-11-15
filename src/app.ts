import bodyParser from 'body-parser';
import express from 'express';
import createHttpError, {HttpError} from 'http-errors';

const app = express();

import eventsRouter from './routes/events';
import statusRouter from './routes/status';
import videosRouter from './routes/videos';

app.use(bodyParser.urlencoded({extended: true}));
app.use('/status', statusRouter);
app.use('/api/events', eventsRouter);
app.use('/api/videos', videosRouter);

// по умолчанию ставим 404 статус
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    return next(createHttpError(404));
});

// обработка ошибок
app.use((err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  process.stdout.write(err.message);
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
