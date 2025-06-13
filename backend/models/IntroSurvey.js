const mongoose = require("mongoose");

const introSurveySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // one survey per user
  },
  sleepHours: {
    type: String,
    required: true,
  },
  waterIntake: {
    type: String,
    required: true,
  },
  fastFoodFreq: {
    type: String,
    required: true,
  },
  eatsFruitsVeggies: {
    type: String,
    required: true,
  },
  stepsWalked: {
    type: String,
    required: true,
  },
  exercises: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  healthHistory: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // optional: adds createdAt & updatedAt

module.exports = mongoose.model("IntroSurvey", introSurveySchema);
