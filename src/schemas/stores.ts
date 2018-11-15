import { Schema } from 'mongoose';

export const MenuSchema: Schema = new Schema({
  href: String,
  name: String,
  selected: Boolean,
});

export const EventSchema: Schema = new Schema({
  data: {
    type: String,
    values: Object,

    humidity: Number,
    temperature: Number,

    albumcover: String,
    artist: String,
    track: {
      length: String,
      name: String,
    },
    volume: Number,

    buttons: Array,

    image: String,
  },
  description: String,
  icon: String,
  size: String,
  source: String,
  time: String,
  title: String,
  type: String,
});

export const VideoSchema: Schema = new Schema({
  src: String,
});

export const StoreSchema: Schema = new Schema({
  events: [EventSchema],
  menu: [MenuSchema],
  videos: [VideoSchema],
});
