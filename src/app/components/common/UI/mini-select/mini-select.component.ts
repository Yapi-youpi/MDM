import { Component, Input, OnInit } from '@angular/core';
import { Option } from '../../../../shared/types/input';

@Component({
  selector: 'app-mini-select',
  templateUrl: './mini-select.component.html',
  styleUrls: ['./mini-select.component.scss'],
})
export class MiniSelectComponent implements OnInit {
  @Input() open = false;
  @Input() header = '';
  @Input() options: Option[] = [];
  constructor() {}

  ngOnInit(): void {}

  openSelect() {
    let elem = document.getElementById(this.header);
    if (elem) {
      elem.classList.toggle('open');
    }
    this.open = !this.open;
  }
}
