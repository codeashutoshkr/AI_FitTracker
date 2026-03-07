import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressChart({ activities }) {
  // Process activities for the chart (last 7 days of activity)
  const processData = () => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const dataMap = last7Days.reduce((acc, date) => {
      acc[date] = 0;
      return acc;
    }, {});

    activities.forEach(act => {
      const date = new Date(act.date).toISOString().split('T')[0];
      if (dataMap[date] !== undefined) {
        dataMap[date] += act.duration;
      }
    });

    return last7Days.map(date => ({
      name: new Date(date).toLocaleDateString(undefined, { weekday: 'short' }),
      minutes: dataMap[date]
    }));
  };

  const data = processData();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 border border-indigo-500/30 p-3 rounded-xl backdrop-blur-md shadow-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase mb-1">{payload[0].payload.name}</p>
          <p className="text-indigo-400 font-extrabold text-lg flex items-center gap-2">
            {payload[0].value} <span className="text-[10px] font-medium text-gray-500">MINS</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[250px] w-full mt-6 animate-fade-in">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }}
            dy={10}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99, 102, 241, 0.2)', strokeWidth: 2 }} />
          <Area 
            type="monotone" 
            dataKey="minutes" 
            stroke="#6366f1" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorMin)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
