const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const app = express();

const statusRouter = require('./routes/status');
const eventsRouter = require('./routes/events');

app.use(bodyParser.urlencoded({extended: true}));
app.use('/status', statusRouter);
app.use('/api/events', eventsRouter);

// по умолчанию ставим 404 статус
app.use(function (req, res, next) {
  next(createError(404));
});

// обработка ошибок
app.use(function (err, req, res, next) {
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
  console.log(`App listening on port ${port}!`);
});