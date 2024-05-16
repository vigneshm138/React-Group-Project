const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  "proname": String,
  "location": String,
  "price": Number,
  "img": String,
  "type": String,
  "bhk": Number,
  "sqft": Number,
  "aboutpro": String,
  "status": String,
  "mode": String,
  "userid":String,
  "highlights":Array
});

const Housemodel = mongoose.model("/houses", houseSchema);

module.exports = Housemodel;
