import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  const uptime = Math.round(process.uptime());
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(uptime);
  return res.send(date.toLocaleTimeString(
    undefined,
    {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"}
  ));
});

export default router;
