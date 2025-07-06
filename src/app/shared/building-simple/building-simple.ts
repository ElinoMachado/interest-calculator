import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-building-simple',
  imports: [],
  templateUrl: './building-simple.html',
  styleUrl: './building-simple.scss',
})
export class BuildingSimple {
  @Input() name: string = '';
  @Input() color: string = 'hsl(0, 0%, 50%)';
  @Input() index: number = 0;
  windows = Array(8);
}
