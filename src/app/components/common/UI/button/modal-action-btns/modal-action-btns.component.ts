import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-action-btns',
  templateUrl: './modal-action-btns.component.html',
  styleUrls: ['./modal-action-btns.component.scss'],
})
export class ModalActionBtnsComponent {
  @Input() submitText: string = 'Подтвердить';
  @Input() cancelText: string = 'Отменить';
  @Input() margin: string = '';
  @Input() isReverse: boolean = false;
  @Input() isSubmitBtnDisabled: boolean = false;

  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor() {}

  onCancelHandler() {
    this.onCancel.emit();
  }
  onSubmitHandler() {
    this.onSubmit.emit();
  }
}
