const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const uptime = Math.round(process.uptime());
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(uptime);
  return res.send(date.toLocaleTimeString({hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"}));
});

module.exports = router;
