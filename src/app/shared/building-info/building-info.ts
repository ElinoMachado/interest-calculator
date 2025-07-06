import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Building } from '../../core/contracts/building.contract';

@Component({
  selector: 'app-building-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './building-info.html',
  styleUrl: './building-info.scss',
})
export class BuildingInfo implements OnInit, OnChanges {
  @Input() building: Building | null = null;
  form: FormGroup;

  // Dados de leitura (atualizados dinamicamente)
  totalProfit = 0;
  annualProfit = 0;
  monthlyProfit = 0;
  maintenanceCount = 0;
  elevatorCount = 0;
  status = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      residents: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['building'] && changes['building'].currentValue) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (!this.building) return;

    // Atualiza o formulário
    this.form.patchValue({
      name: this.building.name,
      address: this.building.address,
      residents: this.building.residents,
    });

    // Atualiza os dados fixos
    this.totalProfit = this.building.totalProfit;
    this.annualProfit = this.building.annualProfit;
    this.monthlyProfit = this.building.monthlyProfit;
    this.maintenanceCount = this.building.maintenanceCount;
    this.elevatorCount = this.building.elevators.length;
    this.status = this.building.status;
  }
}
