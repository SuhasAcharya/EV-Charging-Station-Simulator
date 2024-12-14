'use client';

import { useState } from 'react';
import { ChargingConfig, SimulationResults } from '../types/types';
import SimulationResultsComponent from './SimulationResults';
import InfoTooltip from './InfoTooltip';

export default function SimulatorForm() {
  const [activeConfigs, setActiveConfigs] = useState<('kw11' | 'kw22' | 'kw50')[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [config, setConfig] = useState<ChargingConfig>({
    kw11: { count: 0, arrivalRate: 100, utilization: 60 },
    kw22: { count: 0, arrivalRate: 100, utilization: 60 },
    kw50: { count: 0, arrivalRate: 100, utilization: 60 }
  });

  const availablePowers = [
    { id: 'kw11', label: '11kW', power: 11, color: 'blue', description: 'Standard AC charging suitable for longer parking durations' },
    { id: 'kw22', label: '22kW', power: 22, color: 'green', description: 'Fast AC charging for medium duration stays' },
    { id: 'kw50', label: '50kW', power: 50, color: 'purple', description: 'Rapid DC charging for quick charging needs' },
  ] as const;

  const addPowerConfig = (powerId: 'kw11' | 'kw22' | 'kw50') => {
    if (!activeConfigs.includes(powerId)) {
      setActiveConfigs([...activeConfigs, powerId]);
    }
  };

  const removePowerConfig = (powerId: 'kw11' | 'kw22' | 'kw50') => {
    setActiveConfigs(activeConfigs.filter(id => id !== powerId));
    setConfig({
      ...config,
      [powerId]: { count: 0, arrivalRate: 100, utilization: 60 }
    });
  };

  const updateConfig = (
    power: keyof ChargingConfig,
    field: keyof PowerConfig,
    value: number
  ) => {
    setConfig({
      ...config,
      [power]: {
        ...config[power],
        [field]: value
      }
    });
  };

  const calculateTotalPower = () => {
    return activeConfigs.reduce((total, powerId) => {
      const powerLevel = availablePowers.find(p => p.id === powerId)!.power;
      return total + (config[powerId].count * powerLevel);
    }, 0);
  };

  const calculatePeakDemand = () => {
    return activeConfigs.reduce((total, powerId) => {
      const powerLevel = availablePowers.find(p => p.id === powerId)!.power;
      return total + (config[powerId].count * powerLevel * (config[powerId].utilization / 100));
    }, 0);
  };

  const getTotalChargingPoints = () => {
    return activeConfigs.reduce((total, powerId) => total + config[powerId].count, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const totalPower = calculateTotalPower();
      const avgUtilization = activeConfigs.reduce((avg, powerId) => 
        avg + (config[powerId].utilization / 100), 0) / activeConfigs.length;
      const avgArrivalRate = activeConfigs.reduce((avg, powerId) => 
        avg + (config[powerId].arrivalRate / 100), 0) / activeConfigs.length;

      const mockResults: SimulationResults = {
        totalEnergy: totalPower * 24 * avgUtilization,
        peakPower: calculatePeakDemand(),
        chargingEvents: Math.floor(activeConfigs.reduce((total, powerId) => 
          total + (config[powerId].count * (config[powerId].arrivalRate / 100)), 0) * 24),
        hourlyData: Array.from({ length: 24 }, (_, i) => ({
          hour: `${String(i).padStart(2, '0')}:00`,
          power: calculatePeakDemand() * (0.3 + Math.random() * 0.5)
        })),
        dailyData: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
          events: Math.floor(getTotalChargingPoints() * avgArrivalRate * 24),
          energy: totalPower * 24 * avgUtilization * (0.5 + Math.random() * 0.3),
          peakPower: calculatePeakDemand() * (0.7 + Math.random() * 0.2)
        })).reverse()
      };

      setResults(mockResults);
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Add Power Configuration Button */}
      {activeConfigs.length < 3 && (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl border border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900">Add Charging Points</h3>
          <div className="flex gap-4">
            {availablePowers.map(power => (
              !activeConfigs.includes(power.id) && (
                <button
                  key={power.id}
                  type="button"
                  onClick={() => addPowerConfig(power.id)}
                  className={`px-4 py-2 rounded-md text-white bg-${power.color}-500 hover:bg-${power.color}-600`}
                >
                  Add {power.label} Points
                </button>
              )
            ))}
          </div>
        </div>
      )}

      {/* Active Power Configurations */}
      {activeConfigs.map(powerId => {
        const powerConfig = availablePowers.find(p => p.id === powerId)!;
        return (
          <div key={powerId} className={`bg-${powerConfig.color}-50 p-6 rounded-xl relative`}>
            <button
              type="button"
              onClick={() => removePowerConfig(powerId)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Remove configuration</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-medium">{powerConfig.label} Charging Points</h3>
              <InfoTooltip content={powerConfig.description} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Points
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={config[powerId].count}
                    onChange={(e) => updateConfig(powerId, 'count', Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Arrival Rate (%)
                  <input
                    type="range"
                    min="20"
                    max="200"
                    value={config[powerId].arrivalRate}
                    onChange={(e) => updateConfig(powerId, 'arrivalRate', Number(e.target.value))}
                    className="mt-1 block w-full"
                  />
                  <span className="text-sm text-gray-500">{config[powerId].arrivalRate}%</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Utilization (%)
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config[powerId].utilization}
                    onChange={(e) => updateConfig(powerId, 'utilization', Number(e.target.value))}
                    className="mt-1 block w-full"
                  />
                  <span className="text-sm text-gray-500">{config[powerId].utilization}%</span>
                </label>
              </div>
            </div>
          </div>
        );
      })}

      {/* Summary - Only show if there are active configurations */}
      {activeConfigs.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Configuration Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-blue-600">Total Maximum Power</p>
                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="mt-2 text-2xl font-bold text-blue-900">
                {calculateTotalPower().toLocaleString()} <span className="text-sm font-medium">kW</span>
              </p>
              <p className="mt-1 text-sm text-blue-600">Maximum theoretical output</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-green-600">Estimated Peak Demand</p>
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="mt-2 text-2xl font-bold text-green-900">
                {calculatePeakDemand().toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-sm font-medium">kW</span>
              </p>
              <p className="mt-1 text-sm text-green-600">Based on utilization rates</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-purple-600">Total Charging Points</p>
                <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="mt-2 text-2xl font-bold text-purple-900">
                {getTotalChargingPoints().toLocaleString()} <span className="text-sm font-medium">points</span>
              </p>
              <p className="mt-1 text-sm text-purple-600">Across all power levels</p>
            </div>
          </div>

          {/* Per Power Level Breakdown */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <h4 className="text-sm font-medium text-gray-600 mb-4">Breakdown by Power Level</h4>
            <div className="space-y-3">
              {activeConfigs.map(powerId => {
                const powerConfig = availablePowers.find(p => p.id === powerId)!;
                const power = powerConfig.power * config[powerId].count;
                return (
                  <div key={powerId} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${powerConfig.color}-500`} />
                      <span className="text-sm text-gray-600">{powerConfig.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{config[powerId].count} points</span>
                      <span className="text-sm font-medium text-gray-900">{power.toLocaleString()} kW</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Submit Button - Only enable if there are active configurations */}
      <button
        type="submit"
        disabled={isSubmitting || activeConfigs.length === 0}
        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${activeConfigs.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isSubmitting ? 'Running Simulation...' : 'Run Simulation'}
      </button>

      {results && <SimulationResultsComponent results={results} config={config} />}
    </form>
  );
} 