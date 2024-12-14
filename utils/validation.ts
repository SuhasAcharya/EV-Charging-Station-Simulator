import { ChargingPoint } from '../types/types';

export function validateSimulationInput(
  chargingPoints: ChargingPoint[],
  arrivalMultiplier: number,
  carConsumption: number
): string | null {
  if (chargingPoints.length === 0) {
    return 'At least one charging point is required';
  }

  if (chargingPoints.some(point => point.count < 1 || point.count > 50)) {
    return 'Number of charging points must be between 1 and 50';
  }

  if (arrivalMultiplier < 20 || arrivalMultiplier > 200) {
    return 'Arrival multiplier must be between 20% and 200%';
  }

  if (carConsumption < 1 || carConsumption > 100) {
    return 'Car consumption must be between 1 and 100 kWh';
  }

  const totalPoints = chargingPoints.reduce((acc, point) => acc + point.count, 0);
  if (totalPoints > 200) {
    return 'Total number of charging points cannot exceed 200';
  }

  return null;
} 