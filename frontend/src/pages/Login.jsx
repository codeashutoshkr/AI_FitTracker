import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, ArrowRight, User, Lock } from 'lucide-react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });

      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 tracking-tight mb-2">
            FitTracker
          </h1>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest opacity-80">Welcome Back</p>
        </div>

        <div className="bg-[var(--color-dark-surface)] p-8 rounded-3xl shadow-2xl border border-gray-800/60 backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Log In to Your Account</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6 text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all font-medium placeholder:text-gray-600"
                placeholder="Username"
              />
            </div>

            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all font-medium placeholder:text-gray-600"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 relative overflow-hidden group/btn active:scale-[0.98]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Logging in...</>
              ) : (
                <>Log In <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
