import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { Button } from '../components/ui/FormElements';
import { useAuth } from '../context/AuthContext';
import { FiCreditCard, FiCheckCircle, FiAlertTriangle, FiPlus, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_BASE_URL from '../api';

const Maintenance = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // State
  const [bills, setBills] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBill, setNewBill] = useState({ user: 'all', month: 'May', year: 2026, amount: 2500, dueDate: '2026-05-30' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBills();
    if (isAdmin) {
      fetchUsers();
    }
  }, []);

  const fetchBills = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_BASE_URL}/api/maintenance`, config);
      setBills(data);
    } catch (err) {
      setBills([]);
    }
  };

  const fetchUsers = async () => {
    // For admin to select which resident to assign bill. 
    // Wait, the API might not have a generic GET /api/users to fetch all residents.
    // Let's assume we can add a simple route or just use 'all' for now if we don't have it.
    // Actually, I'll just hardcode 'all' as the default for now to avoid needing a new endpoint if it doesn't exist,
    // But let's try fetching users just in case. If it fails, we fall back to empty list.
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_BASE_URL}/api/users`, config);
      if (Array.isArray(data)) {
        setUsers(data.filter(u => u.role === 'resident'));
      }
    } catch (err) {
      // Ignored
    }
  };

  const handlePay = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`${API_BASE_URL}/api/maintenance/${id}/pay`, {}, config);
      setBills(
        bills.map((b) => (b._id === id ? { ...b, status: 'paid', paidDate: new Date().toISOString() } : b))
      );
    } catch (err) {
      alert('Failed to pay bill');
    }
  };

  const handleAddBill = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(`${API_BASE_URL}/api/maintenance`, newBill, config);
      
      // data is an array of created bills
      setBills(prev => [...data, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to generate bill');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Maintenance Billing</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track monthly fees and check status.</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <FiPlus /> Generate Bill
          </Button>
        )}
      </div>

      {bills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No maintenance bills found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bills.map((bill, index) => {
            const isPaid = bill.status === 'paid';
            const isOverdue = bill.status === 'overdue';

            return (
              <Card key={bill._id} delay={index * 0.05} className="flex flex-col justify-between h-64 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${isPaid ? 'from-emerald-500 to-teal-500' : isOverdue ? 'from-red-500 to-rose-500' : 'from-amber-500 to-orange-500'} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform duration-500`} />
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {bill.month} {bill.year}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                        isPaid
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : isOverdue
                          ? 'bg-red-500/10 text-red-500 border-red-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}
                    >
                      {isPaid ? <FiCheckCircle /> : <FiAlertTriangle />}
                      {bill.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white mb-2 relative z-10">
                    ₹{bill.amount}
                  </div>
                  {isAdmin ? (
                    <p className="text-xs font-bold text-indigo-500">
                      Resident: {bill.user?.name} (Flat {bill.user?.flatNumber || 'N/A'})
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">Flat: {bill.user?.flatNumber || 'N/A'}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Due Date: {new Date(bill.dueDate).toLocaleDateString()}</p>
                  {isPaid && bill.paidDate && (
                    <p className="text-xs text-emerald-500 mt-1 font-semibold">Paid on: {new Date(bill.paidDate).toLocaleDateString()}</p>
                  )}
                </div>

                {!isPaid && !isAdmin && (
                  <Button onClick={() => handlePay(bill._id)} className="w-full flex items-center justify-center gap-2 relative z-10">
                    <FiCreditCard />
                    Pay Now
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Generate Bill Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Generate New Bill</h3>
              
              <form onSubmit={handleAddBill} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Select Resident(s)</label>
                  <select 
                    value={newBill.user} 
                    onChange={e => setNewBill({...newBill, user: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="all">All Residents (Pending)</option>
                    {users.map(u => (
                      <option key={u._id} value={u._id}>{u.name} (Flat {u.flatNumber})</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Month</label>
                    <input 
                      type="text" 
                      value={newBill.month} 
                      onChange={e => setNewBill({...newBill, month: e.target.value})}
                      required
                      placeholder="e.g. June"
                      className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Year</label>
                    <input 
                      type="number" 
                      value={newBill.year} 
                      onChange={e => setNewBill({...newBill, year: Number(e.target.value)})}
                      required
                      className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Amount (₹)</label>
                    <input 
                      type="number" 
                      value={newBill.amount} 
                      onChange={e => setNewBill({...newBill, amount: Number(e.target.value)})}
                      required
                      className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                    <input 
                      type="date" 
                      value={newBill.dueDate} 
                      onChange={e => setNewBill({...newBill, dueDate: e.target.value})}
                      required
                      className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={saving} className="w-full mt-6">
                  {saving ? 'Generating...' : 'Post Bill'}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Maintenance;
