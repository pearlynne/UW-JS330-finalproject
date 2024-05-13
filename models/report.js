const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: { type: Date, required: true },
  mood: { type: Number, required: true },
  inattentiveness: { type: Number, required: true },
  hyperactivity: { type: Number, required: true },
  impulsitivity: { type: Number, required: true },
  journalEntry: { type: String },
  medRxn: { type: String },
});

module.exports = mongoose.model("reports", reportSchema);