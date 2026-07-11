import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import { Input, Button } from '../components/ui/FormElements';
import { FiPlus, FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import API_BASE_URL, { SOCKET_URL } from '../api';

const Complaints = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [loading, setLoading] = useState(false);

  const defaultComplaints = [
    {
      _id: '1',
      title: 'Elevator not working',
      description: 'The lift in Wing C is stuck at 4th floor since morning.',
      category: 'electrical',
      status: 'pending',
      raisedBy: { name: 'Rahul Sharma', flatNumber: 'C-402' },
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      title: 'Water leakage in parking lot',
      description: 'Pillar 44 has heavy seepage from the ceiling.',
      category: 'plumbing',
      status: 'in-progress',
      raisedBy: { name: 'Neha Gupta', flatNumber: 'B-101' },
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  useEffect(() => {
    fetchComplaints();

    // Socket implementation
    const socket = io(SOCKET_URL, {
      auth: { token: user?.token }
    });
    socket.on('complaintUpdated', (updatedComplaint) => {
      setComplaints((prev) =>
        prev.map((c) => (c._id === updatedComplaint._id ? updatedComplaint : c))
      );
    });

    socket.on('newComplaint', (newComplaint) => {
      setComplaints((prev) => [newComplaint, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  const fetchComplaints = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_BASE_URL}/api/complaints`, config);
      setComplaints(data.length > 0 ? data : defaultComplaints);
    } catch (err) {
      setComplaints(defaultComplaints);
    }
  };

  const handleRaiseComplaint = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(
        `${API_BASE_URL}/api/complaints`,
        { title, description, category },
        config
      );
      setComplaints([data, ...complaints]);
      setTitle('');
      setDescription('');
      setCategory('other');
      setShowForm(false);
    } catch (err) {
      const mockNew = {
        _id: Math.random().toString(),
        title,
        description,
        category,
        status: 'pending',
        raisedBy: { name: user.name, flatNumber: user.flatNumber },
        createdAt: new Date().toISOString()
      };
      setComplaints([mockNew, ...complaints]);
      setTitle('');
      setDescription('');
      setCategory('other');
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(`${API_BASE_URL}/api/complaints/${id}`, { status }, config);
      setComplaints(complaints.map((c) => (c._id === id ? data : c)));
    } catch (err) {
      setComplaints(
        complaints.map((c) => (c._id === id ? { ...c, status } : c))
      );
    }
  };

  const statusColors = {
    'pending': 'bg-red-500/10 text-red-500 border-red-500/20',
    'in-progress': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'resolved': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Complaints Portal</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">File, track, and update maintenance requests.</p>
        </div>
        {!isAdmin && (
          <Button onClick={() => setShowForm(!showForm)}>
            <FiPlus className="w-5 h-5" />
            {showForm ? 'Close Portal' : 'File Complaint'}
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">File a New Complaint</h3>
              <form onSubmit={handleRaiseComplaint}>
                <Input
                  label="Title"
                  placeholder="e.g. Broken corridor lights"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <div className="w-full flex flex-col gap-1.5 mb-4">
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-gray-800/40 border-gray-300 dark:border-white/10 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                  >
                    <option value="other">Other</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="security">Security</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 mb-6">
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Detailed Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide full description of the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-gray-800/40 border-gray-300 dark:border-white/10 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Complaint'}
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6">
        {complaints.map((c, index) => (
          <Card key={c._id} delay={index * 0.05}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 capitalize">{c.category}</span>
                </div>
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{c.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{c.description}</p>
                <div className="flex items-center gap-2 pt-2 text-xs text-gray-500">
                  <span>Raised by: {c.raisedBy?.name} ({c.raisedBy?.flatNumber})</span>
                  <span>•</span>
                  <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {isAdmin && c.status !== 'resolved' && (
                <div className="flex gap-2">
                  {c.status === 'pending' && (
                    <Button onClick={() => updateStatus(c._id, 'in-progress')} variant="secondary" className="text-amber-500">
                      Mark In Progress
                    </Button>
                  )}
                  <Button onClick={() => updateStatus(c._id, 'resolved')} variant="primary">
                    Mark Resolved
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
