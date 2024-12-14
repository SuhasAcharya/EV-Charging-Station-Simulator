'use client';

import { SimulationResults } from '../types/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface Props {
  results: SimulationResults;
}

export default function SimulationOutput({ results }: Props) {
  const periodData = [
    { name: 'Daily', value: results.eventsPerPeriod.daily },
    { name: 'Weekly', value: results.eventsPerPeriod.weekly },
    { name: 'Monthly', value: results.eventsPerPeriod.monthly },
    { name: 'Yearly', value: results.eventsPerPeriod.yearly },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Simulation Results</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-1">
            Total Energy Charged
          </h3>
          <p className="text-3xl font-bold text-blue-700">
            {results.totalEnergyCharged.toFixed(1)} kWh
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-900 mb-1">
            Max Power Demand
          </h3>
          <p className="text-3xl font-bold text-green-700">
            {results.maxPowerDemand.toFixed(1)} kW
          </p>
        </div>
      </div>

      {/* Charging Events Chart */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Charging Events by Period
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={periodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="value" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {Object.entries(results.eventsPerPeriod).map(([period, count]) => (
          <div key={period} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm text-gray-600 capitalize">
              {period} Events
            </h4>
            <p className="text-2xl font-semibold text-gray-900">
              {count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 