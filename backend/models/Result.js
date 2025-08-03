import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: Number,
  maxScore: Number,
  percentage: Number,
  timeSpent: Number,
  correctAnswers: Number,
  totalQuestions: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  detailed: [
    {
      questionId: String,
      isCorrect: Boolean,
      earnedPoints: Number,
      userAnswer: mongoose.Schema.Types.Mixed,
    }
  ]
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);
export default Result;
