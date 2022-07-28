import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss'],
})
export class InterfaceComponent implements OnChanges {
  @Input() title = '';
  @Input() bgColor = '';
  @Input() textColor = '';
  @Input() iconSize = '';
  @Input() orientation = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let prop in changes) {
      if (prop === 'iconSize') {
        const appIcon = document.querySelectorAll(
          '.interface-sample__app-icon'
        );
        switch (this.iconSize) {
          case '100':
            appIcon.forEach((i) => {
              i.classList.value = 'interface-sample__app-icon';
              i.classList.add('app-icon--s');
            });
            break;
          case '140':
            appIcon.forEach((i) => {
              i.classList.value = 'interface-sample__app-icon';
              i.classList.add('app-icon--l');
            });
            break;
          default:
            appIcon.forEach((i) => {
              i.classList.value = 'interface-sample__app-icon';
            });
        }
      }
      if (prop === 'orientation') {
        const gadget = document.querySelector('.interface-sample');
        this.orientation === 2
          ? gadget?.classList.add('orientation--landscape')
          : gadget?.classList.remove('orientation--landscape');
      }
    }
  }
}
