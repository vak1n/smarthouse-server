const express = require('express');
const fs = require('fs');
const router = express.Router();
const createError = require('http-errors');

router.post('/', (req, res, next) => {
  const typesUsed = ['info', 'critical'];

  // проверяем передаваемый параметр type
  let types = [];
  if (req.body.type !== undefined) {
    types = req.body.type.split(':');
    if (types.length === 1) {
      if (typesUsed.indexOf(types[0]) === -1) {
        return res.status(400).end('Incorrect type');
      }
    } else {
      for (let i = 0; i < types.length; i++) {
        if (typesUsed.indexOf(types[i]) === -1) {
          return res.status(400).end('Incorrect type');
        }
      }
    }
  }

  // проверяем передаваемый параметр begin
  const offset = parseInt(req.body.offset);
  if (req.body.offset !== undefined && (isNaN(offset) || offset < 0)) {
    return res.status(400).end('Incorrect offset')
  }

  // проверяем передаваемый параметр limit
  const limit = parseInt(req.body.limit);
  if (req.body.limit !== undefined && (isNaN(limit) || limit < 0)) {
    return res.status(400).end('Incorrect limit')
  }

  // читаем файл
  fs.readFile(__dirname + '/../db/events.json', 'utf-8', function (err, data) {
    if (err) {
      console.error(err);
      return next(createError(500))
    }

    // фильтурем по тиму если нужно иначе отдаем все
    const json = JSON.parse(data);
    let events = [];
    if (types.length > 0) {
      events = json.events.filter((event) => {
        return types.indexOf(event['type']) > -1;
      });
    } else {
      events = json.events;
    }

    // отдаем срез если нужно
    if (offset > 0 || limit > 0) {
      const start = offset > 1 ? offset - 1 : 0;
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
