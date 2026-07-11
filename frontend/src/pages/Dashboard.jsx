import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import { FiUsers, FiAlertCircle, FiFileText, FiCreditCard, FiUpload, FiSettings, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api';

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();
  
  const [societyName, setSocietyName] = useState('SmartNest Co-op');
  const [societyLogo, setSocietyLogo] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/settings`);
        if (data) {
          setSocietyName(data.societyName || 'SmartNest Co-op');
          setSocietyLogo(data.societyLogo || '');
        }
      } catch (err) {
        // Handle silently
      }
    };
    fetchSettings();
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo size must be less than 2MB');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSocietyLogo(reader.result);
    };
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`${API_BASE_URL}/api/users/settings`, {
        societyName,
        societyLogo
      }, config);
      alert('Society settings updated successfully!');
      window.location.reload(); // Reload to refresh Navbar
    } catch (err) {
      alert('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const stats = isAdmin
    ? [
        { name: 'Total Residents', value: '148', icon: FiUsers, color: 'from-blue-500 to-cyan-500' },
        { name: 'Pending Complaints', value: '12', icon: FiAlertCircle, color: 'from-amber-500 to-orange-500' },
        { name: 'Active Notices', value: '5', icon: FiFileText, color: 'from-emerald-500 to-teal-500' },
        { name: 'Outstanding Maintenance', value: '₹45,200', icon: FiCreditCard, color: 'from-indigo-500 to-purple-500' },
      ]
    : [
        { name: 'My Flat Number', value: user?.flatNumber || 'N/A', icon: FiUsers, color: 'from-blue-500 to-cyan-500' },
        { name: 'My Active Complaints', value: '2', icon: FiAlertCircle, color: 'from-amber-500 to-orange-500' },
        { name: 'Latest Notices', value: '3', icon: FiFileText, color: 'from-emerald-500 to-teal-500' },
        { name: 'Pending Maintenance', value: '₹2,500', icon: FiCreditCard, color: 'from-indigo-500 to-purple-500' },
      ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Namaste, {user?.name}!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isAdmin
              ? 'Here is a quick overview of the society status and tasks.'
              : `Here is the status of your flat and updates for ${user?.flatNumber || 'your home'}.`}
          </p>
        </div>
        
        {/* Notification Subscribe */}
        {('Notification' in window && Notification.permission !== 'granted') && (
          <button
            onClick={async () => {
              try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                  const registration = await navigator.serviceWorker.ready;
                  const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'BNwz26JV2xh0LfJi4vRgqukyj1fWOhI4RQJUnqnB6c88IwJbHwSZAIOhFaVM1vN3nmoJ2WVP5B5SAMX8LKK3aMU'
                  });
                  await axios.post(`${API_BASE_URL}/api/users/push-subscribe`, subscription, {
                    headers: { Authorization: `Bearer ${user.token}` }
                  });
                  alert('Push notifications enabled!');
                }
              } catch (e) {
                console.error('Error enabling push notifications:', e);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl transition-colors text-sm"
          >
            <FiAlertCircle className="w-4 h-4" />
            Enable Notifications
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} delay={index * 0.1} className="relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform duration-500`} />
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-tr ${stat.color} text-white shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left / Main Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              {[
                { type: 'complaint', text: 'Water leakage in B Wing resolved', time: '2 hours ago' },
                { type: 'notice', text: 'New CCTV installation guideline posted', time: 'Yesterday' },
                { type: 'payment', text: 'Maintenance payment for flat A-402 confirmed', time: '2 days ago' },
              ].map((activity, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{activity.text}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {isAdmin && (
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <FiSettings className="w-5 h-5 text-indigo-500 animate-spin-slow" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Society Portal Customization</h3>
              </div>
              <p className="text-xs text-gray-500 mb-6">Change the society name and upload a custom logo for the navbar/footer headers.</p>
              
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Society/Co-op Name</label>
                  <input
                    type="text"
                    value={societyName}
                    onChange={(e) => setSocietyName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border bg-white/50 dark:bg-gray-800/40 border-gray-300 dark:border-white/10 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Society Logo (Under 2MB)</label>
                  <div className="flex items-center gap-4">
                    {societyLogo ? (
                      <img src={societyLogo} alt="Preview" className="w-12 h-12 rounded-xl object-cover border dark:border-white/10" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-xs">
                        No Logo
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs rounded-xl cursor-pointer shadow-lg shadow-indigo-500/20 transition-all duration-300">
                        <FiUpload className="w-4 h-4" />
                        Upload Logo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                      {societyLogo && (
                        <button
                          type="button"
                          onClick={() => setSocietyLogo('')}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-xs rounded-xl cursor-pointer shadow-lg shadow-red-500/20 transition-all duration-300"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </Card>
          )}
        </div>

        {/* Right Section */}
        <div className="space-y-8">
          <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Quick Actions</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Need to raise a complaint or pay maintenance?</p>
            <div className="flex flex-col gap-3">
              {!isAdmin && (
                <button onClick={() => navigate('/complaints')} className="w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300">
                  File a Complaint
                </button>
              )}
              {isAdmin && (
                <button onClick={() => navigate('/notices')} className="w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300">
                  Post New Notice
                </button>
              )}
              <button onClick={() => navigate('/notices')} className="w-full py-3 px-4 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 text-gray-800 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-white/10 transition-all duration-300">
                View All Notices
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
