interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export default function StatsCard({ title, value, change, trend }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
          <svg
            className={`w-3 h-3 ml-0.5 ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            {trend === 'up' ? (
              <path d="M3 9l3-3 3 3" />
            ) : (
              <path d="M3 3l3 3 3-3" />
            )}
          </svg>
        </p>
      </div>
    </div>
  );
} 