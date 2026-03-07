import { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

export default function ActivityForm({ onAdd }) {
  const [type, setType] = useState('Running');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newActivity = {
      type,
      duration: Number(duration),
      calories: calories ? Number(calories) : 0,
    };
    try {
      await onAdd(newActivity);
      setDuration('');
      setCalories('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in relative z-10">
      <div className="group">
        <label className="block text-xs font-bold text-teal-400 mb-1.5 uppercase tracking-wider">Activity Type</label>
        <div className="relative">
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl px-5 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/30 transition-all font-medium"
          >
            {['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'HIIT', 'Other'].map(t => (
              <option key={t} value={t} className="bg-gray-800 text-white py-2">{t}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-teal-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="group">
          <label className="block text-xs font-bold text-teal-400 mb-1.5 uppercase tracking-wider">Duration <span className="text-gray-500 font-normal lowercase tracking-normal">(min)</span></label>
          <input 
            type="number" 
            required
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/30 transition-all font-medium placeholder:text-gray-600 focus:placeholder:opacity-0"
            placeholder="e.g. 45"
          />
        </div>
        <div className="group">
          <label className="block text-xs font-bold text-teal-400 mb-1.5 uppercase tracking-wider">Calories <span className="text-gray-500 font-normal lowercase tracking-normal">(opt)</span></label>
          <input 
            type="number" 
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/30 transition-all font-medium placeholder:text-gray-600 focus:placeholder:opacity-0"
            placeholder="e.g. 320"
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="group relative w-full mt-4 py-4 px-4 overflow-hidden bg-teal-500 hover:bg-teal-400 disabled:opacity-70 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] active:scale-[0.98] outline-none"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        <span className="relative flex items-center justify-center gap-2">
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Logging...</>
          ) : (
            <><PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" /> Log Workout</>
          )}
        </span>
      </button>
    </form>
  );
}
