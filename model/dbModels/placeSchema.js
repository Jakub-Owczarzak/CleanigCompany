const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  placeImage: { type: String, required: true },
  address: { type: String, required: true },
  // nadawanie referencji wksazujey type id i kolekcję useró z którego bedzie ściagnięty user który tworzył record
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  createdOn: { type: Date },
  isTaskFinished: { type: Boolean, required: true },
});

const Place = mongoose.model('Places', placeSchema);

module.exports = Place;
