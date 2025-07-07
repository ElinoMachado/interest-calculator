import {
  Component,
  computed,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { BuildingSimple } from '../building-simple/building-simple';
import { CommonModule } from '@angular/common';
import { Building } from '../../core/contracts/building.contract';

@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports: [CommonModule, BuildingSimple],
  templateUrl: './carrosel.html',
  styleUrls: ['./carrosel.scss'],
  animations: [
    trigger('carouselMove', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20%)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateX(-20%)' })
        ),
      ]),
    ]),
  ],
})
export class Carrosel {
  @Output() selectedBuilding = new EventEmitter<Building>();
  @Input()
  set buildingsInput(value: Building[]) {
    this._buildings.set(value ?? []);
  }
  private readonly maxVisible = 10;

  private readonly _buildings = signal<Building[]>([]);

  get buildings() {
    return this._buildings();
  }

  currentIndex = signal(0);

  visibleBuildings = computed(() => {
    const half = Math.floor(this.maxVisible / 2);
    const buildingsLength = this.buildings.length;

    let start = this.currentIndex() - half;
    if (start < 0) start = 0;
    if (start > buildingsLength - this.maxVisible)
      start = buildingsLength - this.maxVisible;

    return this.buildings.slice(start, start + this.maxVisible);
  });

  currentBuilding() {
    this.selectedBuilding.emit(this.buildings[this.currentIndex()] ?? null);
  }

  next() {
    if (this.currentIndex() < this.buildings.length - 1) {
      this.currentIndex.update((i) => i + 1);
      this.currentBuilding();
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
      this.currentBuilding();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'ArrowRight') {
      this.next();
    }
  }

  focus(index: number) {
    if (index !== this.currentIndex()) {
      this.currentIndex.set(index);
      this.currentBuilding();
    }
  }

  getPosition(index: number): string | null {
    const center = this.currentIndex();
    const diff = index - center;

    const maxSide = Math.floor(this.maxVisible / 2);
    if (Math.abs(diff) > maxSide) return null;

    if (diff === 0) return 'center';
    if (diff < 0) return `left-${Math.abs(diff)}`;
    if (diff > 0) return `right-${diff}`;

    return null;
  }

  trackByIndex = (i: number) => i;
}
