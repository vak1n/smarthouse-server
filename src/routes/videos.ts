import express from 'express';
import fs from 'fs';
import createHttpError from 'http-errors';
import path from 'path';

const router = express.Router();

router.post('/', (req, res, next) => {
  // читаем файл
  fs.readFile(path.resolve(__dirname) + '/../../db/videos.json', 'utf-8', (err, data) => {
    if (err) {
      process.stdout.write('\n' + err.message);
      return next(createHttpError(500));
    }

    // отдаем json
    const json = JSON.parse(data);
    return res.json(json);
  });
});

export default router;
