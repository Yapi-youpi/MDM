import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

type entity = 'none' | 'user';

@Injectable()
export class LoaderModel {
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _entity$: BehaviorSubject<entity> = new BehaviorSubject<entity>(
    'none'
  );

  get loading$() {
    return this._loading$;
  }

  get entity$() {
    return this._entity$;
  }

  start(entity: entity) {
    this._entity$.next(entity);
    this._loading$.next(true);
  }

  end() {
    const t = timer(200).subscribe(() => {
      t.unsubscribe();
      this._loading$.next(false);
      this._entity$.next('none');
    });
  }
}
