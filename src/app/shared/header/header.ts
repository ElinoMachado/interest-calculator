import { Component, inject, OnInit } from '@angular/core';
import { DropDown } from '../drop-down/drop-down';
import { BuildingStore } from '../../core/store/building.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [DropDown, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(BuildingStore);

  ngOnInit(): void {
    this.store.getAllBuildings(false); // ← Carrega os dados no início
  }
  citySelected(option: string) {
    console.log('Selected city:', option);
  }
}
