import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

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
          right: '20px',
        })
      ),
      transition('open <=> closed', [animate('0.4s ease')]),
    ]),
  ],
})
export class AlertComponent {
  private _sub!: Subscription;

  @ViewChild('progress') progressBar!: ElementRef;
  public progressInterval!: NodeJS.Timeout;

  constructor(private _elRef: ElementRef, private _alert: AlertService) {
    this._sub = this._alert.alert.subscribe((data) => {
      if (data.show) this.countDown();
    });
  }

  get alert() {
    return this._alert.alert.value;
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  countDown() {
    const ms =
      this.alert.message.length < 60 ? 30 : this.alert.message.length / 2;

    this.progressBar.nativeElement.style.width = this.alert.progressWidth;

    this.progressInterval = setInterval(() => {
      const width = parseInt(this.progressBar.nativeElement.style.width, 10);

      if (width <= 0) {
        this._alert.hide();
        clearInterval(this.progressInterval);
        return;
      }

      this.alert.progressWidth = String(width - 1);
      this.progressBar.nativeElement.style.width =
        this.alert.progressWidth + '%';
    }, ms);
  }

  stopCountDown() {
    clearInterval(this.progressInterval);
  }
}
