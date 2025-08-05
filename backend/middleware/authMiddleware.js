import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return res.status(401).json({ message: 'Ingen eller ogiltig token-header' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = await User.findById(decoded.id).select('-password');
    console.log('User found:', req.user);
    if (!req.user) {
      return res.status(401).json({ message: 'Användare ej funnen' });
    }
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ message: 'Ogiltig token' });
  }
};

export default protect;
