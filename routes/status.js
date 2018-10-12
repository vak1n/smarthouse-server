const express = require('express');
const router = express.Router();
const {performance} = require('perf_hooks');
const moment = require('moment');

router.get('/', (req, res, next) => {
  const duration = Math.round(performance.nodeTiming.duration);
  return res.send(moment().hours(24).minutes(0).seconds(0).milliseconds(duration).format('HH:mm:ss'));
});

module.exports = router;
