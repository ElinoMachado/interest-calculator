import { Component, inject } from '@angular/core';
import { Carrosel } from '../../shared/carrosel/carrosel';
import { BuildingInfo } from '../../shared/building-info/building-info';
import { ElevatorInfo } from '../../shared/elevator-info/elevator-info';
import { Building } from '../../core/contracts/building.contract';
import { Elevator } from '../../core/contracts/elevator.contract';
import { Header } from '../../shared/header/header';
import { SystemInfo } from '../../core/services/system-info';
import { BuildingElevatorService } from '../../core/services/building-elevator-service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
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
    console.log('Selected building:', building);
    this.buildingStore.select(building);
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
    this.buildingStore.getAllBuildings();
  }
  onBuildingDeleted() {
    const buildings = this.buildingStore.snapshotAll;

    if (!this.selectedBuilding) return;

    const index = buildings.findIndex(
      (b) => b.id === this.selectedBuilding!.id
    );
    const next = buildings[index + 1] || buildings[index - 1] || null;

    this.selectedBuilding = next;
    this.elevators = next?.elevators ?? [];
  }
  onElevatorDeleted() {
    /* if (!this.selectedBuilding) return;

    const elevators = this.selectedBuilding.elevators || [];
    const index = elevators.findIndex((e) => e.id === this.elevators[0]?.id);
    const next = elevators[index + 1] || elevators[index - 1] || null;

    this.elevators = next ? [next] : []; */
  }
}
