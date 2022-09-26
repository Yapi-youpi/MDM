import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IApp } from '../../../../../shared/types/apps';

@Component({
  selector: 'app-delete-app',
  templateUrl: './delete-app.component.html',
  styleUrls: ['./delete-app.component.scss'],
})
export class DeleteAppComponent {
  @Input() public app!: IApp;
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter();

  constructor() {}

  onSubmitHandler() {
    this.onSubmit.emit();
  }

  onCancelHandler() {
    const modal = document.querySelector('#delete_app');
    modal?.classList.toggle('hidden');
  }
}
