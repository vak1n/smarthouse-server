const express = require('express');
const fs = require('fs');
const router = express.Router();
const createError = require('http-errors');

router.post('/', (req, res, next) => {

  // проверяем передаваемый post параметр type
  const type = req.body.type;
  if (type !== undefined && ['info', 'critical'].indexOf(type) === -1) {
    return res.status(400).end('Incorrect type')
  }

  // проверяем передаваемый параметр begin
  const begin = parseInt(req.body.begin);
  if (req.body.begin !== undefined && (isNaN(begin) || begin < 0)) {
    return res.status(400).end('Incorrect begin')
  }

  // проверяем передаваемый параметр limit
  const limit = parseInt(req.body.limit);
  if (req.body.limit !== undefined && (isNaN(limit) || limit < 0)) {
    return res.status(400).end('Incorrect limit')
  }

  // читаем файл
  fs.readFile(__dirname + '/../db/events.json', 'utf-8', function (err, content) {
    if (err) {
      console.error(err);
    }

    // фильтурем по тиму если нужно иначе отдаем все
    const json = JSON.parse(content);
    let events = [];
    switch (type) {
      case 'info':
        events = json.events.filter((el) => {
          return (el['type'] === 'info');
        });
        break;
      case 'critical':
        events = json.events.filter((el) => {
          return (el['type'] === 'critical');
        });
        break;
      default:
        events = events = json.events;
    }

    // отдаем срез если нужно
    if (begin > 0 || limit > 0) {
      const start = begin > 1 ? begin - 1 : 0;
      const end = limit > 0 ? start + limit : events.length;
      events = events.slice(start, end);
    }

    // позволяем cross-origin resource sharing (CORS) для обращения с сервису с других доменов
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return res.json({"events": events});
  });


});

module.exports = router;
