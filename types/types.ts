export interface PowerConfig {
  count: number;
  arrivalRate: number;
  utilization: number;
}

export interface ChargingConfig {
  kw11: PowerConfig;
  kw22: PowerConfig;
  kw50: PowerConfig;
}

export interface SimulationResults {
  totalEnergy: number;
  peakPower: number;
  chargingEvents: number;
  hourlyData: {
    hour: string;
    power: number;
  }[];
  dailyData: {
    date: string;
    events: number;
    energy: number;
    peakPower: number;
  }[];
} 