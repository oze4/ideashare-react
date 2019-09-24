const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  seen: {
    type: Boolean,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Notification = mongoose.model(
  'notification',
  NotificationSchema
);
