import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import ActivityForm from './components/ActivityForm';
import AIInsights from './components/AIInsights';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { LogOut, User } from 'lucide-react';
import axios from 'axios';



// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[var(--color-dark-bg)] flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Main layout when logged in
function MainApp() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActivities(res.data);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      if (error.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleAddActivity = async (activityData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/activities`, activityData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchActivities(); // Refresh list after adding
    } catch (error) {
      console.error('Failed to save activity:', error);
      alert('Failed to save activity: ' + (error.response?.data?.message || error.message));
      if (error.response?.status === 401) logout();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-white p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      <header className="mb-8 max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex items-end gap-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 tracking-tight">
            FitTracker
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-medium mb-1.5 uppercase tracking-widest opacity-80 hidden sm:block">AI-Powered Analytics</p>
        </div>

        <div className="flex items-center gap-4 bg-gray-900/50 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-gray-800/60 shadow-lg">
          <div className="flex items-center gap-2 text-indigo-300 font-medium">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
               <img src={user?.profilePic} alt="profile" className="w-8 h-8 rounded-full"/>
            </div>
            <span>{user?.username || user?.name}</span>
          </div>
          <div className="w-px h-6 bg-gray-700"></div>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--color-dark-surface)] p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-800/60 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all group-hover:bg-indigo-500/10"></div>

            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 tracking-tight relative z-10">
              <span className="w-1.5 h-6 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
              Your Progress
            </h2>

            <div className="relative z-10">
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="flex gap-2 items-center text-indigo-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              ) : (
                <Dashboard activities={activities} />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="h-auto">
            <AIInsights activities={activities} />
          </div>

          <div className="bg-[var(--color-dark-surface)] p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-800/60 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all group-hover:bg-teal-500/10"></div>

            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 tracking-tight relative z-10">
              <span className="w-1.5 h-6 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></span>
              Quick Log
            </h2>
            <ActivityForm onAdd={handleAddActivity} />
          </div>
        </div>
      </main>
    </div>
  );
}

// Router Wrapping
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute><MainApp /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
