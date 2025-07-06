import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  imports: [CommonModule],
  templateUrl: './drop-down.html',
  styleUrl: './drop-down.scss',
})
export class DropDown {
  @Input() list: string[] = [
    'Todos',
    'cidade 1',
    'cidade 2',
    'cidade 3',
    'cidade 4',
  ];
  @Input() label: string = 'Selecione uma opção';
  @Output() optionSelected = new EventEmitter();
  showList: boolean = false;
  elementRef: ElementRef = inject(ElementRef);
  iconName: string = 'filter';
  selectedOption: string = 'Option';

  selected(optionName: string) {
    this.selectedOption = optionName;
    this.optionSelected.emit(optionName);
    this.showList = false;
  }
  clickOutsideListener: (event: any) => void = this.eventHandler.bind(this);

  eventHandler(event: Event): void {
    let element = event.target as HTMLElement;
    if (!element.classList.contains('in')) {
      this.showList = false;
      document.removeEventListener('click', this.clickOutsideListener);
    }
  }

  toogle() {
    this.showList = !this.showList;
    if (this.showList) {
      document.addEventListener('click', this.clickOutsideListener);
    } else {
      document.removeEventListener('click', this.clickOutsideListener);
    }
  }
  ngOnInit(): void {
    this.selectedOption = this.list[0];
  }
}
