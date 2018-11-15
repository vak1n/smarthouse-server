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

mongoose.Promise = global.Promise;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not found');
}

const router = express.Router();
const jsonParser = bodyParser.json();

const Store = mongoose.model<IStore>('Store', StoreSchema);

router.post('/set', jsonParser, (req, res, next) => {
  const store = req.body;
  if (!store) {
    return res.status(400).end('Incorrect store');
  }

  mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true },
    () => {
      Store.create(store, (err: MongoError, doc: MongooseDocument) => {
        mongoose.disconnect();
        if (err) {
          return res.send(err.message);
        }
        return res.send(doc._id);
      });
    },
  );
});

router.post('/set/:id', jsonParser, (req, res, next) => {
  const userId = req.params.id;
  const store = req.body;
  if (!store) {
    return res.status(400).end('Incorrect store');
  }

  mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true },
    () => {
      Store.findByIdAndUpdate(userId, store, (err, doc) => {
        mongoose.disconnect();
        if (err) {
          return res.send(err.message);
        }
        return res.send('success');
      });
    },
  );
});

router.post('/get/:id', (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).end('Incorrect id');
  }
  mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true },
    () => {
      Store.findById(userId, (err, doc) => {
        mongoose.disconnect();
        if (err) {
          return res.send(err.message);
        }
        if (doc) {
          return res.json(doc.toJSON({}));
        }
        return res.json('not found');
      });
    },
  );
});

export default router;
