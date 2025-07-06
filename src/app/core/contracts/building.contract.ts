import { Elevator } from './elevator.contract';

export interface Building {
  id: string;
  name: string;
  address: string;
  residents: number;
  maintenanceCount: number;
  status: string;
  totalProfit: number;
  annualProfit: number;
  monthlyProfit: number;
  elevators: Elevator[];
  color: string;
}
export function generateMockBuildings(count: number): Building[] {
  const statuses = ['High Profitability', 'Moderate', 'critical', 'warning'];

  const statusColorMap: Record<string, string> = {
    'High Profitability': '#7FBE8B',
    Moderate: '#D9D9D9',
    critical: '#ED7171',
    warning: '#D9BD6F',
  };

  return Array.from({ length: count }, (_, i) => {
    const status = statuses[i % statuses.length];
    const profitBase = 1000 * (i + 1);

    return {
      id: `bld-${i + 1}`,
      name: `Building ${i + 1}`,
      address: `Street ${i + 1}, Number ${100 + i}`,
      residents: Math.floor(Math.random() * 200) + 10,
      maintenanceCount: Math.floor(Math.random() * 10),
      status,
      totalProfit: profitBase * 12,
      annualProfit: profitBase,
      monthlyProfit: Math.round(profitBase / 12),
      elevators: Array.from(
        { length: Math.floor(Math.random() * 5) + 1 },
        (_, j) => ({
          id: `elev-${i + 1}-${j + 1}`,
          name: `Elevator ${j + 1}`,
          model: `Model ${j + 1}`,
          status: 'Operational',
          installationDate: new Date(2020, 0, 1 + j),
          lastMaintenance: new Date(2023, 0, 1 + j),
          saleValue: 50000 + j * 10000,
          maintenanceCost: 2000 + j * 500,
          capacity: 8 + j,
          speed: 1.5 + j * 0.1,
          manufacturer: `Manufacturer ${j + 1}`,
          totalExpenses: 10000 + j * 1000,
          technicalNotes: `Technical notes for elevator ${j + 1}`,
          totalProfit: 20000 + j * 2000,
          annualProfit: 5000 + j * 500,
          monthlyProfit: 400 + j * 40,
        })
      ),
      color: statusColorMap[status],
    };
  });
}
