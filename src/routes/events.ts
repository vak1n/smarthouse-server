import express from 'express';
import fs from 'fs';
import createHttpError from 'http-errors';
import path from 'path';

const router = express.Router();

router.post('/', (req, res, next) => {
  const typesUsed = ['info', 'critical'];

  // проверяем передаваемый параметр type
  let types: string[] = [];
  if (req.body.type !== undefined) {
    types = req.body.type.split(':');
    for (const type of types) {
      if (!typesUsed.includes(type)) {
        return res.status(400).end('Incorrect type');
      }
    }
  }

  // проверяем передаваемый параметр offset
  const offset: number = parseInt(req.body.offset, 10);
  if (req.body.offset !== undefined && (isNaN(offset) || offset < 0)) {
    return res.status(400).end('Incorrect offset');
  }

  // проверяем передаваемый параметр limit
  const limit: number = parseInt(req.body.limit, 10);
  if (req.body.limit !== undefined && (isNaN(limit) || limit < 0)) {
    return res.status(400).end('Incorrect limit');
  }

  // читаем файл
  fs.readFile(path.resolve(__dirname) + '/../../db/events.json', 'utf-8', (err, data) => {
    if (err) {
      process.stdout.write(err.message);
      return next(createHttpError(500));
    }

    // фильтурем по тиму если нужно иначе отдаем все
    const json = JSON.parse(data);
    let events = [];
    if (types.length > 0) {
      events = json.events.filter(
        (event: {
          type: string;
          title: string;
          source: string;
          time: string;
          description: string;
          icon: string;
          data: object;
          size: string;
        }) => {
          return types.includes(event.type);
        },
      );
    } else {
      events = json.events;
    }

    // делаем срез если нужно
    if (offset > 0 || limit > 0) {
      const start = offset > 1 ? offset - 1 : 0;
      const end = limit > 0 ? start + limit : events.length;
      events = events.slice(start, end);
    }

    return res.json({ events });
  });
});

export default router;
