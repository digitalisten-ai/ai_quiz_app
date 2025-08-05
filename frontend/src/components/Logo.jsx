import React from 'react';
import logo from '../assets/ai_quiz_logo.png';

const Logo = ({ size = 180 }) => (
  <img
    src={logo}
    alt="AI Quiz Logo"
    className="rounded-full border-4 border-white shadow-xl"
    style={{ width: size, height: size }}
  />
);

export default Logo;