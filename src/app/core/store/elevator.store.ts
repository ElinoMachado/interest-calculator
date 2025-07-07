import { computed, inject, Injectable, signal } from '@angular/core';
import { Elevator } from '../../core/contracts/elevator.contract';
import { BuildingStore } from '../../core/store/building.store';
@Injectable({ providedIn: 'root' })
export class ElevatorStore {
  private buildingStore = inject(BuildingStore);

  selectedElevatorIndex = signal<number | null>(null);

  readonly elevators = computed(() => this.buildingStore.building().elevators);
  readonly selectedElevator = computed(() => {
    const index = this.selectedElevatorIndex();
    return index !== null ? this.elevators()[index] : null;
  });

  select(index: number) {
    this.selectedElevatorIndex.set(index);
  }

  add(elevator: Elevator) {
    const building = this.buildingStore.building();
    const updated = {
      ...building,
      elevators: [...building.elevators, elevator],
    };
    this.buildingStore.select(updated); // atualiza estado com novo elevador
    this.buildingStore.save();
  }

  update(index: any, elevator: Elevator) {
    const building = this.buildingStore.building();
    const updated = {
      ...building,
      elevators: building.elevators.map((e, i) => (i === index ? elevator : e)),
    };
    this.buildingStore.select(updated);
  }

  remove(index: number) {
    const building = this.buildingStore.building();
    console.log(building);
    const updated = {
      ...building,
      elevators: building.elevators.filter((_, i) => i !== index),
    };
    console.log(updated);
    this.buildingStore.select(updated);
    this.buildingStore.save();
    this.selectedElevatorIndex.set(null);
  }
}
