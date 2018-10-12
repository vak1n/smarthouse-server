const express = require('express');
const fs = require('fs');
const router = express.Router();
const createError = require('http-errors');

router.post('/', (req, res, next) => {
  const type = req.body.type;
  if (type !== undefined && ['info', 'critical'].indexOf(type) === -1) {
    return res.status(400).end('Incorrect type')
  }

  fs.readFile(__dirname + '/../db/events.json', 'utf-8', function (err, content) {
    if (err) {
      console.error(err);
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
