import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiShield, FiCreditCard, FiSmartphone, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from '../components/ui/ThemeToggle';

const features = [
  {
    icon: <FiMessageSquare className="w-6 h-6" />,
    title: 'Instant Communication',
    description: 'Get real-time notices and communicate seamlessly with the society committee.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <FiShield className="w-6 h-6" />,
    title: 'Secure Complaints',
    description: 'Raise maintenance requests and track their resolution status instantly.',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: <FiCreditCard className="w-6 h-6" />,
    title: 'Easy Billing',
    description: 'View and manage your maintenance bills and payment history effortlessly.',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: <FiSmartphone className="w-6 h-6" />,
    title: 'Mobile Friendly',
    description: 'Access the portal from anywhere on any device with our fully responsive design.',
    color: 'from-indigo-500 to-purple-500'
  }
];

const Landing = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Animated Background Decor */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 -top-40 -left-40 blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="fixed w-[600px] h-[600px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 -bottom-40 -right-40 blur-3xl pointer-events-none" 
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="NestSync Logo" className="w-10 h-10 object-contain rounded-xl shadow-sm bg-white p-1" />
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              NestSync
            </span>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Get Started <FiArrowRight />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button 
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0 }}
            className="md:hidden fixed inset-x-0 top-[73px] bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl z-40 p-6 flex flex-col gap-4 border-b border-gray-200 dark:border-white/5 shadow-2xl"
          >
            <Link 
              to="/login" 
              className="w-full text-center py-4 text-lg font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resident Login
            </Link>
            <Link 
              to="/register" 
              className="w-full flex items-center justify-center gap-2 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create an Account <FiArrowRight />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
        {/* Full Screen Impressive Animated Background */}
        <div className="absolute inset-0 z-0 bg-gray-50/50 dark:bg-gray-950/80">
          {/* Animated Glowing Orbs */}
          <motion.div 
            animate={{ 
              x: [0, 150, 0, -150, 0], 
              y: [0, 100, 200, 100, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[10%] w-[40vw] h-[40vw] bg-indigo-500/30 dark:bg-indigo-600/30 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              x: [0, -200, 0, 200, 0], 
              y: [0, -150, 0, 150, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] bg-purple-500/30 dark:bg-purple-600/30 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              x: [0, 100, -100, 0], 
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] left-[30%] w-[35vw] h-[35vw] bg-pink-500/30 dark:bg-pink-600/30 rounded-full blur-[120px]"
          />
          
          {/* Moving Grid Background */}
          <motion.div 
            animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-40 dark:opacity-30"
            style={{
              backgroundImage: 'linear-gradient(to right, #80808033 1px, transparent 1px), linear-gradient(to bottom, #80808033 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="inline-block mb-8 px-5 py-2 rounded-full border border-indigo-200/50 dark:border-indigo-500/30 bg-white/50 dark:bg-indigo-500/10 backdrop-blur-md text-indigo-700 dark:text-indigo-300 text-sm font-bold tracking-wide shadow-xl shadow-indigo-500/5"
          >
            🚀 Welcome to the future of society management
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight drop-shadow-sm"
          >
            Modern living, <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">smartly managed.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            NestSync Portal brings your entire housing society into one beautifully crafted, easy-to-use platform. Experience community living without the hassle.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/register" className="w-full sm:w-auto px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-2xl shadow-2xl shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3">
              Create an Account <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-10 py-5 text-lg font-bold text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/20 dark:shadow-none transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              Resident Login
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/50 dark:bg-white/[0.02] border-y border-gray-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Everything you need</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Powerful features designed to make society management effortless and transparent.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-none hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-[4rem] group-hover:scale-150 transition-transform duration-700 ease-out`} />
                <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-tr ${feature.color} text-white flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="relative z-10 text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="relative z-10 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-white/5 pt-16 pb-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="NestSync Logo" className="w-12 h-12 object-contain rounded-xl shadow-sm bg-white p-1" />
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent block">
                NestSync Portal
              </span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Smart society management.</p>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
            <p className="mb-2">© {new Date().getFullYear()} NestSync Portal. All rights reserved.</p>
            <p>Designed with ❤️ by Sudip Bag</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
