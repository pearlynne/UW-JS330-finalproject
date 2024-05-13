const mongoose = require("mongoose");

const apptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: { type: Date, required: true }, //Use ISO date for now
  // time: { type: Date, required: true },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("appointments", apptSchema);