'use client';

interface Props {
  isCharging?: boolean;
  batteryLevel?: number;
  carIndex: number;
}

export default function EVCar({ isCharging = false, batteryLevel = 50, carIndex }: Props) {
  const getBatteryColor = (level: number) => {
    if (level > 70) return 'bg-green-500 group-hover:bg-green-600';
    if (level > 30) return 'bg-yellow-500 group-hover:bg-yellow-600';
    return 'bg-red-500 group-hover:bg-red-600';
  };

  return (
    <div className="group relative shrink-0">
      {/* Car Container */}
      <div className="relative bg-gray-50 px-3 py-2 rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
        {/* Car SVG */}
        <div className="w-20 h-10 text-gray-800 transition-colors group-hover:text-blue-900">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M21.7,11.3l-1.4-2.8C19.9,7.6,19,7,18,7h-8c-1,0-1.9,0.6-2.3,1.5l-1.4,2.8C5.5,11.5,5,12.2,5,13v3c0,0.6,0.4,1,1,1h1
              c0.6,0,1-0.4,1-1v-1h8v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-3C19,12.2,18.5,11.5,21.7,11.3z M7.5,13C6.7,13,6,12.3,6,11.5
              S6.7,10,7.5,10S9,10.7,9,11.5S8.3,13,7.5,13z M16.5,13c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S17.3,13,16.5,13z"/>
          </svg>
        </div>

        {/* Battery Indicator */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 p-0.5 bg-white rounded-full shadow-sm">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 rounded-full ${
                isCharging ? 'animate-pulse' : ''
              } ${getBatteryColor(batteryLevel)}`}
              style={{ width: `${batteryLevel}%` }}
            />
          </div>
        </div>

        {/* Charging Animation */}
        {isCharging && (
          <div className="absolute -right-2 top-1/2 -translate-y-1/2">
            <div className="relative">
              <svg className="w-5 h-5 text-yellow-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="absolute inset-0 bg-yellow-200 animate-ping rounded-full opacity-75"></div>
            </div>
          </div>
        )}
      </div>

      {/* Hover Tooltip - Moved outside the car container */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 -bottom-24 left-1/2 -translate-x-1/2 pointer-events-none z-50">
        <div className="relative bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap">
          <div className="flex flex-col gap-1">
            <div>Car #{carIndex + 1}</div>
            <div className="flex items-center gap-2">
              <span>Battery:</span>
              <div className="flex items-center gap-1">
                <span>{Math.round(batteryLevel)}%</span>
                <div className={`w-2 h-2 rounded-full ${getBatteryColor(batteryLevel).replace('group-hover:', '')}`} />
              </div>
            </div>
            <div>Status: {isCharging ? 'Charging' : 'Idle'}</div>
          </div>
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-900" />
        </div>
      </div>
    </div>
  );
} 