import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, onClick, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={onClick ? { y: -4, scale: 1.01 } : {}}
      onClick={onClick}
      className={twMerge(
        clsx(
          "bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200/50 dark:border-white/5 shadow-xl rounded-2xl p-6 transition-all duration-300",
          onClick && "cursor-pointer hover:shadow-2xl hover:border-indigo-500/30",
          className
        )
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;
