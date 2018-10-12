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

  // проверяем передаваемый post параметр page
  const page = parseFloat(req.body.page);
  if (typeof page !== "number") {
    return res.status(400 ).end('Incorrect page')
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

    // отдаем по страницам если нужно
    if (page > 0) {
      const count = 3;
      const start = page > 1 ? (page - 1) * count : 0;
      const end = start + 3;
      events = events.slice(start, end)
    }

    // позволяем cross-origin resource sharing (CORS) для обращения с сервису с других доменов
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return res.json({"events": events});
  });


});

module.exports = router;
