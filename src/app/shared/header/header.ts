import { Component } from '@angular/core';
import { DropDown } from '../drop-down/drop-down';

@Component({
  selector: 'app-header',
  imports: [DropDown],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  citySelected(option: string) {
    console.log('Selected city:', option);
  }
}
