import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-several-elements',
  templateUrl: './delete-several-elements.component.html',
  styleUrls: ['./delete-several-elements.component.scss'],
})
export class DeleteSeveralElementsComponent {
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter();

  constructor() {}

  onSubmitHandler() {
    this.onSubmit.emit();
  }

  onCancelHandler() {
    const modal = document.querySelector('#delete_several_elements');
    modal?.classList.toggle('hidden');
  }
}
