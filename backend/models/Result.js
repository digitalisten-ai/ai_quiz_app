import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  percentage: { type: Number, required: true },
  timeSpent: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  detailed: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      isCorrect: { type: Boolean, required: true },
      earnedPoints: { type: Number, required: true },
      userAnswer: { type: mongoose.Schema.Types.Mixed },
    }
  ]
}, { timestamps: true });

resultSchema.index({ user: 1, date: -1 });

const Result = mongoose.model('Result', resultSchema);
export default Result;
