import { computed, inject, Injectable, signal } from '@angular/core';
import { Elevator } from '../../core/contracts/elevator.contract';
import { BuildingStore } from '../../core/store/building.store';
@Injectable({ providedIn: 'root' })
export class ElevatorStore {
  private buildingStore = inject(BuildingStore);

  selectedElevatorIndex = signal<number>(0);

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
      elevators: building.elevators.map((e) =>
        elevator.id === e.id ? elevator : e
      ),
    };
    console.log(building, updated, elevator);
    this.buildingStore.select(updated);
    this.buildingStore.save();
  }

  remove(index: number) {
    const building = this.buildingStore.building();
    const updated = {
      ...building,
      elevators: building.elevators.filter((_, i) => i !== index),
    };
    this.buildingStore.select(updated);
    if (updated.elevators.length == 0) {
      this.buildingStore.delete();
    } else {
      this.buildingStore.save();
    }
    this.selectedElevatorIndex.set(0);
  }
}
