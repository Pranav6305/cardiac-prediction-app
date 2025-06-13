const express = require("express");
const router = express.Router();
const IntroSurvey = require("../models/IntroSurvey"); // 💡 Externalized model

// POST: Save introductory survey
router.post("/", async (req, res) => {
  const {
    email,
    sleepHours,
    waterIntake,
    fastFoodFreq,
    eatsFruitsVeggies,
    stepsWalked,
    exercises,
    symptoms,
    healthHistory,
  } = req.body;

  try {
    // Check if a survey already exists for this email
    const existing = await IntroSurvey.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Survey already submitted for this user." });
    }

    const survey = new IntroSurvey({
      email,
      sleepHours,
      waterIntake,
      fastFoodFreq,
      eatsFruitsVeggies,
      stepsWalked,
      exercises,
      symptoms,
      healthHistory,
    });

    await survey.save();
    res
      .status(201)
      .json({ message: "Introductory survey saved successfully." });
  } catch (err) {
    console.error("Error saving survey:", err);
    res.status(500).json({ error: "Failed to save survey." });
  }
});

module.exports = router;
