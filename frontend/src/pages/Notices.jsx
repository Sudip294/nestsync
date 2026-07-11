import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import { Input, Button } from '../components/ui/FormElements';
import { FiPlus, FiTrash2, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Notices = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [notices, setNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Fallback default notices in Indian context
  const defaultNotices = [
    {
      _id: '1',
      title: 'Water Supply Maintenance Schedule',
      content: 'Please note there will be no water supply on Friday (22nd May) between 10 AM to 2 PM due to tank cleaning.',
      createdAt: new Date().toISOString(),
      postedBy: { name: 'Admin Staff' }
    },
    {
      _id: '2',
      title: 'CCTV Installation Update',
      content: 'CCTV cameras are being installed on all wing entrances for security. Please cooperate with the technicians.',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      postedBy: { name: 'Admin Staff' }
    }
  ];

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_BASE_URL}/api/notices`, config);
      setNotices(data.length > 0 ? data : defaultNotices);
    } catch (err) {
      setNotices(defaultNotices);
    }
  };

  const handlePostNotice = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(`${API_BASE_URL}/api/notices`, { title, content }, config);
      setNotices([data, ...notices]);
      setTitle('');
      setContent('');
      setShowForm(false);
    } catch (err) {
      // Mock local addition if backend isn't up/responding yet
      const mockNew = {
        _id: Math.random().toString(),
        title,
        content,
        createdAt: new Date().toISOString(),
        postedBy: { name: user.name }
      };
      setNotices([mockNew, ...notices]);
      setTitle('');
      setContent('');
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`${API_BASE_URL}/api/notices/${id}`, config);
      setNotices(notices.filter((n) => n._id !== id));
    } catch (err) {
      setNotices(notices.filter((n) => n._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Notice Board</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Stay updated with official announcements.</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowForm(!showForm)}>
            <FiPlus className="w-5 h-5" />
            {showForm ? 'Close Editor' : 'Post Notice'}
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="mb-6 border-indigo-500/20">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Post New Announcement</h3>
              <form onSubmit={handlePostNotice}>
                <Input
                  label="Notice Title"
                  placeholder="e.g. Society General Meeting"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <div className="flex flex-col gap-1.5 mb-6">
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Content / Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter announcement details..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-gray-800/40 border-gray-300 dark:border-white/10 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Posting...' : 'Publish Announcement'}
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices.map((notice, index) => (
          <Card key={notice._id} delay={index * 0.05} className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                    <FiFileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{notice.title}</h4>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{notice.content}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5 text-xs text-gray-500">
              <span>By {notice.postedBy?.name}</span>
              <span>{new Date(notice.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notices;
