import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input, Button } from '../components/ui/FormElements';
import Card from '../components/ui/Card';
import ThemeToggle from '../components/ui/ThemeToggle';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'resident',
    flatNumber: '',
    contactNumber: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center p-6 transition-colors duration-300 relative overflow-hidden">
      {/* Circles Background */}
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
        className="w-full max-w-md my-8"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Join your society management portal
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

          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="w-full flex flex-col gap-1.5 mb-4 relative">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Join As
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border bg-white/50 dark:bg-gray-800/40 border-gray-300 dark:border-white/10 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 backdrop-blur-md"
                >
                  <option value="resident">Resident</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {formData.role === 'resident' && (
              <Input
                label="Flat Number"
                type="text"
                name="flatNumber"
                placeholder="e.g. A-402"
                value={formData.flatNumber}
                onChange={handleChange}
                required
              />
            )}

            <Input
              label="Contact Number"
              type="text"
              name="contactNumber"
              placeholder="e.g. 9876543210"
              value={formData.contactNumber}
              onChange={handleChange}
            />

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              Login Here
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
