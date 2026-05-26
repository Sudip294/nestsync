import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProfileModal from '../ProfileModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({ societyName: 'SmartNest Co-op', societyLogo: '' });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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

  return (
    <>
      <nav className="w-full bg-white/70 dark:bg-gray-900/60 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
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
                className="p-1.5 rounded-full hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all duration-300"
                title="Logout"
              >
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </nav>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
