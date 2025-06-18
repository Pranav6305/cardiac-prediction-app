// models/FoodLog.js
const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  details: String
});

const FoodLogSchema = new mongoose.Schema({
  mealType: String,
  foodItems: [FoodItemSchema],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FoodLog', FoodLogSchema);
