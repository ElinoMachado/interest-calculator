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
