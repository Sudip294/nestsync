import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiGrid, FiFileText, FiAlertCircle, FiCreditCard } from 'react-icons/fi';

const Sidebar = () => {
  const { user } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'Notices', path: '/notices', icon: FiFileText },
    { name: 'Complaints', path: '/complaints', icon: FiAlertCircle },
    { name: 'Maintenance', path: '/maintenance', icon: FiCreditCard },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md border-r border-gray-200/50 dark:border-white/5 h-[calc(100vh-73px)] p-6 gap-2 sticky top-[73px]">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </aside>

      {/* Mobile Bottom Navigation Bar (PWA optimization) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200/50 dark:border-white/5 px-4 py-2 flex justify-around items-center z-40 shadow-2xl">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-indigo-500 dark:text-indigo-400 scale-110'
                    : 'text-gray-500 dark:text-gray-400'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{link.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
