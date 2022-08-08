import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selected-elements',
  templateUrl: './selected-elements.component.html',
  styleUrls: ['./selected-elements.component.scss'],
})
export class SelectedElementsComponent {
  @Input() selectedIDs: string[] = [];
  @Input() editTarget: string = '';
  @Input() deleteTarget: string = '';

  @Output() onCloseClick = new EventEmitter();

  constructor() {}

  onCloseClickHandler() {
    this.onCloseClick.emit();
  }

  onEditClickHandler() {
    const modal = document.querySelector(`#${this.editTarget}`);
    modal?.classList.toggle('hidden');
  }

  onDeleteClickHandler() {
    const modal = document.querySelector(`#${this.deleteTarget}`);
    modal?.classList.toggle('hidden');
  }
}
