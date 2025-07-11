import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Elevator } from '../../core/contracts/elevator.contract';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BuildingStore } from '../../core/store/building.store';
import { ElevatorStore } from '../../core/store/elevator.store';

@Component({
  selector: 'app-elevator-info',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './elevator-info.html',
  styleUrl: './elevator-info.scss',
})
export class ElevatorInfo {
  store = inject(ElevatorStore);
  @Input() elevators: Elevator[] = [];

  formArray!: FormArray<FormGroup>;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.store.selectedElevatorIndex());
    if (changes['elevators'] && this.elevators?.length) {
      this.buildFormArray();
    }
  }

  private buildFormArray() {
    const groups = this.elevators.map((elevator) =>
      this.fb.group({
        id: [elevator.id],
        name: [elevator.name, Validators.required],
        installationDate: [
          this.formatDate(elevator.installationDate),
          Validators.required,
        ],
        lastMaintenance: [
          this.formatDate(elevator.lastMaintenance),
          Validators.required,
        ],
        saleValue: [elevator.saleValue, Validators.required],
        totalExpenses: [elevator.totalExpenses, Validators.required],
        technicalNotes: [elevator.technicalNotes],
        totalProfit: [elevator.totalProfit],
        annualProfit: [elevator.annualProfit],
        monthlyProfit: [elevator.monthlyProfit],
      })
    );
    this.formArray = this.fb.array(groups);
  }
  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Retorna apenas "yyyy-MM-dd"
  }
  next() {
    if (this.store.selectedElevatorIndex() < this.formArray.length - 1) {
      this.store.selectedElevatorIndex.update((i) => i + 1);
    }
  }

  prev() {
    if (this.store.selectedElevatorIndex() > 0) {
      this.store.selectedElevatorIndex.update((i) => i - 1);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      this.prev();
    } else if (event.key === 'ArrowUp') {
      this.next();
    }
  }
  deleteElevator() {
    if (this.formArray.length > 0) {
      this.store.remove(this.store.selectedElevatorIndex());
      this.formArray.removeAt(this.store.selectedElevatorIndex());
      if (this.store.selectedElevatorIndex() >= this.formArray.length) {
        this.store.selectedElevatorIndex.set(this.formArray.length - 1);
      }
    }
  }
  createElevator() {
    const newElevator = this.fb.group({
      name: ['', Validators.required],
      installationDate: ['', Validators.required],
      lastMaintenance: ['', Validators.required],
      saleValue: ['', Validators.required],
      totalExpenses: ['', Validators.required],
      technicalNotes: [''],
      totalProfit: [''],
      annualProfit: [''],
      monthlyProfit: [''],
    });
    this.formArray.push(newElevator);
    this.store.selectedElevatorIndex.set(this.formArray.length - 1);
    this.store.add({
      id: '', // ID será gerado pelo backend
      name: '',
      installationDate: new Date(),
      lastMaintenance: new Date(),
      saleValue: 0,
      totalExpenses: 0,
      technicalNotes: '',
      totalProfit: 0,
      annualProfit: 0,
      monthlyProfit: 0,
    });
  }

  get currentForm() {
    return this.formArray?.at(this.store.selectedElevatorIndex()) as FormGroup;
  }

  selectElevator(i: number) {
    this.store.select(i);
  }

  updateElevator(e: Elevator) {
    this.store.update(this.store.selectedElevatorIndex(), e);
  }

  addElevator(e: Elevator) {
    this.store.add(e);
  }

  updateName() {
    const elevator = this.currentForm.value;
    this.updateElevator({ ...elevator, name: elevator.name });
  }
  updateInstallationDate() {
    const elevator = this.currentForm.value;
    this.updateElevator({
      ...elevator,
      installationDate: elevator.installationDate,
    });
  }
  updateLastMaintenance() {
    const elevator = this.currentForm.value;
    this.updateElevator({
      ...elevator,
      lastMaintenance: elevator.lastMaintenance,
    });
  }
  updateSaleValue() {
    const elevator = this.currentForm.value;
    this.updateElevator({ ...elevator, saleValue: elevator.saleValue });
  }
  updateTotalExpenses() {
    const elevator = this.currentForm.value;
    this.updateElevator({ ...elevator, totalExpenses: elevator.totalExpenses });
  }
  updateTechnicalNotes() {
    const elevator = this.currentForm.value;
    this.updateElevator({
      ...elevator,
      technicalNotes: elevator.technicalNotes,
    });
  }
}
