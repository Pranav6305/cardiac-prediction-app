// routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const FoodLog = require('../models/FoodLog');

router.post('/food-log', async (req, res) => {
  try {
    console.log('📥 Incoming data:', req.body);
    const foodLog = new FoodLog(req.body);
    await foodLog.save();
    res.status(201).json({ message: 'Meal logged successfully' });
  } catch (err) {
    console.error('❌ Error saving food log:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
