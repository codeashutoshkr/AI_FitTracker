import { useState } from 'react';
import { Sparkles, Loader2, BrainCircuit } from 'lucide-react';
import axios from 'axios';

export default function AIInsights({ activities }) {
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateInsights = async () => {
    if (activities.length === 0) return;

    setLoading(true);
    setError('');
    
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const token = localStorage.getItem('token');
    
    console.log(`[AI DEBUG] Target URL: ${API_URL}/ai/insights`);
    console.log(`[AI DEBUG] Token Present: ${!!token}`);
    
    try {
      const response = await axios.post(`${API_URL}/ai/insights`, 
        { activities: activities.slice(0, 7) },
        { 
          headers: { Authorization: `Bearer ${token}` },
          timeout: 15000 // 15s timeout
        }
      );

      console.log(`[AI DEBUG] Success response:`, response.data);
      setInsights(response.data.insights);
    } catch (err) {
      console.error(`[AI DEBUG] Request failed:`, err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to connect to AI server';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[var(--color-dark-surface)] p-6 md:p-8 rounded-3xl shadow-2xl border border-purple-500/20 backdrop-blur-md flex flex-col justify-between h-full min-h-[350px] overflow-hidden group">
      {/* Background ambient light */}
      <div className="absolute -inset-x-20 -top-20 h-40 bg-purple-500/10 blur-[100px] transition-opacity duration-1000 group-hover:opacity-100 opacity-50 z-0"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 tracking-tight">
          <div className="relative">
            <span className="absolute inset-0 bg-purple-500 blur-md opacity-40"></span>
            <BrainCircuit className="text-purple-400 w-7 h-7 relative z-10" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400">Gemini AI Coach</span>
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl mb-5 text-sm font-medium backdrop-blur-sm shadow-inner overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
            {error}
          </div>
        )}

        <div className="flex-grow flex items-center min-h-[160px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-purple-400 rounded-full animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto text-purple-400 w-6 h-6 animate-pulse" />
              </div>
              <p className="text-sm font-bold tracking-wider text-purple-400/80 uppercase animate-pulse">Analyzing Data...</p>
            </div>
          ) : insights ? (
            <div className="relative text-gray-200 text-[15px] leading-relaxed p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 rounded-2xl border border-purple-500/20 shadow-inner w-full mb-2">
              <div className="absolute -top-3 -left-3 bg-purple-500/20 p-2 rounded-full border border-purple-500/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-purple-300" />
              </div>
              {/* Parse basic markdown like bold text if gemini returns it */}
              <div className="prose prose-invert prose-purple max-w-none prose-p:my-2 prose-headings:mb-3 prose-strong:text-purple-300">
                {insights.split('\n').map((line, i) => (
                  <p key={i}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center w-full py-8 text-gray-400">
              <div className="w-16 h-16 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center mb-4 border border-gray-700/50 shadow-inner">
                <Sparkles className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-sm leading-relaxed max-w-[250px] mx-auto font-medium">
                {activities.length > 0
                  ? "Click below to get personalized AI coaching based on your recent activities."
                  : "Log your first activity to unlock AI-powered insights and coaching."}
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={generateInsights}
        disabled={loading || activities.length === 0}
        className="relative z-10 mt-6 w-full py-4 px-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 hover:from-purple-600/40 hover:to-indigo-600/40 text-purple-300 border border-purple-500/30 hover:border-purple-400/50 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] active:scale-[0.98] group/btn overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
        <span className="relative flex items-center justify-center gap-2">
          {loading ? 'Synthesizing...' : 'Generate AI Insights'}
        </span>
      </button>
    </div>
  );
}
