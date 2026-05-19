import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, className, onClick, type = "button", variant = "primary", disabled = false, ...props }) => {
  const baseStyles = "px-5 py-2.5 rounded-xl font-medium transition-all duration-300 focus:outline-none flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border border-transparent",
    secondary: "bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 text-gray-800 dark:text-white border border-gray-200 dark:border-white/10",
    danger: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white border border-transparent",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const Input = ({ label, className, error, ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5 mb-4">
      {label && (
        <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={twMerge(
          clsx(
            "w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-gray-800/40 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 backdrop-blur-md",
            error && "border-red-500 focus:ring-red-500/30 focus:border-red-500",
            className
          )
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium mt-0.5">{error}</span>
      )}
    </div>
  );
};
