'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { time: '00:00', usage: 30 },
  { time: '03:00', usage: 20 },
  { time: '06:00', usage: 45 },
  { time: '09:00', usage: 89 },
  { time: '12:00', usage: 78 },
  { time: '15:00', usage: 95 },
  { time: '18:00', usage: 100 },
  { time: '21:00', usage: 68 },
  { time: '23:59', usage: 40 },
];

export default function UsageChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="usage"
            stroke="#3b82f6"
            fill="#93c5fd"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 