import { useState } from 'react';
import { Activity, Flame, Clock, Calendar, ChevronRight, Target } from 'lucide-react';
import ProgressChart from './ProgressChart';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Dashboard({ activities }) {
  const { user, login } = useAuth();
  const [weeklyGoal, setWeeklyGoal] = useState(user?.weeklyGoal || 300);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(weeklyGoal);
  const [updating, setUpdating] = useState(false);

  const totalDuration = activities.reduce((sum, act) => sum + act.duration, 0);
  const totalCalories = activities.reduce((sum, act) => sum + (act.calories || 0), 0);
  const totalWorkouts = activities.length;
  
  const progressPercent = Math.min(Math.round((totalDuration / weeklyGoal) * 100), 100);

  const saveGoal = async () => {
    setUpdating(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_URL}/api/auth/profile`, 
        { weeklyGoal: tempGoal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update local state and context
      setWeeklyGoal(tempGoal);
      login(res.data.user, token); // Refresh user data in context
      setIsEditingGoal(false);
    } catch (err) {
      console.error('Failed to update goal:', err);
      alert('Failed to save goal to server.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Metric Card 1 */}
        <div className="group relative bg-indigo-500/5 backdrop-blur-md p-6 rounded-3xl border border-indigo-500/10 hover:border-indigo-400/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-indigo-500/20"></div>
          <div className="relative z-10">
            <div className="p-3.5 bg-indigo-500/10 w-max rounded-2xl text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Activity size={26} strokeWidth={2.5} />
            </div>
            <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-1">Workouts</p>
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">{totalWorkouts}</p>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="group relative bg-fuchsia-500/5 backdrop-blur-md p-6 rounded-3xl border border-fuchsia-500/10 hover:border-fuchsia-400/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-fuchsia-500/20"></div>
          <div className="relative z-10">
            <div className="p-3.5 bg-fuchsia-500/10 w-max rounded-2xl text-fuchsia-400 mb-4 group-hover:scale-110 transition-transform">
              <Clock size={26} strokeWidth={2.5} />
            </div>
            <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-1">Minutes</p>
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">{totalDuration}</p>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="group relative bg-orange-500/5 backdrop-blur-md p-6 rounded-3xl border border-orange-500/10 hover:border-orange-400/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-orange-500/20"></div>
          <div className="relative z-10">
            <div className="p-3.5 bg-orange-500/10 w-max rounded-2xl text-orange-400 mb-4 group-hover:scale-110 transition-transform">
              <Flame size={26} strokeWidth={2.5} />
            </div>
            <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-1">Calories</p>
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">{totalCalories}</p>
          </div>
        </div>
      </div>

      {/* Goal & Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-900/40 p-6 rounded-3xl border border-gray-800/50">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Target className="text-teal-400 w-5 h-5" />
              Weekly Goal
            </h3>
            <button 
              onClick={() => setIsEditingGoal(!isEditingGoal)}
              className="text-[10px] font-bold text-gray-500 hover:text-teal-400 transition-colors uppercase tracking-widest bg-gray-800/50 px-2 py-1 rounded-lg"
            >
              {isEditingGoal ? 'Cancel' : 'Edit Goal'}
            </button>
          </div>

          {isEditingGoal ? (
            <div className="flex gap-2 mb-6 animate-fade-in">
              <input 
                type="number"
                value={tempGoal}
                onChange={(e) => setTempGoal(parseInt(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-1.5 text-white w-24 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button 
                onClick={saveGoal}
                disabled={updating}
                className="bg-teal-500 hover:bg-teal-400 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
              >
                {updating ? 'Saving...' : 'Save'}
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-400 mb-6">Target: {weeklyGoal} minutes. Keep pushing!</p>
          )}
          
          <div className="space-y-4">
             <div className="flex justify-between items-end">
                <span className="text-2xl font-black text-white">{progressPercent}% <span className="text-xs font-bold text-gray-500 uppercase">Reached</span></span>
                <span className="text-sm font-bold text-teal-400">{totalDuration}/{weeklyGoal} <span className="text-[10px] text-gray-600 uppercase">Min</span></span>
             </div>
             <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)] transition-all duration-1000 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
             </div>
          </div>
        </div>
        
        <div className="bg-gray-800/20 p-4 rounded-2xl border border-gray-700/10">
           <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 px-2">Activity Overview (Last 7 Days)</p>
           <ProgressChart activities={activities} />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">Recent Activities</h3>
          <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        {activities.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-b from-gray-800/20 to-transparent rounded-3xl border border-gray-800/50">
            <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-4 animate-float">
               <Calendar size={28} className="text-gray-500" />
            </div>
            <p className="text-gray-400 text-lg font-medium">Your journey starts here.</p>
            <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">Log your first workout to start seeing insights and tracking your progress over time.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {activities.map((act, i) => (
              <div 
                key={act._id} 
                className="group relative bg-gray-800/20 hover:bg-gray-800/40 p-5 rounded-2xl flex justify-between items-center border border-gray-700/20 hover:border-gray-600/50 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500"></div>
                
                <div className="flex items-center gap-5 relative z-10 cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 shadow-inner flex items-center justify-center text-gray-300 group-hover:text-indigo-400 group-hover:scale-105 transition-all">
                    <Activity size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-100 text-lg group-hover:text-indigo-200 transition-colors">{act.type}</p>
                    <p className="text-sm text-gray-500 font-medium">{new Date(act.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="text-right relative z-10 flex items-center gap-6">
                  <div>
                    <p className="text-indigo-400 font-bold text-xl">{act.duration} <span className="text-xs font-medium text-gray-500 ml-0.5">MIN</span></p>
                    {act.calories > 0 && <p className="text-sm text-orange-400/80 font-medium flex items-center justify-end gap-1"><Flame size={12}/>{act.calories}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
