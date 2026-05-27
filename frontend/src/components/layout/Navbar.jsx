import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';
import { FiLogOut, FiUser, FiGrid, FiFileText, FiAlertCircle, FiCreditCard, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ProfileModal from '../ProfileModal';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({ societyName: 'SmartNest Co-op', societyLogo: '' });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/settings');
        if (data) setSettings(data);
      } catch (err) {
        // Fallback to default
      }
    };
    fetchSettings();
  }, []);

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'Notices', path: '/notices', icon: FiFileText },
    { name: 'Complaints', path: '/complaints', icon: FiAlertCircle },
    { name: 'Maintenance', path: '/maintenance', icon: FiCreditCard },
  ];

  return (
    <>
      <nav className="w-full bg-white/70 dark:bg-gray-900/60 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          {user && (
            <button 
              className="md:hidden p-2 -ml-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          )}
          <div className="flex items-center gap-2">
            {settings.societyLogo ? (
              <img src={settings.societyLogo} alt="Logo" className="w-10 h-10 rounded-xl object-cover shadow-lg" />
            ) : (
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg"
              >
                {settings.societyName[0]}
              </motion.div>
            )}
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{settings.societyName}</h1>
              <p className="text-[10px] tracking-wide text-indigo-500 dark:text-indigo-400 font-semibold uppercase">NestSync Portal</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {user && (
            <div className="flex items-center gap-3 bg-gray-100/50 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-200/30 dark:border-white/5">
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="relative w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-semibold overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 dark:hover:ring-offset-gray-900 transition-all"
                title="View Profile"
              >
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="w-4 h-4" />
                )}
              </button>

              <div className="hidden md:block text-left cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-full hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all duration-300 hidden sm:block"
                title="Logout"
              >
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Unique Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0 }}
            className="md:hidden fixed inset-x-0 top-[73px] bottom-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl z-30 p-6 flex flex-col gap-4 overflow-y-auto"
          >
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/30 transform scale-[1.02]'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    <Icon className="w-6 h-6" />
                    <span>{link.name}</span>
                  </NavLink>
                </motion.div>
              );
            })}
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                logout();
              }}
              className="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-red-500 font-bold bg-red-500/10 hover:bg-red-500/20 transition-colors"
            >
              <FiLogOut className="w-5 h-5" /> Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
