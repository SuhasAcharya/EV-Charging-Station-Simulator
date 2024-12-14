'use client';

interface Props {
  power: number;
  count: number;
  isCharging?: boolean;
}

export default function ChargingStationVisual({ power, count, isCharging = false }: Props) {
  const getPowerColor = (power: number) => {
    switch (power) {
      case 11: return {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        label: 'Standard AC'
      };
      case 22: return {
        bg: 'bg-green-100',
        text: 'text-green-600',
        label: 'Fast AC'
      };
      case 50: return {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        label: 'Rapid DC'
      };
      default: return {
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        label: 'Custom'
      };
    }
  };

  const colors = getPowerColor(power);

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Type and Power Label */}
      <div className={`${colors.bg} ${colors.text} px-3 py-1.5 rounded-lg text-sm font-medium`}>
        {colors.label} · {power}kW
      </div>

      {/* Charging Stations */}
      <div className={`p-4 ${colors.bg} rounded-2xl shadow-sm`}>
        <div className="flex flex-wrap gap-4 justify-center">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="relative group">
              {/* Charging Station */}
              <div className={`w-16 h-20 ${colors.text} transition-all duration-300 transform group-hover:scale-110`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M3 14h2l1-7h12l1 7h2M8 14v3a2 2 0 002 2h4a2 2 0 002-2v-3" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5}
                    d="M12 7v4m0 0l-2-2m2 2l2-2" 
                    className={isCharging ? 'charging-animation' : ''} 
                  />
                </svg>
              </div>
              
              {/* Charging Animation */}
              {isCharging && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-1.5 h-1.5 ${colors.text} rounded-full animate-bounce`} />
                    <div className={`w-1.5 h-1.5 ${colors.text} rounded-full animate-bounce [animation-delay:0.2s]`} />
                    <div className={`w-1.5 h-1.5 ${colors.text} rounded-full animate-bounce [animation-delay:0.4s]`} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Count Label */}
      <div className="text-sm text-gray-600">
        {count} {count === 1 ? 'Station' : 'Stations'}
      </div>
    </div>
  );
} 