import { computed, inject, Injectable, signal } from '@angular/core';
import { Building } from '../contracts/building.contract';
import { BuildingElevatorService } from '../services/building-elevator-service';
import { BuildingsSummary, Summary } from '../contracts/building-summary';

const initialState: Building = {
  id: '',
  name: '',
  address: '',
  residents: 0,
  maintenanceCount: 0,
  status: 'operational',
  totalProfit: 0,
  annualProfit: 0,
  monthlyProfit: 0,
  elevators: [],
  color: '#333333',
};
@Injectable({ providedIn: 'root' })
export class BuildingStore {
  private service = inject(BuildingElevatorService);

  private state = signal<Building>(initialState);
  private all = signal<Building[]>([]);
  private summary = signal<Summary | null>(null);
  private loading = signal(false);
  private error = signal<string | null>(null);

  readonly building = computed(() => this.state());
  readonly buildings = computed(() => this.all());
  readonly isLoading = computed(() => this.loading());
  readonly errorMessage = computed(() => this.error());
  readonly summaryProfit = computed(() => this.summary());

  updateField<K extends keyof Building>(field: K, value: Building[K]) {
    this.state.update((s) => ({ ...s, [field]: value }));
  }

  load(id: string) {
    this.loading.set(true);
    this.error.set(null);
    this.service.getById(id).subscribe({
      next: (b: BuildingsSummary) => {
        this.state.set(b.buildings[0]); // Assume we want the first building
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar prédio');
        this.loading.set(false);
      },
    });
  }

  getAllBuildings() {
    this.loading.set(true);
    this.error.set(null);
    this.service.getAll().subscribe({
      next: (summary: BuildingsSummary) => {
        this.all.set(summary.buildings);
        this.summary.set(summary.summary);
        console.log(this.summary());
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao buscar lista de prédios');
        this.loading.set(false);
      },
    });
  }

  save() {
    const building = this.state();
    console.log(building);
    this.loading.set(true);
    this.service.update(building.id, building).subscribe({
      next: (updated) => {
        console.log();
        this.state.set(updated);
        this.loading.set(false);
        this.getAllBuildings(); // atualiza lista
      },
      error: () => {
        this.error.set('Erro ao salvar prédio');
        this.loading.set(false);
      },
    });
  }

  create() {
    const building = this.state();
    this.loading.set(true);
    this.service.create(building).subscribe({
      next: (created) => {
        this.state.set(created);
        this.loading.set(false);
        this.getAllBuildings();
      },
      error: () => {
        this.error.set('Erro ao criar prédio');
        this.loading.set(false);
      },
    });
  }

  delete() {
    const id = this.state().id;
    this.loading.set(true);
    this.service.delete(id).subscribe({
      next: () => {
        this.reset();
        this.getAllBuildings();
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao excluir prédio');
        this.loading.set(false);
      },
    });
  }

  reset() {
    this.state.set(initialState);
  }

  select(building: Building) {
    this.state.set({ ...building });
  }

  get snapshot() {
    return this.state();
  }
  get snapshotAll() {
    return this.all();
  }
}
