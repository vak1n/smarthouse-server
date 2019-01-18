import bodyParser from 'body-parser';
import express from 'express';
import { MongoError } from 'mongodb';
import mongoose, { MongooseDocument } from 'mongoose';

import IEventData from '../interfaces/IEventData';
import IItemMenuData from '../interfaces/IItemMenuData';
import IVideoData from '../interfaces/IVideoData';
import { StoreSchema } from '../schemas/stores';

interface IStore extends mongoose.Document {
  menu?: IItemMenuData[];
  events?: IEventData[];
  videos?: IVideoData[];
}

interface IResult {
  data: Record<string, string | IStore>;
  error: Record<string, string>;
}

const router = express.Router();
const jsonParser = bodyParser.json();

const Store = mongoose.model<IStore>('Store', StoreSchema);

router.post('/', jsonParser, (req, res, next) => {
  const store = req.body;
  if (!store) {
    return res.status(400).end('Incorrect store');
  }

  Store.create(store, (err: MongoError, doc: MongooseDocument) => {
    const result: IResult = {
      data: {},
      error: {},
    };
    if (err) {
      result.error.message = err.message;
    }
    result.data._id = doc._id;
    return res.json(result);
  });
});

router.put('/:id', jsonParser, (req, res, next) => {
  const userId = req.params.id;
  const store = req.body;
  if (!store) {
    return res.status(400).end('Incorrect store');
  }

  Store.findByIdAndUpdate(userId, store, (err, doc) => {
    const result: IResult = {
      data: {},
      error: {},
    };
    if (err) {
      result.error.message = err.message;
    }
    return res.json(result);
  });
});

router.get('/:id', (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).end('Incorrect id');
  }
  Store.findById(userId, (err, doc) => {
    const result: IResult = {
      data: {},
      error: {},
    };
    if (err) {
      result.error.message = err.message;
    }
    if (doc) {
      result.data = doc.toJSON({});
      return res.json(result);
    }
    result.error.message = 'not found';
    return res.json(result);
  });
});

export default router;
