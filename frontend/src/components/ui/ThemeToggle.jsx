import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/5 text-gray-800 dark:text-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5 animate-pulse" />
      ) : (
        <FiMoon className="w-5 h-5 text-indigo-600" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
