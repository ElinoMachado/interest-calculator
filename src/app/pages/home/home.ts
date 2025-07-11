import { Component, inject } from '@angular/core';
import { Carrosel } from '../../shared/carrosel/carrosel';
import { BuildingInfo } from '../../shared/building-info/building-info';
import { ElevatorInfo } from '../../shared/elevator-info/elevator-info';
import { Building } from '../../core/contracts/building.contract';
import { Elevator } from '../../core/contracts/elevator.contract';
import { Header } from '../../shared/header/header';
import { SystemInfo } from '../../core/services/system-info';
import { BuildingStore } from '../../core/store/building.store';

@Component({
  selector: 'app-home',
  imports: [Carrosel, BuildingInfo, ElevatorInfo, Header],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  buildingStore = inject(BuildingStore);
  selectedBuilding: Building | null = null;
  elevators: Elevator[] = [];
  onBuildingSelected(building: Building) {
    this.buildingStore.select(building);
  }
  username = '';
  hostname = '';

  constructor(private systemInfoService: SystemInfo) {}

  async ngOnInit() {
    const info = await this.systemInfoService.getSystemInfo();
    this.username = info.username;
    this.hostname = info.hostname;
    this.buildingStore.getAllBuildings();
  }

  createBuilding() {
    const newBuilding: Building = {
      id: '',
      name: 'new Building',
      address: '',
      residents: 0,
      maintenanceCount: 0,
      elevators: [
        {
          id: '',
          name: 'New Elevator',
          installationDate: new Date(),
          lastMaintenance: new Date(),
          annualProfit: 0,
          monthlyProfit: 0,
          totalProfit: 0,
          saleValue: 0,
          technicalNotes: '',
          totalExpenses: 0,
        },
      ],
      annualProfit: 0,
      color: 'gray',
      monthlyProfit: 0,
      status: '',
      totalProfit: 0,
    };
    this.buildingStore.create(newBuilding);
    this.buildingStore.selectIndex(0);
  }
}
