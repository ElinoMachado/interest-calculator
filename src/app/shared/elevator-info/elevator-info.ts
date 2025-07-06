import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { Elevator } from '../../core/contracts/elevator.contract';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elevator-info',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './elevator-info.html',
  styleUrl: './elevator-info.scss',
})
export class ElevatorInfo {
  @Input() elevators: Elevator[] = [];

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
    console.log(groups);
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

  get currentForm() {
    return this.formArray?.at(this.currentIndex()) as FormGroup;
  }
}
