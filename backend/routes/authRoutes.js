import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Registrera användare
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Användaren finns redan' });

  const user = await User.create({ name, email, password });
  res.status(201).json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
});

// Logga in
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Fel e-post eller lösenord' });
  }

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
});

export default router;
