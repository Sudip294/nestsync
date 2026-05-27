import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input, Button } from '../components/ui/FormElements';
import Card from '../components/ui/Card';
import ThemeToggle from '../components/ui/ThemeToggle';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center p-6 transition-colors duration-300 relative overflow-hidden">
      {/* Dynamic Background Circles */}
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
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Access your Society Management Dashboard
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
              label="Email Address"
              type="email"
              placeholder="e.g. john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-end mb-6">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              Register Here
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
