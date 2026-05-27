import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUpload, FiTrash2, FiUser, FiAlertTriangle, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const fileInputRef = useRef(null);

  if (!user) return null;

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Photo must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        setLoading(true);
        const { data } = await axios.put(
          'http://localhost:5000/api/users/profile-picture',
          { profilePicture: reader.result },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        updateUser({ profilePicture: data.profilePicture });
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to upload photo');
      } finally {
        setLoading(false);
      }
    };
  };

  const handlePhotoDelete = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        'http://localhost:5000/api/users/profile-picture',
        { profilePicture: '' },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      updateUser({ profilePicture: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove photo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await axios.delete('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      logout();
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete account');
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col relative my-8"
            >
              {/* Header Banner */}
              <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-md transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="px-8 pb-8 -mt-16 flex flex-col items-center">
                {/* Profile Photo */}
                <div className="relative group mb-4">
                  <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FiUser className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  
                  {/* Photo Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 border-4 border-transparent">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors"
                      title="Upload Photo"
                    >
                      <FiUpload className="w-4 h-4" />
                    </button>
                    {user.profilePicture && (
                      <button 
                        onClick={handlePhotoDelete}
                        className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
                        title="Remove Photo"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handlePhotoUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                  {user.name}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-1 mb-6">
                  <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    {user.role}
                  </span>
                  {user.role === 'resident' && user.flatNumber && (
                    <span className="px-3 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-full uppercase tracking-wider">
                      Flat {user.flatNumber}
                    </span>
                  )}
                </div>

                <div className="w-full space-y-3 mb-8">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Email Address</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{user.email}</span>
                  </div>
                  {user.contactNumber && (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Contact Number</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{user.contactNumber}</span>
                    </div>
                  )}
                </div>

                {/* Delete Account Section */}
                <div className="w-full border-t border-gray-200 dark:border-white/10 pt-6">
                  {!deleteConfirm ? (
                    <button
                      onClick={() => setDeleteConfirm(true)}
                      className="w-full py-3 px-4 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <FiAlertTriangle /> Delete My Account
                    </button>
                  ) : (
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-500/20">
                      <p className="text-sm text-red-800 dark:text-red-300 font-medium mb-4 text-center">
                        Are you absolutely sure? This will permanently delete your account, including all your complaints and notices.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setDeleteConfirm(false)}
                          className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          disabled={loading}
                          className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg shadow-red-500/20 transition-all disabled:opacity-50"
                        >
                          {loading ? 'Deleting...' : 'Yes, Delete'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
