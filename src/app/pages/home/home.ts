import { Component } from '@angular/core';
import { Carrosel } from '../../shared/carrosel/carrosel';
import { BuildingInfo } from '../../shared/building-info/building-info';
import { ElevatorInfo } from '../../shared/elevator-info/elevator-info';
import {
  Building,
  generateMockBuildings,
} from '../../core/contracts/building.contract';
import { Elevator } from '../../core/contracts/elevator.contract';
import { Header } from '../../shared/header/header';
import { SystemInfo } from '../../core/services/system-info';

@Component({
  selector: 'app-home',
  imports: [Carrosel, BuildingInfo, ElevatorInfo, Header],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  buildings = generateMockBuildings(50);
  selectedBuilding: Building | null = null;
  elevators: Elevator[] = [];
  onBuildingSelected(building: Building) {
    console.log('Selected building:', building);
    this.selectedBuilding = building;
    this.elevators = building.elevators ?? [];
  }
  username = '';
  hostname = '';

  constructor(private systemInfoService: SystemInfo) {}

  async ngOnInit() {
    const info = await this.systemInfoService.getSystemInfo();
    this.username = info.username;
    this.hostname = info.hostname;
  }
}
