import { Building } from './building.contract';

export interface BuildingsSummary {
  buildings: Building[];
  summary: Summary;
}
export interface Summary {
  totalMonthlyProfit: number;
  totalAnnualProfit: number;
  totalProfit: number;
}
