import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileLoaderClass {
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  start() {
    this.loading.next(true);
  }

  end() {
    const t = timer(500).subscribe(() => {
      t.unsubscribe();
      this.loading.next(false);
    });
  }
}
