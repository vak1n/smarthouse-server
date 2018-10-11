const express = require('express');
const fs = require('fs');
const router = express.Router();
const createError = require('http-errors');

router.get('/', (req, res, next) => {
  fs.readFile(__dirname + '/../db/events.json', 'utf-8', function (err, content) {
    if (err) {
      console.error(err);
    }
    const type = req.query.type;
    if (type !== undefined && ['info', 'critical'].indexOf(type) === -1) {
      return res.status(400).end('Incorrect type')
    }

    const json = JSON.parse(content);

    switch (type) {
      case 'info':
        return res.json(json.events.filter((el) => {
          return (el['type'] === 'info');
        }));
      case 'critical':
        return res.json(json.events.filter((el) => {
          return (el['type'] === 'critical');
        }));
      default:
        return res.json(json);
    }
  });
});

module.exports = router;
