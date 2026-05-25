import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiShield, FiCreditCard, FiSmartphone, FiArrowRight } from 'react-icons/fi';
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
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Get Started <FiArrowRight />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 overflow-hidden">
        {/* Floating Particles in Hero */}
        <div className="absolute inset-0 pointer-events-none">
           {[...Array(10)].map((_, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: Math.random() * 100 }}
               animate={{ opacity: [0.2, 0.5, 0.2], y: [null, Math.random() * -100] }}
               transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
               className="absolute w-2 h-2 rounded-full bg-indigo-500/30"
               style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
             />
           ))}
        </div>

        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide"
            >
              Welcome to the future of society management
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              Modern living, <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">smartly managed.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10"
            >
              NestSync Portal brings your entire housing society into one beautifully crafted, easy-to-use platform. Experience community living without the hassle.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                Create an Account <FiArrowRight />
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl shadow-sm transition-all duration-300 transform hover:scale-105">
                Resident Login
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[3rem] blur-3xl opacity-20 dark:opacity-40 animate-pulse"></div>
            <motion.img 
              animate={{ y: [-15, 15, -15], rotate: [0, 2, 0, -2, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              src="/hero_bg.png" 
              alt="Futuristic Society 3D" 
              className="relative w-full h-auto object-cover rounded-[3rem] shadow-2xl border border-white/20 dark:border-white/10 z-10"
            />
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
                viewport={{ once: true, margin: "-100px" }}
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
