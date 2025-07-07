import {
  Component,
  EventEmitter,
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
  @Output() deleteElevatorEvent = new EventEmitter<boolean>();

  formArray!: FormArray<FormGroup>;
  currentIndex = signal(0); // 👈 controle de página

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['elevators'] && this.elevators?.length) {
      this.buildFormArray();
      this.currentIndex.set(0); // resetar ao carregar novos dados
    }
  }

  private buildFormArray() {
    const groups = this.elevators.map((elevator) =>
      this.fb.group({
        name: [elevator.name, Validators.required],
        installationDate: [elevator.installationDate, Validators.required],
        lastMaintenance: [elevator.lastMaintenance, Validators.required],
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

  next() {
    if (this.currentIndex() < this.formArray.length - 1) {
      this.currentIndex.update((i) => i + 1);
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
    }
  }
  deleteElevator() {
    if (this.formArray.length > 0) {
      this.formArray.removeAt(this.currentIndex());
      if (this.currentIndex() >= this.formArray.length) {
        this.currentIndex.set(this.formArray.length - 1);
      }
    }
    this.store.remove(this.currentIndex());
    this.deleteElevatorEvent.emit(true);
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
    this.currentIndex.set(this.formArray.length - 1);
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
    return this.formArray?.at(this.currentIndex()) as FormGroup;
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
}
