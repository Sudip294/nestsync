import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiChevronDown } from 'react-icons/fi';

const Footer = () => {
  const [settings, setSettings] = useState({ societyName: 'SmartNest Co-op', societyLogo: '' });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('Emergency Contacts');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/settings');
        if (data) setSettings(data);
      } catch (err) {
        // Fallback
      }
    };
    fetchSettings();
  }, []);

  const resources = [
    { name: 'Emergency Contacts', info: 'Gate Security: +91 22 2345 6789 | Electrician: +91 98765 43210' },
    { name: 'Society Bye-laws', info: 'Refer to Model Bye-laws 2014 for guidelines.' },
    { name: 'Committee Members', info: 'Chairman: Rajesh Mehta (A-501) | Treasurer: Vinay Shah (B-202)' },
  ];

  return (
    <footer className="w-full bg-white/70 dark:bg-gray-900/60 backdrop-blur-md border-t border-gray-200/50 dark:border-white/5 py-8 px-6 mt-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-200/30 dark:border-white/5">
        
        {/* Left Side: Logo & Brand */}
        <div className="flex items-center gap-3">
          {settings.societyLogo ? (
            <img src={settings.societyLogo} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-sm">
              {settings.societyName[0]}
            </div>
          )}
          <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-tight">{settings.societyName}</h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">NestSync Portal</p>
          </div>
        </div>

        {/* Middle Side: Dropdown Selector for Resources */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100/50 dark:bg-white/5 border border-gray-200/30 dark:border-white/5 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
          >
            <span>{selectedLink}</span>
            <FiChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-56 bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-white/5 rounded-xl shadow-xl z-50 overflow-hidden">
              {resources.map((res) => (
                <button
                  key={res.name}
                  onClick={() => {
                    setSelectedLink(res.name);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors"
                >
                  {res.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Display based on Dropdown Selection */}
      <div className="max-w-7xl mx-auto py-4 text-center">
        <p className="text-[11px] text-indigo-500 dark:text-indigo-400 font-semibold mb-4 bg-indigo-500/5 dark:bg-indigo-500/10 py-1.5 px-3 rounded-lg inline-block">
          {resources.find((r) => r.name === selectedLink)?.info}
        </p>
      </div>

      {/* Bottom Rights */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-2">
        <p>© 2026 All Rights Reserved.</p>
        <p className="font-medium">Designed by <span className="text-indigo-500 font-bold">Sudip Bag</span></p>
      </div>
    </footer>
  );
};

export default Footer;
