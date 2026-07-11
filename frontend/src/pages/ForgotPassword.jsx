import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api';
import { Input, Button } from '../components/ui/FormElements';
import Card from '../components/ui/Card';
import ThemeToggle from '../components/ui/ThemeToggle';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = request OTP, 2 = verify and reset
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
      setMessage(data.message);
      setStep(2);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        email,
        otp,
        newPassword
      });
      setMessage(data.message);
      setStep(3); // success step
    } catch (error) {
      setError(error.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center p-6 transition-colors duration-300 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 -top-40 -left-40 blur-3xl pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 -bottom-40 -right-40 blur-3xl pointer-events-none" />

      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-xl backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md">
          <FiArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mt-20"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Reset Password
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Recover your access safely
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium text-center"
            >
              {error}
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl text-sm font-medium text-center"
            >
              {message}
            </motion.div>
          )}

          {step === 1 && (
            <form onSubmit={handleRequestOTP}>
              <Input
                label="Email Address"
                type="email"
                placeholder="e.g. john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword}>
              <Input
                label="Enter 6-Digit OTP"
                type="text"
                placeholder="e.g. 123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </Button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center">
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Your password has been successfully reset. You can now login.
              </p>
              <Link to="/login" className="w-full inline-block">
                <Button className="w-full">Go to Login</Button>
              </Link>
            </div>
          )}

          {step !== 3 && (
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
            </p>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
