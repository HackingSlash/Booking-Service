const mongoose = require('mongoose');
mongoose.connect('mongodb://172.17.0.3/davidMongo')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB Connected!');
});

// create a schema for DB data

var Schema = mongoose.Schema;

const bookingSchema = new Schema({

  room_id: {
    type: Number,
    index: true,
    unique: true
  },
  room_name: String,
  world_name: String,
  keywords: String,
  room_rate: Number,
  booked_dates: [Date], // store booked dates in an array
  guest_number: Number,
  guest_name: String,
  host_name: String,
  discount: Boolean,
  cleaning_fee: Boolean,
  review_count: Number,
  review_grade: Number,
  created_date: Date,

});

// create a model for the schema
const Room = mongoose.model('room', bookingSchema);


// adding booking dates to DB (only booked_dates)
const update = (data, callback) => {

  let newBooking = {
    room_id: data.id,
    booked_dates: data.booked,
    // guest_number: data.guest_number,
    guest_name: data.guest_name,
  };

  Room.findOneAndUpdate({ room_id: data.id }, { $push: { booked_dates: data.booked } }, (err, room) => {
    if (err) {
      callback(err, null);
      return console.error(err);
    }
    callback(null, room);
  });
};


// fetching all room data from DB
const find = (callback) => {
  Room.find((err, rooms) => {
    if (err) return console.error(err);
    callback(rooms);
  });
};


// fetching one specific room data from DB
const findOne = (id, callback) => {
  console.log(id);
  Room.findOne({ room_id: id }, (err, room) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(null, room)
      callback(null, room);
    }
  });
};

module.exports = {
  update,
  find,
  findOne,
  Room,
};


