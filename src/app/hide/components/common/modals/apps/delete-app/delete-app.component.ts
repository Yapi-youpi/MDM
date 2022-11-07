import { Component } from '@angular/core';
import { AppClass, LoaderClass } from '../../../../../shared/classes';

@Component({
  selector: 'app-delete-app',
  templateUrl: './delete-app.component.html',
  styleUrls: ['./delete-app.component.scss'],
})
export class DeleteAppComponent {
  constructor(private apps: AppClass, private loader: LoaderClass) {}

  get loading$() {
    return this.loader.loading$;
  }

  get entity$() {
    return this.loader.entity$;
  }

  get _current() {
    return this.apps.current;
  }

  onSubmitHandler() {
    if (this.apps.current) {
      this.apps.delete(this.apps.current).then((res) => {
        if (res) {
          this.closeModal();
        }
      });
    }
  }

  closeModal() {
    const modal = document.querySelector('#delete_app');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
