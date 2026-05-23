import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiMessageSquare, FiCreditCard, FiSmartphone } from 'react-icons/fi';
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
      {/* Background Decor */}
      <div className="fixed w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 -top-40 -left-40 blur-3xl pointer-events-none" />
      <div className="fixed w-[600px] h-[600px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 -bottom-40 -right-40 blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
              <FiShield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              NestSync
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2 text-sm font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Modern living, <br />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">smartly managed.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10"
          >
            NestSync Portal brings your entire housing society into one beautifully crafted, easy-to-use platform. Experience community living without the hassle.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105">
              Create an Account
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl shadow-sm transition-all duration-300 transform hover:scale-105">
              Resident Login
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50 dark:bg-white/[0.02] border-y border-gray-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-gray-600 dark:text-gray-400">Powerful features designed to make society management effortless.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feature.color} text-white flex items-center justify-center mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm relative z-10">
        <p>© 2026 NestSync Portal. Designed by Sudip Bag.</p>
      </footer>
    </div>
  );
};

export default Landing;
