import express from 'express';
import Result from '../models/Result.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc   Spara ett nytt quizresultat
// @route  POST /api/results
// @access Private
router.post('/', protect, async (req, res) => {
  const { score, maxScore, percentage, timeSpent, correctAnswers, totalQuestions } = req.body;
  if (!score || !maxScore || !percentage) {
    return res.status(400).json({ message: 'Alla nödvändiga fält måste vara ifyllda' });
  }
  try {
    const result = await Result.create({
      user: req.user._id,
      score,
      maxScore,
      percentage,
      timeSpent,
      correctAnswers,
      totalQuestions,
      detailed: req.body.detailed || [],
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('❌ Error saving result:', error);
    console.error('Request body:', req.body);
    res.status(500).json({ message: 'Fel vid sparande av resultat' });
  }
});

// @desc   Hämta alla resultat för inloggad användare
// @route  GET /api/results
// @access Private
router.get('/', protect, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    console.error('❌ Error fetching results:', error);
    res.status(500).json({ message: 'Fel vid hämtning av resultat' });
  }
});

export default router;
