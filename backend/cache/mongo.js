const mongoose = require('mongoose')
const debug = require('debug')('cal:cache:mongo');
const {Schema} = mongoose

// Mongoose schema definition
const DaySchema = new Schema({
  "8:00am":  {type: Number, required: true},
  "8:30am":  {type: Number, required: true},
  "9:00am":  {type: Number, required: true},
  "9:30am":  {type: Number, required: true},
  "10:00am": {type: Number, required: true},
  "10:30am": {type: Number, required: true},
  "11:00am": {type: Number, required: true},
  "11:30am": {type: Number, required: true},
  "12:00pm": {type: Number, required: true},
  "12:30pm": {type: Number, required: true},
  "1:00pm":  {type: Number, required: true},
  "1:30pm":  {type: Number, required: true},
  "2:00pm":  {type: Number, required: true},
  "2:30pm":  {type: Number, required: true},
  "3:00pm":  {type: Number, required: true},
  "3:30pm":  {type: Number, required: true},
  "4:00pm":  {type: Number, required: true},
  "4:30pm":  {type: Number, required: true},
  "5:00pm":  {type: Number, required: true},
  "5:30pm":  {type: Number, required: true},
  "6:00pm":  {type: Number, required: true},
  "6:30pm":  {type: Number, required: true},
  "7:00pm":  {type: Number, required: true},
  "7:30pm":  {type: Number, required: true},
  "8:00pm":  {type: Number, required: true},
  "8:30pm":  {type: Number, required: true}
})

const ScheduleSchema = new Schema({
  "uuid": {type: String, required: true, unique: true},
  "computed": {type: Date, required: true, default: Date.now},
  "days": {
    "sunday":    {type: DaySchema, required: true},
    "monday":    {type: DaySchema, required: true},
    "tuesday":   {type: DaySchema, required: true},
    "wednesday": {type: DaySchema, required: true},
    "thursday":  {type: DaySchema, required: true},
    "friday":    {type: DaySchema, required: true},
    "saturday":  {type: DaySchema, required: true}
  }
})

// Mongoose connection setup
mongoose.Promise = Promise;
var dbUrl = process.env.MONGO_URL || 'mongodb://localhost/calendar-comparer';
var connection = mongoose.createConnection(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
	debug('Connected to MongoDB cache')
});

module.exports = connection.model('Schedule', ScheduleSchema);
