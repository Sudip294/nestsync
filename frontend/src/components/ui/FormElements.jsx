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

export const Input = ({ label, className, error, type, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full flex flex-col gap-1.5 mb-4 relative">
      {label && (
        <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={inputType}
          className={twMerge(
            clsx(
              "w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-gray-800/40 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 backdrop-blur-md",
              isPassword && "pr-12",
              error && "border-red-500 focus:ring-red-500/30 focus:border-red-500",
              className
            )
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium mt-0.5">{error}</span>
      )}
    </div>
  );
};
