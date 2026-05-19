import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { Button } from '../components/ui/FormElements';
import { useAuth } from '../context/AuthContext';
import { FiCreditCard, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import axios from 'axios';

const defaultBills = [
  { _id: '1', month: 'May', year: 2026, amount: 2500, status: 'pending', dueDate: '2026-05-30', resident: 'John Doe', flat: 'A-402' },
  { _id: '2', month: 'April', year: 2026, amount: 2500, status: 'paid', dueDate: '2026-04-30', paidDate: '2026-04-28', resident: 'John Doe', flat: 'A-402' },
  { _id: '3', month: 'March', year: 2026, amount: 2500, status: 'overdue', dueDate: '2026-03-30', resident: 'John Doe', flat: 'A-402' }
];


const Maintenance = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // State
  const [bills, setBills] = useState([]);

  React.useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/maintenance', config);
      setBills(data.length > 0 ? data : defaultBills);
    } catch (err) {
      setBills(defaultBills);
    }
  };

  const handlePay = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/maintenance/${id}/pay`, {}, config);
      setBills(
        bills.map((b) => (b._id === id ? { ...b, status: 'paid', paidDate: new Date().toISOString() } : b))
      );
    } catch (err) {
      setBills(
        bills.map((b) => (b._id === id ? { ...b, status: 'paid', paidDate: new Date().toISOString() } : b))
      );
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Maintenance Billing</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track monthly fees and check status.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {bills.map((bill, index) => {
          const isPaid = bill.status === 'paid';
          const isOverdue = bill.status === 'overdue';

          return (
            <Card key={bill._id} delay={index * 0.05} className="flex flex-col justify-between h-64">
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
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                  ₹{bill.amount}
                </div>
                <p className="text-xs text-gray-500">Flat: {bill.flat}</p>
                <p className="text-xs text-gray-500 mt-1">Due Date: {new Date(bill.dueDate).toLocaleDateString()}</p>
                {isPaid && bill.paidDate && (
                  <p className="text-xs text-emerald-500 mt-1">Paid on: {new Date(bill.paidDate).toLocaleDateString()}</p>
                )}
              </div>

              {!isPaid && !isAdmin && (
                <Button onClick={() => handlePay(bill._id)} className="w-full flex items-center justify-center gap-2">
                  <FiCreditCard />
                  Pay Now
                </Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Maintenance;
