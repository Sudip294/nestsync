import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';
import { FiLogOut, FiUser, FiCamera } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({ societyName: 'SmartNest Co-op', societyLogo: '' });
  const fileInputRef = useRef(null);

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

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result;
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.put('http://localhost:5000/api/users/profile-picture', {
          profilePicture: base64data
        }, config);
        
        // Update user storage
        const updatedUser = { ...user, profilePicture: data.profilePicture };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.reload(); // Simple reload to refresh all components using user auth
      } catch (err) {
        alert('Failed to upload image');
      }
    };
  };

  return (
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
            <div 
              onClick={() => fileInputRef.current.click()}
              className="relative w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-semibold overflow-hidden cursor-pointer group"
              title="Change Profile Picture"
            >
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <FiUser className="w-4 h-4" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <FiCamera className="w-3 h-3" />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleProfilePicChange} 
              className="hidden" 
              accept="image/*" 
            />

            <div className="hidden md:block text-left">
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
  );
};

export default Navbar;
