import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { alertService } from '../../../../../shared/services';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          visibility: 'hidden',
          right: '-400px',
        })
      ),
      state(
        'open',
        style({
          right: '40px',
        })
      ),
      transition('open <=> closed', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class AlertComponent {
  @ViewChild('progress') progressBar!: ElementRef;
  public progressInterval!: NodeJS.Timeout;

  constructor(public alert: alertService) {
    this.alert.open.subscribe((data) => {
      if (data.show) {
        this.countDown();
      }
    });
  }

  countDown() {
    this.progressBar.nativeElement.style.width = this.alert.data.progressWidth;

    this.progressInterval = setInterval(() => {
      const width = parseInt(this.progressBar.nativeElement.style.width, 10);

      if (width <= 0) {
        this.alert.hide();
        clearInterval(this.progressInterval);
        return;
      }

      this.alert.data.progressWidth = String(width - 1);
      this.progressBar.nativeElement.style.width =
        this.alert.data.progressWidth + '%';
    }, 30);
  }

  stopCountDown() {
    clearInterval(this.progressInterval);
  }
}
